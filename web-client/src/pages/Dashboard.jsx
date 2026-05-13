import StatCard from "../components/StatCard";

export default function Dashboard({ t, user, users, records, environment }) {
  const avg = (arr, key) =>
    arr.length
      ? (
          arr.reduce((sum, item) => sum + Number(item[key] || 0), 0) /
          arr.length
        ).toFixed(1)
      : "—";

  const clientCards = [
    {
      title: "Персональний догляд",
      text: "У цьому розділі користувач може переглядати рекомендації, які допомагають підібрати щоденний догляд відповідно до стану шкіри.",
    },
    {
      title: "Контроль середовища",
      text: "IoT-показники температури та вологості допомагають оцінити умови, які можуть впливати на сухість, подразнення або жирність шкіри.",
    },
    {
      title: "Історія стану шкіри",
      text: "Користувач може переглядати результати аналізів і відстежувати зміни стану шкіри після процедур або курсу догляду.",
    },
  ];

  const adminCards = [
    {
      title: "Керування пацієнтами",
      text: "Косметолог може переглядати список пацієнтів, контролювати їхні профілі та працювати з даними користувачів системи.",
    },
    {
      title: "Контроль аналізів",
      text: "Адміністратор має доступ до записів аналізу шкіри, може створювати нові записи та переглядати результати пацієнтів.",
    },
    {
      title: "IoT-моніторинг",
      text: "Система відображає показники середовища для пацієнтів, що дозволяє враховувати температуру та вологість при догляді за шкірою.",
    },
  ];

  const cards = user?.is_admin ? adminCards : clientCards;

  return (
    <section className="page-block">
      <div className="hero-card">
        <div>
          <p className="eyebrow">{t.dashboard}</p>
          <h3>{user?.is_admin ? t.introAdmin : t.introUser}</h3>
        </div>

        <div className="api-chip">Режим системи: активний</div>
      </div>

      <div className="stats-grid">
        {user?.is_admin && (
          <StatCard label={t.totalUsers} value={users.length} hint="Пацієнти системи" />
        )}

        <StatCard label={t.totalRecords} value={records.length} hint="Записи аналізу" />

        <StatCard
          label={t.avgTemp}
          value={`${avg(environment, "temperature")}°C`}
          hint="IoT DHT22"
        />

        <StatCard
          label={t.avgHumidity}
          value={`${avg(environment, "humidity")}%`}
          hint="IoT DHT22"
        />
      </div>

      <div className="info-grid">
        {cards.map((card) => (
          <div className="info-card" key={card.title}>
            <h4>{card.title}</h4>
            <p>{card.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}