import { useState } from "react";
import DataTable from "../components/DataTable";
import { api } from "../services/api";
import { formatDate } from "../utils/format";

export default function RecordsPage({ t, records, setRecords, lang, isAdmin }) {
  const [form, setForm] = useState({ skin_condition: "", date: new Date().toISOString().slice(0, 10), analysis_id: 1 });

  async function createRecord() {
    if (!form.skin_condition.trim()) return;
    const created = await api.createRecord({ ...form, analysis_id: Number(form.analysis_id) });
    setRecords([created, ...records]);
    setForm({ skin_condition: "", date: new Date().toISOString().slice(0, 10), analysis_id: 1 });
  }

  async function remove(id) {
    await api.deleteRecord(id);
    setRecords(records.filter((record) => record.id !== id));
  }

  const columns = [
    { key: "id", label: "ID" },
    { key: "skin_condition", label: t.skinCondition },
    { key: "date", label: t.date, render: (row) => formatDate(row.date, lang) },
    { key: "analysis_id", label: t.analysisId },
    ...(isAdmin ? [{ key: "actions", label: t.actions, render: (row) => <button className="small-danger" onClick={() => remove(row.id)}>{t.delete}</button> }] : [])
  ];

  return (
    <section className="page-block">
      <div className="section-title"><p className="eyebrow">Skin analysis</p><h3>{t.records}</h3></div>
      {isAdmin && (
        <div className="form-card inline-form">
          <input placeholder={t.skinCondition} value={form.skin_condition} onChange={(e) => setForm({ ...form, skin_condition: e.target.value })} />
          <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
          <input type="number" value={form.analysis_id} onChange={(e) => setForm({ ...form, analysis_id: e.target.value })} />
          <button className="primary-btn" onClick={createRecord}>{t.create}</button>
        </div>
      )}
      <DataTable rows={records} columns={columns} t={t} initialSort="date" />
    </section>
  );
}