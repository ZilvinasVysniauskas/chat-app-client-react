import { useState } from "react";
import { AwsService } from "../../../services/AwsService";
import { Message, MessageRequest } from "../../../types";
import { v4 as uuidv4 } from 'uuid';
import { LocalStorageKeys } from "../../../../common/constants";
import UiInput from "../../../../common/UI/Input/UiInput";
import { Box } from '@mui/system';
import UiButton from "../../../../common/UI/Button/UiButton";
import FileInputComponent from "./FileInput.tsx/FileInput";

type InputComponentProps = {
    addMessage: (message: Message) => void;
    addFileUrl: (fileName: string, fileUrl: string) => void;
    socket: { sendMessage: (message: MessageRequest) => void };
}


const InputComponent = (props: InputComponentProps) => {
    const ROOM_ID = '646907ab6c3802ad2cc4ccb9';
    const senderId = localStorage.getItem(LocalStorageKeys.USER_ID) as string;
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [message, setMessage] = useState<string>('');

    const sendMessage = () => {
        if (selectedFile) {
            handleWithFileMessageSend(selectedFile, message);
        } else if (message) {
            handleTextOnlyMessageSend(message);
        }
        setMessage('');
        setSelectedFile(null);
    };

    async function handleWithFileMessageSend(selectedFile: File, message?: string): Promise<void> {
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
            text: message,
            sender: senderId,
            file: {
                fileName: selectedFile.name,
                url: objectUrl,
            },
            createdAt: new Date(),
        });
    }

    function handleTextOnlyMessageSend(message: string): void {
        props.socket.sendMessage({ message: message, roomId: ROOM_ID });
        props.addMessage({
            id: getTemporaryRandomId(),
            text: message,
            createdAt: new Date(),
            sender: senderId,
        });
    }

    function getTemporaryRandomId(): string {
        return uuidv4();
    }

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center'
            }}
        >
            <FileInputComponent
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
            />
            <UiInput type='message' setTextValue={setMessage} value={message} />
            <UiButton onClick={sendMessage} type='send'>
                Send
            </UiButton>
        </Box>
    );
};

export default InputComponent;