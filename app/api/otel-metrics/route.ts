import { metrics } from '@opentelemetry/api';

export async function GET() {
  const meter = metrics.getMeter('nextjs-ftp');
  const requestCounter = meter.createCounter('http.requests');
  requestCounter.add(1);
  
  return new Response('Metrics collected', { status: 200 });
}