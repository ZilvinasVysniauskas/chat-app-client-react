export interface ChatRoom {
    _id: string;
    name: string;
    description: string;
    participants: string[];
    __v: number;
}

export enum MessageTypes {
    TEXT = 'TEXT',
    FILE = 'FILE'
}

export interface MessageRequest {
    roomId: string;
    message: string | null;
    savedFileId?: string | null;
    fileKey?: string | null;
}

export interface Message {
    id: string
    text: string | null;
    file?: FileData | null;
    createdAt: Date;
    sender: string;
  }
  
  export interface FileData {
    fileName: string;
    url: string;
  }
  