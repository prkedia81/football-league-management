import { Client } from 'basic-ftp';
import { Readable } from 'stream';

interface FTPConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  secure: boolean;
}

interface UploadResult {
  success: boolean;
  message: string;
  url?: string;
  name?: string;
}

class FTPService {
  private config: FTPConfig;
  private baseUrl = "https://kickoffonline.in"; // Change to your actual URL

  constructor() {
    this.config = {
      host: process.env.FTP_HOST || 'ftp.teqv.in',
      port: parseInt(process.env.FTP_PORT || '21'),
      user: process.env.FTP_USER || 'ifa-uploads@kickoffonline.in',
      password: process.env.FTP_PASSWORD || 'ifa@1893',
      secure: process.env.FTP_SECURE === 'true'
    };
  }

  async uploadFile(file: File, path = "uploads/documents/"): Promise<UploadResult> {
    const client = new Client();
    const remotePath = `${path}${file.name}`;
    
    try {
      await client.access(this.config);
      await client.ensureDir(path);
      
      const stream = Readable.from(Buffer.from(await file.arrayBuffer()));
      await client.uploadFrom(stream, remotePath);
      
      return {
        success: true,
        message: 'File uploaded successfully',
        url: `${this.baseUrl}/${remotePath}`,
        name: file.name
      };
    } catch (error: any) {
      console.error('FTP upload error:', error);
      return {
        success: false,
        message: error.message || 'Failed to upload file'
      };
    } finally {
      client.close();
    }
  }
}

export const ftpService = new FTPService();