import './TextInput.scss';

type InputProps = {
    setMessage: (message: string) => void;
    message: string;
}

const TextInput: React.FC<InputProps> = ({ setMessage, message }) => {

    return (
        <div className="chat-input">
            <input 
                type="text" 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                placeholder="Type a message" 
            />
        </div>
    );
}

export default TextInput;