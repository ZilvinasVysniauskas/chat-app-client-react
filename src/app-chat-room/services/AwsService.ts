import axios from '../../common/utils/axios';

export const AwsService = {
    async uploadFile(file: File): Promise<string | undefined> {
        try {
            const response = await axios.post<{ url: string, fileId: string }>('/chat-room/files', {
                fileName: file.name,
                contentType: file.type,
            });

            const { url, fileId } = response.data;

            await axios.put(url, file, {
                headers: {
                    'Content-Type': file.type
                }
            });

            return fileId;
        } catch (error) {
            console.error(error);
        }
    },

    async getFile(url: string): Promise<Blob | undefined> {
        try {
            const response = await axios.get(url, {
                responseType: 'blob'
            });

            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

};
