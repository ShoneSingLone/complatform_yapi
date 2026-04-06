export type FileType = 'folder' | 'image' | 'document' | 'code' | 'video' | 'unknown';

export interface FileNode {
  id: string;
  name: string;
  type: FileType;
  size?: number; // in bytes
  updatedAt: string;
  children?: FileNode[];
  content?: string; // For preview
  url?: string; // For image/video preview
  path: string;
}
