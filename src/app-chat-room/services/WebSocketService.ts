import { useEffect, useRef } from 'react';
import io, { Socket } from 'socket.io-client';
import { MessageRequest } from '../types';
import { Sockets } from '../constants';
import { Message } from '../types';
import { LocalStorageKeys } from '../../common/constants';

const SOCKET_SERVER_URL = "http://localhost:3000";

export const useSocket = (roomId: string) => {
    const socketRef = useRef<Socket>();

    useEffect(() => {
        socketRef.current = io(SOCKET_SERVER_URL, {
            query: { token: localStorage.getItem(LocalStorageKeys.TOKEN) }
        });
        
        socketRef.current.on(Sockets.CONNECT, () => {
            console.log('connected');
        });

        socketRef.current.on(Sockets.ERROR, (error: any) => {
            console.log(error);
        });

        socketRef.current.emit(Sockets.JOIN_ROOM, roomId);

        return () => {
            socketRef.current?.disconnect();
        };
    }, [roomId]);

    const sendMessage = (message: MessageRequest) => {
        socketRef.current?.emit(Sockets.MESSAGE, {
            roomId: roomId,
            message: message.message,
            sender: localStorage.getItem(LocalStorageKeys.USER_ID),
            savedFileId: message.savedFileId,
            fileKey: message.fileKey,
        });
    };

    const emitVideoState = (videoState: string) => {
        socketRef.current?.emit(Sockets.VIDEO_STATE, videoState);
    };

    const emitVideoTimestamp = (videoTime: number) => {
        socketRef.current?.emit(Sockets.VIDEO_TIME_STAMP, videoTime);
    };

    const listenToVideoState = (handler: (videoState: string) => void) => {
        socketRef.current?.on(Sockets.VIDEO_STATE, handler);
    };

    const listenToVideoTimestamp = (handler: (videoTime: number) => void) => {
        socketRef.current?.on(Sockets.VIDEO_TIME_STAMP, handler);
    };

    const listenToMessage = (handler: (message: Message) => void) => {
        socketRef.current?.on(Sockets.MESSAGE, handler);
    };

    const unsubscribeYoutube = () => {
        socketRef.current?.off(Sockets.VIDEO_STATE);
        socketRef.current?.off(Sockets.VIDEO_TIME_STAMP);
    };

    const unsubscribeChatComponent = () => {
        socketRef.current?.off(Sockets.MESSAGE);
    };

    return {
        socket: socketRef.current,
        sendMessage,
        emitVideoState,
        emitVideoTimestamp,
        listenToVideoState,
        listenToVideoTimestamp,
        listenToMessage,
        unsubscribeYoutube,
        unsubscribeChatComponent,
    };
};
