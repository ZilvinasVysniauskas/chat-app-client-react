import { Message, MessageTypes } from "../../../app-chat-room/types";
import { LocalStorageKeys } from "../../constants";
import './UiChatMessage.scss'
import { MessageBox } from "react-chat-elements";

type ChatMessageProps = {
    message: Message;
    type: MessageTypes;
};

type ChatMessageProperties = {
    data?: any;
    className?: string;
};

const userId = localStorage.getItem(LocalStorageKeys.USER_ID)

const UiChatMessage: React.FC<ChatMessageProps> = (props: ChatMessageProps) => {
    const position = userId === props.message.sender ? 'right' : 'left';

    let chatMessageProperties: ChatMessageProperties = {
    };

    switch (props.type) {
        case 'video':
            chatMessageProperties.data = {
                videoURL:
                    props.message.file?.url,
                status: {
                    click: true,
                    loading: 0.5,
                    download: true,
                },
            };
            chatMessageProperties.className = 'my-custom-video-message';
            break;
        case 'photo':
            chatMessageProperties.data = {
                uri: props.message.file?.url,
            };
            chatMessageProperties.className = 'my-custom-photo-message';
            break;
    }


    return (

        <MessageBox
            //@ts-ignore
            id={props.message.id}
            position={position}
            sender={props.message.sender}
            type={props.type}
            text={props.message.text}
            date={props.message.createdAt}
            data={chatMessageProperties.data}
            className={chatMessageProperties.className}
        />
    );
};

export default UiChatMessage;