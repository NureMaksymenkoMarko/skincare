import StatCard from "../components/StatCard";

export default function Dashboard({
  t,
  user,
  users,
  records,
  environment,
  skins = [],
}) {
  const avg = (arr, key) =>
    arr.length
      ? (
          arr.reduce((sum, item) => sum + Number(item[key] || 0), 0) /
          arr.length
        ).toFixed(1)
      : "—";

  function getSkinUserId(skin) {
    return (
      skin.user_id ||
      skin.userId ||
      skin.UserId ||
      skin.user?.id ||
      skin.User?.id
    );
  }

  function getCurrentUserSkin() {
    if (!user) return null;

    return skins.find(
      (skin) => Number(getSkinUserId(skin)) === Number(user.id)
    );
  }

  const currentSkin = getCurrentUserSkin();

  const clientCards = [
    {
      title: t.personalCareTitle,
      text: t.personalCareText,
    },
    {
      title: t.environmentControlTitle,
      text: t.environmentControlText,
    },
    {
      title: t.skinHistoryTitle,
      text: t.skinHistoryText,
    },
  ];

  const adminCards = [
    {
      title: t.patientManagementTitle,
      text: t.patientManagementText,
    },
    {
      title: t.analysisControlTitle,
      text: t.analysisControlText,
    },
    {
      title: t.iotMonitoringTitle,
      text: t.iotMonitoringText,
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

        <div className="api-chip">
          {t.apiMode}: {t.apiReal}
        </div>
      </div>

      <div className="stats-grid">
        {user?.is_admin && (
          <StatCard
            label={t.totalUsers}
            value={users.length}
            hint={t.systemPatients}
          />
        )}

        <StatCard
          label={t.totalRecords}
          value={records.length}
          hint={t.analysisRecords}
        />

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

      {!user?.is_admin && (
        <div className="hero-card">
          <div>
            <p className="eyebrow">{t.mySkinState}</p>
            <h3>{currentSkin?.type || t.notDefined}</h3>
            <p className="skin-description">
              {currentSkin?.description || t.noSkinDescription}
            </p>
          </div>

          <div className="api-chip">
            {t.skinId}: {currentSkin?.id || "—"}
          </div>
        </div>
      )}

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