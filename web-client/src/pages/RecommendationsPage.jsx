export default function RecommendationsPage({ t }) {
  const cards = [
    {
      label: t.morning,
      title: t.morningCareTitle,
      text: t.morningCareText,
    },
    {
      label: t.evening,
      title: t.eveningCareTitle,
      text: t.eveningCareText,
    },
    {
      label: t.weekly,
      title: t.weeklyCareTitle,
      text: t.weeklyCareText,
    },
  ];

  return (
    <section className="page-block">
      <div className="section-title">
        <p className="eyebrow">{t.recommendations}</p>
        <h3>{t.careTitle}</h3>
      </div>

      <div className="info-grid">
        {cards.map((card) => (
          <div className="info-card care-card" key={card.label}>
            <span>{card.label}</span>
            <h4>{card.title}</h4>
            <p>{card.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}