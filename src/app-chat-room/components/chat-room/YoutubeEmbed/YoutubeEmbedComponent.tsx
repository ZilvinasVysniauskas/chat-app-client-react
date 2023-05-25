import { useEffect, useRef, useState } from "react";
import YouTube, { YouTubePlayer } from 'react-youtube';
import ts from "typescript";

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
    const emitVideoStateRef = useRef(true);

    useEffect(() => {
        props.socket.listenToVideoState((videoState: string) => {
            console.log('videoState', videoState);
            
            switch (videoState) {
                case 'play':
                    playerRef?.current?.playVideo();
                    break;
                case 'pause':
                    playerRef?.current?.pauseVideo();
                    break;
            }
            emitVideoStateRef.current = false;
        });
        props.socket.listenToVideoTimestamp((videoTimestamp: number) => {
            console.log('videoTimestamp', videoTimestamp);
            emitVideoStateRef.current = false;
            playerRef?.current?.seekTo(videoTimestamp);
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
                if (emitVideoStateRef.current) {
                    console.log('onPause');
                    props.socket.emitVideoState('pause');
                } else {
                    emitVideoStateRef.current = true;
                } 
            }}
            onPlay={() => {
                if (emitVideoStateRef.current) {
                    console.log(playerRef.current?.getCurrentTime());
                    props.socket.emitVideoState('play');
                    props.socket.emitVideoTimestamp(playerRef.current?.getCurrentTime() || 0);
                } else {
                    emitVideoStateRef.current = true;
                }
            }}
        />
    );
};

export default YoutubeEmbedComponent;