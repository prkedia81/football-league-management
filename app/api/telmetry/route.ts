import { register } from '@/lib/instrumentation';

export async function GET() {
  await register();
  return new Response('Telemetry initialized', { status: 200 });
}