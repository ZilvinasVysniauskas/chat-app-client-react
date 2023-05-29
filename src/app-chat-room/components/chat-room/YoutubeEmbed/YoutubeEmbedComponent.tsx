import { useEffect, useRef, useState } from "react";
import YouTube, { YouTubePlayer } from 'react-youtube';

type YoutubeEmbedProps = {
    videoId: string;
    socket: {
        emitVideoState: (videoState: string) => void,
        emitVideoTimestamp: (videoTimestamp: number) => void
        listenToVideoTimestamp: (callback: (videoTimestamp: number) => void) => void
        listenToVideoState: (callback: (videoState: string) => void) => void
        unsubscribeYoutube: () => void
    }
};

const YoutubeEmbedComponent = (props: YoutubeEmbedProps) => {
    const playerRef = useRef<YouTubePlayer | null>(null);
    const [emitVideoState, setEmitVideoState] = useState<boolean>(true);

    useEffect(() => {
        props.socket.listenToVideoState((videoState: string) => {          
            switch (videoState) {
                case 'play':
                    playerRef?.current?.playVideo();
                    break;
                case 'pause':
                    playerRef?.current?.pauseVideo();
                    break;
            }
            setEmitVideoState(false);
        });
        props.socket.listenToVideoTimestamp((videoTimestamp: number) => {
            setEmitVideoState(false);
            playerRef?.current?.seekTo(videoTimestamp);
            playerRef?.current?.playVideo();
        });

        return () => { 
            props.socket.unsubscribeYoutube();
        };

    });

    const opts = {
        height: '390',
        width: '640',
        playerVars: {
            autoplay: 0,
        },
    };

    return (
        <YouTube
            videoId={props.videoId}
            opts={opts}
            onReady={(event) => {
                playerRef.current = event.target;
            }}
            onPause={() => {
                if (emitVideoState) {
                    props.socket.emitVideoState('pause');
                } else {
                    setEmitVideoState(true);
                } 
            }}
            onPlay={() => {
                if (emitVideoState) {
                    props.socket.emitVideoTimestamp(playerRef.current?.getCurrentTime() || 0);
                } else {
                    setEmitVideoState(true);
                }
            }}
        />
    );
};

export default YoutubeEmbedComponent;