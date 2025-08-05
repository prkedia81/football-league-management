# 🚀 flm-lgtm-next

## OpenTelemetry Collector for Grafana Cloud

This project packages a minimal OpenTelemetry Collector setup to send logs, metrics, and traces to Grafana Cloud, suitable for deployment on Render or similar platforms. Uses LGTM stack.

---

## ✅ Features

- Sends telemetry using **HTTP OTLP only** (no gRPC)
- Forwards:
  - **Metrics** to Grafana Cloud Prometheus
  - **Logs** to Grafana Cloud Loki
  - **Traces** to Grafana Cloud Tempo
- Accepts telemetry from applications over OTLP HTTP
- Prometheus scrape endpoint exposed at port `8888`
- Configurable **Grafana Cloud token via environment variable**

---

## 📁 Folder Structure

```

flm-docker-lgtm/
├── Dockerfile               # Builds OTEL Collector container
├── otel-config.yaml         # OTEL config (env-based token)
├── docker-compose.yml       # Optional: for local testing
├── config/
│   └── prometheus/
│       └── prometheus.yml   # For local Prometheus use (optional)

````

---

## 🐳 DockerHub Deployment

### Build the Docker image:

```bash
docker build -t <YOUR_DOCKERHUB_USERNAME>/<project_name> .
````

### Push to DockerHub:

```bash
docker push <YOUR_DOCKERHUB_USERNAME>/<project_name>
```

---

## 🚀 Deploy to Render (Production)

1. Create a **new Web Service** on [Render.com](https://render.com/)

2. Choose **Docker** and enter your image name:
   `yourname/otel-collector`

3. Set the following **environment variable**:

   ```
   GRAFANA_CLOUD_API_TOKEN = your-grafana-cloud-token
   ```

4. Expose these **ports**:

   * `4318` – OTLP HTTP (for apps to send telemetry)
   * `8888` – Prometheus scrape endpoint (Grafana uses this)

---

## 📊 Grafana Cloud Setup

In your [Grafana Cloud](https://grafana.com/cloud/) instance:

1. Go to **Administration → Data Sources**
2. Add or update:

   * **Prometheus**:
     `https://your-render-service-url:8888`
   * **Loki**:
     Auto-configured when OTEL pushes logs
   * **Tempo**:
     `https://.../otlp/v1/traces`

---

## 🔒 Security

* The Grafana Cloud token is **not hardcoded**
* Set via the `GRAFANA_CLOUD_API_TOKEN = env` token

## 🧪 Local Development (Optional)

Use Docker Compose for testing locally:

```bash
docker-compose up
```

Then visit `localhost:8888/metrics` to see Prometheus data.

---
## 📦 License

MIT — Free to use and modify.