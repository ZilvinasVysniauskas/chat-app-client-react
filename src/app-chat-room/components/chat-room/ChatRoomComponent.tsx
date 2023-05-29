import { useEffect, useRef, useState } from 'react';
import ChatService from '../../services/ChatService';
import { ChatRoom, Message } from '../../types';
import { useSocket } from '../../services/WebSocketService';
import YoutubeEmbedComponent from './YoutubeEmbed/YoutubeEmbedComponent';
import InputComponent from './Input/InputComponent';
import MessagesComponent from './messages/MessagesComponent';

const ChatRoomComponent = () => {

    const ROOM_ID = '646907ab6c3802ad2cc4ccb9';

    let shouldLoadInitialData = useRef(true);

    const [room, setRoom] = useState<ChatRoom | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(10);
    const [fileUrl, setFileUrl] = useState<Map<string, string>>(new Map());

    const socket = useSocket(ROOM_ID);

    useEffect(() => {
        socket.listenToMessage(addMessage);
        if (shouldLoadInitialData.current) {
            loadRoom(ROOM_ID);
            getMessages(ROOM_ID)
            shouldLoadInitialData.current = false;
        }
        return () => {
            socket.unsubscribeChatComponent()
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

    function addFileUrl(fileName: string, url: string): void {
        setFileUrl((fileUrlSnap) => {
            fileUrlSnap.set(fileName, url);
            return fileUrlSnap;
        });
    }

    return (
        <>
            <h1>{room?.name}</h1>

            <MessagesComponent
                messages={messages}
                fileUrl={fileUrl}
            ></MessagesComponent>
            <InputComponent
                addMessage={addMessage}
                addFileUrl={addFileUrl}
                socket={socket}
            ></InputComponent>

            <YoutubeEmbedComponent
                videoId="O8GUH0_htRM"
                socket={socket}
            />
        </>

    );
};

export default ChatRoomComponent;
