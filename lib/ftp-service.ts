import { Client } from 'basic-ftp';
import { Readable } from 'stream';
import { trace, metrics, SpanStatusCode } from '@opentelemetry/api';

const tracer = trace.getTracer('ftp-service');
const meter = metrics.getMeter('ftp-service');
const uploadCounter = meter.createCounter('ftp.uploads.count', {
  description: 'Count of FTP uploads',
});
const uploadDuration = meter.createHistogram('ftp.uploads.duration', {
  description: 'Duration of FTP uploads in milliseconds',
  unit: 'ms',
});
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

  // async uploadFile(file: File, path = "uploads/documents/"): Promise<UploadResult> {
  //   const client = new Client();
  //   const remotePath = `${path}${file.name}`;
    
  //   try {
  //     await client.access(this.config);
  //     await client.ensureDir(path);
      
  //     const stream = Readable.from(Buffer.from(await file.arrayBuffer()));
  //     await client.uploadFrom(stream, remotePath);
      
  //     return {
  //       success: true,
  //       message: 'File uploaded successfully',
  //       url: `${this.baseUrl}/${remotePath}`,
  //       name: file.name
  //     };
  //   } catch (error: any) {
  //     console.error('FTP upload error:', error);
  //     return {
  //       success: false,
  //       message: error.message || 'Failed to upload file'
  //     };
  //   } finally {
  //     client.close();
  //   }
  // }
   async uploadFile(file: File, path = "uploads/documents/"): Promise<UploadResult> {
    return tracer.startActiveSpan('ftp.upload', async (span) => {
      const startTime = Date.now();
      uploadCounter.add(1);
      
      try {
        span.setAttribute('file.name', file.name);
        span.setAttribute('file.size', file.size);
        span.setAttribute('file.type', file.type);
        span.setAttribute('ftp.path', path);

        const client = new Client();
        const remotePath = `${path}${file.name}`;
        
        await client.access(this.config);
        await client.ensureDir(path);
        
        const stream = Readable.from(Buffer.from(await file.arrayBuffer()));
        await client.uploadFrom(stream, remotePath);
        
        const duration = Date.now() - startTime;
        uploadDuration.record(duration);
        
        return {
          success: true,
          message: 'File uploaded successfully',
          url: `${this.baseUrl}/${remotePath}`,
          name: file.name
        };
      } catch (error: any) {
      span.recordException(error);
      span.setStatus({ 
        code: SpanStatusCode.ERROR,
        message: error.message 
      });
      return {
        success: false,
        message: error.message || 'Failed to upload file'
      };
      } finally {
        span.end();
      }
    });
  }
}

export const ftpService = new FTPService();