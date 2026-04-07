// File type definition
export const FileType = {
  FOLDER: 'folder',
  IMAGE: 'image',
  DOCUMENT: 'document',
  CODE: 'code',
  VIDEO: 'video',
  UNKNOWN: 'unknown'
};

// FileNode structure
export class FileNode {
  constructor(id, name, type, updatedAt, path, size, children, content, url) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.size = size; // in bytes
    this.updatedAt = updatedAt;
    this.children = children;
    this.content = content; // For preview
    this.url = url; // For image/video preview
    this.path = path;
  }
}
