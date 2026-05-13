import DataTable from "../components/DataTable";
import { formatDateTime } from "../utils/format";

export default function EnvironmentPage({ t, environment, lang }) {
  const columns = [
    { key: "id", label: "ID" },
    { key: "user_id", label: "User ID" },
    { key: "temperature", label: t.temperature, render: (row) => `${row.temperature} °C` },
    { key: "humidity", label: t.humidity, render: (row) => `${row.humidity}%` },
    { key: "created_at", label: t.date, render: (row) => formatDateTime(row.created_at, lang) }
  ];
  return (
    <section className="page-block">
      <div className="section-title"><p className="eyebrow">IoT / Wokwi</p><h3>{t.environment}</h3></div>
      <div className="chart-card">
        {environment.map((row) => (
          <div key={row.id} className="bar-row">
            <span>{formatDateTime(row.created_at, lang)}</span>
            <div className="bar-track"><div className="bar-fill" style={{ width: `${Math.min(row.humidity, 100)}%` }}></div></div>
            <strong>{row.temperature}°C / {row.humidity}%</strong>
          </div>
        ))}
      </div>
      <DataTable rows={environment} columns={columns} t={t} initialSort="created_at" />
    </section>
  );
}