import { meter } from '@/lib/otel';

export async function GET() {
  const counter = meter.createCounter('http_requests_total', {
    description: 'Counts all HTTP GET requests to /otel-metrics',
  });

  counter.add(1, {
    method: 'GET',
    route: '/api/otel-metrics',
  });

  return new Response('Metric recorded', { status: 200 });
}