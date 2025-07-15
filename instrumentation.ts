import { NodeSDK } from '@opentelemetry/sdk-node';
import { Resource } from '@opentelemetry/resources';

export async function register() {
  if (process.env.NODE_ENV === 'production') {
    try {
      // const { Resource } = await import('@opentelemetry/resources');
      const { NodeSDK } = await import('@opentelemetry/sdk-node');
      
      const metaResource ={
        'service.name': 'nextjs-ftp-service',
        'service.version': '1.0.0'
      };

      const sdk = new NodeSDK({
        resource: {
        attributes: metaResource
      } as unknown as Resource,
      });

      sdk.start();
    } catch (error) {
      console.error('Error initializing OpenTelemetry:', error);
    }
  }
}