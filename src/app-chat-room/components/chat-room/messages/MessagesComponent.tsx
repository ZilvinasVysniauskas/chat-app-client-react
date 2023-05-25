import { Message } from "../../../types";


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
            <ul>
                {props.messages.map(message => (
                    <li key={message.id}>
                        {message.message && <p>{message.message}</p>}
                        {message.file && (
                            <div>
                                {isImage(message.file.fileName) ? (
                                    <img src={message.file.url} alt="" />
                                ) : (
                                    <video controls>
                                        <source src={message.file.url} type="video/mp4" />
                                    </video>
                                )}
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </>
    );
};

export default MessagesComponent;