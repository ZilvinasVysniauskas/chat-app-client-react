import { useEffect, useRef, useState } from 'react';
import ChatService from '../../services/ChatService';
import { ChatRoom, Message } from '../../types';
import { useSocket } from '../../services/WebSocketService';
import YoutubeEmbedComponent from './YoutubeEmbed/YoutubeEmbedComponent';
import InputComponent from './Input/InputComponent';
import MessagesComponent from './messages/MessagesComponent';
import ScrollBox from '../../../common/UI/ScrollBox/UiScrollBox';

const ChatRoomComponent = () => {

    const ROOM_ID = '646907ab6c3802ad2cc4ccb9';
    const initialOffset = 0;
    const initialLimit = 50;
    let shouldLoadInitialData = useRef(true);

    const [room, setRoom] = useState<ChatRoom | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [fileUrl, setFileUrl] = useState<Map<string, string>>(new Map());
    const [loading, setLoading] = useState(true);

    const socket = useSocket(ROOM_ID);

    
    useEffect(() => {
        socket.listenToMessage(addMessage);
        if (shouldLoadInitialData.current) {
            loadRoom(ROOM_ID);
            getMessages(ROOM_ID, initialOffset, initialLimit)
            shouldLoadInitialData.current = false;
        }
        return () => {
            socket.unsubscribeChatComponent()
        };
    }, []);

    useEffect(() => {
        if (loading && messages.length > 0) {
            setLoading(false);
        }       
    }, [messages]);


    function addMessage(message: Message): void {
        setMessages((messagesSnap) => [...messagesSnap, message]);
    }

    function loadRoom(roomId: string): void {
        ChatService.getRoom(roomId).then((room: ChatRoom) => {
            setRoom(room);
        });
    }

    function getMessages(roomId: string, offset: number, limit: number): Promise<void> {
        setLoading(true);
        return ChatService.getMessages(roomId, offset, limit).then((messages: any) => {
            const reversedMessages = messages.reverse();
            setMessages((messagesSnap) => [...reversedMessages, ...messagesSnap]);
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

            <ScrollBox
                messages={messages}
                getMessages={getMessages}
                loading={loading}
            >
                <MessagesComponent
                    messages={messages}

                    fileUrl={fileUrl}
                ></MessagesComponent>
            </ScrollBox>
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