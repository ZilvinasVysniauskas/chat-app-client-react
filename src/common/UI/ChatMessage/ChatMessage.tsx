import { Message } from "../../../app-chat-room/types";
import { LocalStorageKeys } from "../../constants";
import './ChatMessage.scss'
import { MessageBox } from "react-chat-elements";

type ChatBubbleProps = {
    message: Message;
};

const userId = localStorage.getItem(LocalStorageKeys.userId)

const ChatMessage: React.FC<ChatBubbleProps> = ({ message }) => {
    const position = userId === message.sender ? 'right' : 'left';
    return (

        <MessageBox
             //@ts-ignore
            id={message.id}
            position={position}
            sender={message.sender}
            type={'text'}
            text={message.text}
            date={message.createdAt}
        />
    );
};

export default ChatMessage;