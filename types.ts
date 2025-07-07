
export enum ChatRole {
  USER = 'user',
  MODEL = 'model',
  SYSTEM = 'system',
}

export interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: number;
  content: string; // base64 data URL
}

export interface GroundingSource {
  web: {
    uri: string;
    title: string;
  };
}

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  sources?: GroundingSource[];
  fileContext?: UploadedFile;
}

export interface WebContext {
  query: string;
  sources: GroundingSource[];
}