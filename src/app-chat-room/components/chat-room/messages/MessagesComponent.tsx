import { Message } from "../../../types";
import ChatMessage from "../../../../common/UI/ChatMessage/ChatMessage";


type MessagesComponentProps = {
    messages: Message[];
    fileUrl: Map<string, string>;
};

function isImage(fileName: string): boolean {
    return ['jpg', 'jpeg', 'png', 'gif', 'webp'].some(ext => fileName?.toLowerCase().endsWith(ext));
};

const MessagesComponent = (props: MessagesComponentProps) => {

    return (
        <>

            {props.messages.map(message => (
                <>
                    {
                        message.text &&
                        <ChatMessage
                            message={message}
                        />
                    }
                    {
                        message.file &&
                        <div>file</div>
                    }

                </>
            ))}
        </>
    );
};

export default MessagesComponent;