// lib/otel.ts
import { metrics, trace, diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';

// // Optional: set up OpenTelemetry API diagnostics
// diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.WARN);

export const meter = metrics.getMeter('nextjs-meter');
export const tracer = trace.getTracer('nextjs-tracer');