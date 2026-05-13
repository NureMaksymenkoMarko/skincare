import StatCard from "../components/StatCard";

export default function Dashboard({ t, user, users, records, environment }) {
  const avg = (arr, key) => arr.length ? (arr.reduce((sum, item) => sum + Number(item[key] || 0), 0) / arr.length).toFixed(1) : "—";
  return (
    <section className="page-block">
      <div className="hero-card">
        <div><p className="eyebrow">{t.dashboard}</p><h3>{user?.is_admin ? t.introAdmin : t.introUser}</h3></div>
        <div className="api-chip">{t.apiMode}: {t.apiReal}</div>
      </div>
      <div className="stats-grid">
        {user?.is_admin && <StatCard label={t.totalUsers} value={users.length} hint="REST /api/users" />}
        <StatCard label={t.totalRecords} value={records.length} hint="REST /api/record" />
        <StatCard label={t.avgTemp} value={`${avg(environment, "temperature")}°C`} hint="IoT DHT22" />
        <StatCard label={t.avgHumidity} value={`${avg(environment, "humidity")}%`} hint="IoT DHT22" />
      </div>
      <div className="info-grid">
        <div className="info-card"><h4>Backend API</h4><p>Авторизація, користувачі, IoT-показники та записи аналізу підключаються через REST API. Якщо Render недоступний, використовується fallback-набір даних.</p></div>
        <div className="info-card"><h4>Localization</h4><p>Інтерфейс підтримує українську та англійську мови, а формат дат змінюється відповідно до обраної локалі.</p></div>
        <div className="info-card"><h4>Admin tools</h4><p>Адміністратор може керувати користувачами, записами аналізу, експортом, імпортом та backup.</p></div>
      </div>
    </section>
  );
}