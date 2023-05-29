import { MessageBox, TextMessage } from "react-chat-elements";

export function createMessageBox(id, sender, message, date, position) {
    return (
        <MessageBox
            id={id}
            position={position}
            sender={sender}
            type={'text'}
            text={message}
            date={date}
        />
    )
}