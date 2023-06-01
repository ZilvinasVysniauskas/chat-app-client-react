import { Message, MessageTypes } from "../../../types";
import ChatMessage from "../../../../common/UI/ChatMessage/UiChatMessage";
import { ExceptedVideoExtensions as AllowedVideoExtensions } from "../../../constants";
import ScrollBox from "../../../../common/UI/ScrollBox/UiScrollBox";

type MessagesComponentProps = {
    messages: Message[];
    fileUrl: Map<string, string>;
};

const MessagesComponent = (props: MessagesComponentProps) => {

    const getMessageType = (message: Message): MessageTypes => {
        if (message.file) {
            return AllowedVideoExtensions.includes(message.file.fileName.split('.').pop() as string) ?
                MessageTypes.VIDEO : MessageTypes.PHOTO;
        }
        return MessageTypes.TEXT;
    };
    return (
        <>
            {props.messages.map(message => (
                <>
                    <ChatMessage
                        message={message}
                        type={getMessageType(message)}
                    />
                </>

            ))}
        </>
    );
}

export default MessagesComponent;