import { resourceFromAttributes } from '@opentelemetry/resources';

let sdkStarted = false;

export async function register() {
  if (sdkStarted || typeof window !== 'undefined' || process.env.NODE_ENV !== 'production') return;
  sdkStarted = true;

  try {
    const { NodeSDK } = await import('@opentelemetry/sdk-node');
    const { OTLPLogExporter } = await import('@opentelemetry/exporter-logs-otlp-http');
    const { OTLPTraceExporter } = await import('@opentelemetry/exporter-trace-otlp-http');
    const { OTLPMetricExporter } = await import('@opentelemetry/exporter-metrics-otlp-http');
    const { PeriodicExportingMetricReader } = await import('@opentelemetry/sdk-metrics');
    const { BatchLogRecordProcessor } = await import('@opentelemetry/sdk-logs');

    const resource = resourceFromAttributes({
      'service.name': 'ifa-flm-service',
      'service.version': '1.0.0',
    });

    const sdk = new NodeSDK({
      resource,
      logRecordProcessor: new BatchLogRecordProcessor(new OTLPLogExporter(), {
        scheduledDelayMillis: 300_000, // ⏱ 5 minutes for logs
      }),
      traceExporter: new OTLPTraceExporter(),
      metricReader: new PeriodicExportingMetricReader({
        exporter: new OTLPMetricExporter(),
        exportIntervalMillis: 300_000, // ⏱ 5 minutes for metrics
      }),
      instrumentations: [],
    });

    await sdk.start();
    console.log('✅ OpenTelemetry SDK started');
  } catch (error) {
    console.error('Error starting OpenTelemetry:', error);
  }
}
