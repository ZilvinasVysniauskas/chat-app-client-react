import { ChatRoom } from "../types";

const BASE_URL = '/chat-room';

const ChatService = {

    async createRoom(roomData: any) {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(roomData),
        });
        return await response.json();
    },

    async addUserToRoom(roomId: string, userId: string) {
        const response = await fetch(`${BASE_URL}/${roomId}/add-user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId }),
        });
        return await response.json();
    },

    async getRoom(roomId: string): Promise<ChatRoom> {
        const response = await fetch(`${BASE_URL}/${roomId}`);
        return await response.json();
    },

    async getMessages(roomId: string, offset: number, limit: number) {
        const response = await fetch(`${BASE_URL}/${roomId}/messages?offset=${offset}&limit=${limit}`);
        return await response.json();
    }
}

export default ChatService;
