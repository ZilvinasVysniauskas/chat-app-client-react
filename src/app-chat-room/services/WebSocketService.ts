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
            query: { token: localStorage.getItem(LocalStorageKeys.token) }
        });
        
        socketRef.current.on(Sockets.connect, () => {
            console.log('connected');
        });

        socketRef.current.on(Sockets.error, (error: any) => {
            console.log(error);
        });

        socketRef.current.emit(Sockets.joinRoom, roomId);

        return () => {
            socketRef.current?.disconnect();
        };
    }, [roomId]);

    const sendMessage = (message: MessageRequest) => {
        socketRef.current?.emit(Sockets.message, {
            roomId: roomId,
            message: message.message,
            sender: localStorage.getItem(LocalStorageKeys.userId),
        });
    };

    const emitVideoState = (videoState: string) => {
        socketRef.current?.emit(Sockets.videoState, videoState);
    };

    const emitVideoTimestamp = (videoTime: number) => {
        socketRef.current?.emit(Sockets.videoTimestamp, videoTime);
    };

    const listenToVideoState = (handler: (videoState: string) => void) => {
        socketRef.current?.on(Sockets.videoState, handler);
    };

    const listenToVideoTimestamp = (handler: (videoTime: number) => void) => {
        socketRef.current?.on(Sockets.videoTimestamp, handler);
    };

    const listenToMessage = (handler: (message: Message) => void) => {
        socketRef.current?.on(Sockets.message, handler);
    };

    const unsubscribeYoutube = () => {
        socketRef.current?.off(Sockets.videoState);
        socketRef.current?.off(Sockets.videoTimestamp);
    };

    const unsubscribeChatComponent = () => {
        socketRef.current?.off(Sockets.message);
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
