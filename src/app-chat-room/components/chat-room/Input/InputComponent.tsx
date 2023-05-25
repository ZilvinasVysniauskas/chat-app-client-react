import { useState } from "react";
import { AwsService } from "../../../services/AwsService";
import { Message, MessageRequest } from "../../../types";
import { v4 as uuidv4 } from 'uuid';

type InputComponentProps = {
    addMessage: (message: Message) => void;
    addFileUrl: (fileName: string, fileUrl: string) => void;
    socket: { sendMessage: (message: MessageRequest) => void };
}

const InputComponent = (props: InputComponentProps) => {
    const ROOM_ID = '646907ab6c3802ad2cc4ccb9';

    const [message, setMessage] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    function sendMessage(): void {
        if (selectedFile) {
            handleFileMessageSend(selectedFile);
            setMessage('');
        }
        if (message) {
            handleTextMessageSend();
            setMessage('');
        }
    }

    async function handleFileMessageSend(selectedFile: File): Promise<void> {
        const objectUrl = URL.createObjectURL(selectedFile);
        props.addFileUrl(selectedFile.name, objectUrl);

        const savedFileId = await AwsService.uploadFile(selectedFile);
        const fileKey = `${savedFileId}.${selectedFile.name.split('.').pop()}`;

        props.socket.sendMessage({
            message: message,
            roomId: ROOM_ID,
            savedFileId: savedFileId,
            fileKey: fileKey
        });

        props.addMessage({
            id: getTemporaryRandomId(),
            message: message,
            file: {
                fileName: selectedFile.name,
                url: objectUrl,
            },
            createdAt: new Date(),
        });
    }

    function handleTextMessageSend(): void {
        props.socket.sendMessage({ message: message, roomId: ROOM_ID });
        props.addMessage({
            id: getTemporaryRandomId(),
            message: message,
            createdAt: new Date(),
        });
    }

    function getTemporaryRandomId(): string {
        return uuidv4();
    }

    function onFileSelected(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    }

    return (
        <>
            <input
                value={message}
                placeholder="Type your message"
                onKeyDown={(e) => { if (e.key === "Enter") sendMessage() }}
                onChange={(e) => setMessage(e.target.value)}
            />
            <input type="file" onChange={onFileSelected} accept="image/*, video/*" />
            <button onClick={sendMessage}>Send</button>
        </>
    );
};

export default InputComponent;