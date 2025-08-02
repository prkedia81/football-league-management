import 'server-only';
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
  private baseUrl = "https://kickoffonline.in";

  constructor() {
    this.config = {
      host: process.env.FTP_HOST || 'ftp.teqv.in',
      port: parseInt(process.env.FTP_PORT || '21'),
      user: process.env.FTP_USER || 'ifa-uploads@kickoffonline.in',
      password: process.env.FTP_PASSWORD || 'ifa@1893',
      secure: process.env.FTP_SECURE === 'true'
    };
  }

  async uploadFile(file: File, path: string): Promise<UploadResult> {
    console.log(`[FTP Service] 'uploadFile' method initiated.`);
    return tracer.startActiveSpan('ftp.upload', async (span) => {
      const startTime = Date.now();
      uploadCounter.add(1);

      const client = new Client();
      try {
        span.setAttribute('file.name', file.name);
        span.setAttribute('file.size', file.size);
        span.setAttribute('file.type', file.type);
        span.setAttribute('ftp.path', path);

        const remotePath = `${path}${file.name}`;
        console.log(`[FTP Service] Full remote path will be: "${remotePath}"`);

        // Censor password for logging
        const secureConfig = { ...this.config, password: '***' };
        console.log('[FTP Service] Connecting with config:', secureConfig);
        await client.access(this.config);
        console.log('[FTP Service] Connection successful.');

        console.log(`[FTP Service] Ensuring directory exists: "${path}"`);
        await client.ensureDir(path);
        console.log('[FTP Service] Directory check complete.');
        
        const stream = Readable.from(Buffer.from(await file.arrayBuffer()));

        console.log(`[FTP Service] Starting upload to "${remotePath}"...`);
        await client.uploadFrom(stream, remotePath);
        console.log('[FTP Service] Upload completed successfully.');
        
        const duration = Date.now() - startTime;
        uploadDuration.record(duration);
        
        return {
          success: true,
          message: 'File uploaded successfully',
          url: `${this.baseUrl}/${remotePath}`,
          name: file.name
        };
      } catch (error: any) {
        console.error('[FTP Service] An error occurred during FTP operation:', error);
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
        console.log('[FTP Service] Closing FTP client connection.');
        client.close(); // Ensure client is always closed
        span.end();
      }
    });
  }
}

export const ftpService = new FTPService();