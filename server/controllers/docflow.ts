import Koa from 'koa';
import { Server } from '@hocuspocus/server';

// 文档模型
interface Document {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  author: string;
}

// 模拟文档数据
let documents: Document[] = [
  {
    id: '1',
    title: '测试文档 1',
    content: '<p>这是测试文档 1 的内容</p>',
    createdAt: new Date(),
    updatedAt: new Date(),
    author: 'admin'
  },
  {
    id: '2',
    title: '测试文档 2',
    content: '<p>这是测试文档 2 的内容</p>',
    createdAt: new Date(),
    updatedAt: new Date(),
    author: 'user'
  }
];

export default class DocFlowController {
  async getDocuments(ctx: Koa.Context) {
    ctx.body = {
      data: documents,
      success: true
    };
  }

  async getDocument(ctx: Koa.Context) {
    const { id } = ctx.query;
    const document = documents.find(doc => doc.id === id);
    if (document) {
      ctx.body = {
        data: document,
        success: true
      };
    } else {
      ctx.body = {
        data: null,
        success: false,
        message: '文档不存在'
      };
    }
  }

  async createDocument(ctx: Koa.Context) {
    const { title, content, author } = ctx.request.body;
    const newDocument: Document = {
      id: Date.now().toString(),
      title: title || '新建文档',
      content: content || '<p>开始编辑文档...</p>',
      createdAt: new Date(),
      updatedAt: new Date(),
      author: author || 'unknown'
    };
    documents.push(newDocument);
    ctx.body = {
      data: newDocument,
      success: true
    };
  }

  async updateDocument(ctx: Koa.Context) {
    const { id, title, content } = ctx.request.body;
    const documentIndex = documents.findIndex(doc => doc.id === id);
    if (documentIndex !== -1) {
      documents[documentIndex] = {
        ...documents[documentIndex],
        title: title || documents[documentIndex].title,
        content: content || documents[documentIndex].content,
        updatedAt: new Date()
      };
      ctx.body = {
        data: documents[documentIndex],
        success: true
      };
    } else {
      ctx.body = {
        data: null,
        success: false,
        message: '文档不存在'
      };
    }
  }

  async deleteDocument(ctx: Koa.Context) {
    const { id } = ctx.query;
    const documentIndex = documents.findIndex(doc => doc.id === id);
    if (documentIndex !== -1) {
      documents.splice(documentIndex, 1);
      ctx.body = {
        data: true,
        success: true
      };
    } else {
      ctx.body = {
        data: false,
        success: false,
        message: '文档不存在'
      };
    }
  }

  async aiRequest(ctx: Koa.Context) {
    const { type, text } = ctx.request.body;
    // 模拟 AI 响应
    let response = '';
    switch (type) {
      case 'brainstorm':
        response = '这是头脑风暴的结果...';
        break;
      case 'polish':
        response = `优化后的文本: ${text}`;
        break;
      case 'continue':
        response = `${text}... 这是续写的内容`;
        break;
      case 'summarize':
        response = '这是总结的内容...';
        break;
      case 'translate':
        response = '这是翻译的内容...';
        break;
      default:
        response = '未知的 AI 请求类型';
    }
    ctx.body = {
      data: response,
      success: true
    };
  }
}

// 启动 Hocuspocus 服务器
const server = Server.configure({
  port: 1234,
  onStoreDocument(data) {
    console.log('存储文档:', data.documentName);
    // 这里可以实现文档存储逻辑
  },
  onLoadDocument(data) {
    console.log('加载文档:', data.documentName);
    // 这里可以实现文档加载逻辑
    return '';
  }
});

server.listen();
console.log('Hocuspocus 服务器已启动，端口: 1234');
