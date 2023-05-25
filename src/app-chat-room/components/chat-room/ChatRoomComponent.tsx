import React, { useEffect, useRef, useState } from 'react';
import * as yup from 'yup';
import ChatService from '../../services/ChatService';
import { ChatRoom, Message } from '../../types';
import { useSocket } from '../../services/WebSocketService';
import { add, debounce, set } from 'lodash';
import YoutubeEmbedComponent from './YoutubeEmbed/YoutubeEmbedComponent';
import InputComponent from './Input/InputComponent';
import MessagesComponent from './messages/MessagesComponent';

const ChatRoomComponent = () => {
    const scrollContainer = useRef<HTMLDivElement>(null!);

    const ROOM_ID = '646907ab6c3802ad2cc4ccb9';

    const [lastScrollTop, setLastScrollTop] = useState(0);
    const [room, setRoom] = useState<ChatRoom | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(10);
    const [fileUrl, setFileUrl] = useState<Map<string, string>>(new Map());

    const socket = useSocket(ROOM_ID);

    useEffect(() => {
        socket.listenToMessage(addMessage);

        loadRoom(ROOM_ID);
        getMessages(ROOM_ID);
        setUpScrollListener();
        return () => {
            scrollContainer.current?.removeEventListener('scroll', () => { });
        };
    }, []);

    function addMessage(message: Message): void {
        setMessages((messagesSnap) => [...messagesSnap, message]);
    }

    function loadRoom(roomId: string): void {
        ChatService.getRoom(roomId).then((room: ChatRoom) => {
            setRoom(room);
        });
    }

    function getMessages(roomId: string): void {
        ChatService.getMessages(roomId, offset, limit).then((messages: any) => {
            setMessages(messages.reverse());
        });
    }


    function setUpScrollListener(): void {
        const handleScroll = debounce(() => {
            const { scrollTop, clientHeight, scrollHeight } = scrollContainer.current;
            let pos = scrollTop + clientHeight;
            let max = scrollHeight;
            if (pos > max * 0.8 && pos > lastScrollTop) {
                getMessages(ROOM_ID);
            }
            setLastScrollTop(scrollTop);
        }, 100)
        scrollContainer.current?.addEventListener('scroll', handleScroll);
    }

    function addFileUrl(fileName: string, url: string): void {
        setFileUrl((fileUrlSnap) => {
            fileUrlSnap.set(fileName, url);
            return fileUrlSnap;
        });
    }

    return (
        <>
            <div className="chat-container">
                <h1>{room?.name}</h1>
                <div className="chat-messages" ref={scrollContainer}>
                    <MessagesComponent
                        messages={messages}
                        fileUrl={fileUrl}
                    ></MessagesComponent>
                </div>
                <InputComponent
                    addMessage={addMessage}
                    addFileUrl={addFileUrl}
                    socket={socket}
                ></InputComponent>
            </div>
            <YoutubeEmbedComponent
             videoId="O8GUH0_htRM" 
             socket={socket}
             />
        </>

    );
};

export default ChatRoomComponent;
