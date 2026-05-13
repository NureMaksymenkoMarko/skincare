import { mockRecommendations } from "../data/mockData";

export default function RecommendationsPage({ t }) {
  const typeLabel = { morning: t.morning, evening: t.evening, weekly: t.weekly };
  return (
    <section className="page-block">
      <div className="section-title"><p className="eyebrow">Care plan</p><h3>{t.careTitle}</h3></div>
      <div className="recommendation-grid">
        {mockRecommendations.map((item) => (
          <article key={item.id} className="recommendation-card">
            <span>{typeLabel[item.type]}</span><h4>{item.title}</h4><p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}