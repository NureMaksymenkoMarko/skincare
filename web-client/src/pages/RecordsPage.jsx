import { useState } from "react";
import DataTable from "../components/DataTable";
import { api } from "../services/api";

const analysisTypes = [
  "Загальний аналіз крові",
  "Аналіз рівня глюкози",
  "Зішкріб шкіри",
  "Алергологічні проби",
  "Аналіз на вітаміни та мікроелементи",
  "Photo analysis",
  "Огляд стану шкіри",
];

const resultTemplates = [
  "Патологічних змін не виявлено. Рекомендовано продовжити базовий догляд.",
  "Виявлено ознаки сухості та подразнення шкіри. Рекомендовано зволожувальний догляд.",
  "Спостерігається підвищена жирність у T-зоні. Рекомендовано очищення та контроль себуму.",
  "Виявлено реакцію на косметичні компоненти. Рекомендовано тимчасово виключити подразники.",
];

export default function RecordsPage({ t, records, setRecords, isAdmin }) {
  const [form, setForm] = useState({
    analysis_type: analysisTypes[0],
    result: "",
    skin_id: "",
  });

  async function createAnalysis() {
    if (!form.analysis_type.trim()) {
      alert("Оберіть або введіть тип аналізу");
      return;
    }

    if (!form.result.trim()) {
      alert("Введіть результат аналізу");
      return;
    }

    if (!form.skin_id || Number(form.skin_id) <= 0) {
      alert("Введіть коректний ID шкіри клієнта");
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

      alert("Аналіз успішно створено");
    } catch (error) {
      alert(`Не вдалося створити аналіз: ${error.message}`);
      console.error("Create analysis error:", error);
    }
  }

  async function removeAnalysis(id) {
    const confirmed = confirm("Ви точно хочете видалити цей аналіз?");

    if (!confirmed) return;

    try {
      await api.deleteAnalysis(id);
      setRecords(records.filter((record) => record.id !== id));
    } catch (error) {
      alert(`Не вдалося видалити аналіз: ${error.message}`);
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
      label: "Тип аналізу",
      render: (row) => row.analysis_type || "—",
    },
    {
      key: "result",
      label: "Результат",
      render: (row) => row.result || "—",
    },
    {
      key: "skin_id",
      label: "ID шкіри",
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
        <h3>Аналізи шкіри</h3>
      </div>

      {isAdmin && (
        <div className="form-card analysis-form-card">
          <div className="analysis-form-header">
            <div>
              <p className="eyebrow">New analysis</p>
              <h4>Новий аналіз шкіри</h4>
              <p>
                Оберіть тип аналізу, введіть результат та вкажіть ID шкіри
                клієнта. ID шкіри можна подивитися у розділі
                <strong> “Користувачі”</strong>.
              </p>
            </div>
          </div>

          <div className="analysis-form-grid">
            <label>
              Тип аналізу
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
              ID шкіри клієнта
              <input
                type="number"
                min="1"
                placeholder="Наприклад: 1"
                value={form.skin_id}
                onChange={(e) => setForm({ ...form, skin_id: e.target.value })}
              />
            </label>
          </div>

          <label>
            Результат аналізу
            <textarea
              className="analysis-result-input"
              placeholder="Опишіть результат аналізу, виявлені особливості стану шкіри та коротку рекомендацію..."
              value={form.result}
              onChange={(e) => setForm({ ...form, result: e.target.value })}
            />
          </label>

          <div className="template-block">
            <p>Швидкі шаблони результату:</p>

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
              Очистити
            </button>

            <button className="primary-btn" onClick={createAnalysis}>
              Створити аналіз
            </button>
          </div>
        </div>
      )}

      <DataTable rows={records} columns={columns} t={t} initialSort="id" />
    </section>
  );
}