import { NextRequest, NextResponse } from 'next/server';
import { register, Counter } from 'prom-client';

const httpRequestCounter = new Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code'],
});

register.registerMetric(httpRequestCounter);

export async function GET(req: NextRequest) {
  const { pathname } = req.nextUrl;
  httpRequestCounter.inc({ method: 'GET', route: pathname, status_code: 200 });

  const metrics = await register.metrics();
  return new NextResponse(metrics, {
    status: 200,
    headers: {
      'Content-Type': register.contentType,
    },
  });
}