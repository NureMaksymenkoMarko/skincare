import { useState } from "react";
import DataTable from "../components/DataTable";
import { api } from "../services/api";

export default function RecordsPage({ t, records, setRecords, isAdmin }) {
  const analysisTypes = [
    t.analysisTypeBlood,
    t.analysisTypeGlucose,
    t.analysisTypeScraping,
    t.analysisTypeAllergy,
    t.analysisTypeVitamins,
    t.analysisTypePhoto,
    t.analysisTypeSkinReview,
  ];

  const resultTemplates = [
    t.templateNoPathology,
    t.templateDryness,
    t.templateOiliness,
    t.templateReaction,
  ];

  const [form, setForm] = useState({
    analysis_type: analysisTypes[0],
    result: "",
    skin_id: "",
  });

  async function createAnalysis() {
    if (!form.analysis_type.trim()) {
      alert(t.chooseAnalysisType);
      return;
    }

    if (!form.result.trim()) {
      alert(t.enterAnalysisResult);
      return;
    }

    if (!form.skin_id || Number(form.skin_id) <= 0) {
      alert(t.enterCorrectSkinId);
      return;
    }

    try {
      const created = await api.createAnalysis({
        analysis_type: form.analysis_type,
        result: form.result,
        skin_id: Number(form.skin_id),
      });

      setRecords([created, ...records]);

      setForm({
        analysis_type: analysisTypes[0],
        result: "",
        skin_id: "",
      });

      alert(t.analysisCreated);
    } catch (error) {
      alert(`${t.cannotCreateAnalysis}: ${error.message}`);
      console.error("Create analysis error:", error);
    }
  }

  async function removeAnalysis(id) {
    const confirmed = confirm(t.confirmDeleteAnalysis);

    if (!confirmed) return;

    try {
      await api.deleteAnalysis(id);
      setRecords(records.filter((record) => record.id !== id));
    } catch (error) {
      alert(`${t.cannotDeleteAnalysis}: ${error.message}`);
      console.error("Delete analysis error:", error);
    }
  }

  const columns = [
    {
      key: "id",
      label: "ID",
    },
    {
      key: "analysis_type",
      label: t.analysisType,
      render: (row) => row.analysis_type || "—",
    },
    {
      key: "result",
      label: t.result,
      render: (row) => row.result || "—",
    },
    {
      key: "skin_id",
      label: t.skinId,
      render: (row) => row.skin_id || "—",
    },
    ...(isAdmin
      ? [
          {
            key: "actions",
            label: t.actions,
            render: (row) => (
              <button
                className="small-danger"
                onClick={() => removeAnalysis(row.id)}
              >
                {t.delete}
              </button>
            ),
          },
        ]
      : []),
  ];

  return (
    <section className="page-block">
      <div className="section-title">
        <p className="eyebrow">Skin analysis</p>
        <h3>{t.skinAnalysis}</h3>
      </div>

      {isAdmin && (
        <div className="form-card analysis-form-card">
          <div className="analysis-form-header">
            <div>
              <p className="eyebrow">{t.newAnalysisEyebrow}</p>
              <h4>{t.newAnalysis}</h4>
              <p>{t.newAnalysisDescription}</p>
            </div>
          </div>

          <div className="analysis-form-grid">
            <label>
              {t.analysisType}
              <select
                value={form.analysis_type}
                onChange={(e) =>
                  setForm({ ...form, analysis_type: e.target.value })
                }
              >
                {analysisTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>

            <label>
              {t.clientSkinId}
              <input
                type="number"
                min="1"
                placeholder={t.clientSkinIdPlaceholder}
                value={form.skin_id}
                onChange={(e) => setForm({ ...form, skin_id: e.target.value })}
              />
            </label>
          </div>

          <label>
            {t.analysisResult}
            <textarea
              className="analysis-result-input"
              placeholder={t.analysisResultPlaceholder}
              value={form.result}
              onChange={(e) => setForm({ ...form, result: e.target.value })}
            />
          </label>

          <div className="template-block">
            <p>{t.quickResultTemplates}</p>

            <div className="template-buttons">
              {resultTemplates.map((template) => (
                <button
                  type="button"
                  key={template}
                  onClick={() => setForm({ ...form, result: template })}
                >
                  {template}
                </button>
              ))}
            </div>
          </div>

          <div className="analysis-form-actions">
            <button
              type="button"
              className="secondary-btn"
              onClick={() =>
                setForm({
                  analysis_type: analysisTypes[0],
                  result: "",
                  skin_id: "",
                })
              }
            >
              {t.clear}
            </button>

            <button className="primary-btn" onClick={createAnalysis}>
              {t.createAnalysis}
            </button>
          </div>
        </div>
      )}

      <DataTable rows={records} columns={columns} t={t} initialSort="id" />
    </section>
  );
}