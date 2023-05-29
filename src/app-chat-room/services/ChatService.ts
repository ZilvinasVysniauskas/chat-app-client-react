import axios from "../../common/utils/axios";

const BASE_URL = '/chat-room';

const ChatService = {

    async getRoom(roomId: string) {
        const response = await axios.get(BASE_URL, {
            params: {
                roomId,
            },
        });
        return response.data;
    },

    async getMessages(roomId: string, offset: number, limit: number) {
        console.log('getting messages', offset, limit)
        const response = await axios.get(`${BASE_URL}/${roomId}/messages`, {
            params: {
                offset,
                limit,
            },
        });
        return response.data;
    }
}

export default ChatService;
