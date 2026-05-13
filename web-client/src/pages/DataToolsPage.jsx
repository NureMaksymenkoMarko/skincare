import { useRef, useState } from "react";
import { downloadFile, toCsv } from "../utils/format";

export default function DataToolsPage({ t, users, records, environment, setRecords }) {
  const fileRef = useRef(null);
  const [message, setMessage] = useState("");
  const snapshot = { exportedAt: new Date().toISOString(), users, records, environment };

  function exportJson() { downloadFile("skincare-export.json", JSON.stringify(snapshot, null, 2)); }
  function exportCsv() { downloadFile("skin-records.csv", toCsv(records), "text/csv"); }
  function backup() { localStorage.setItem("skincare-backup", JSON.stringify(snapshot)); setMessage(t.backupCreated); }
  function importJson(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        if (Array.isArray(parsed.records)) setRecords(parsed.records);
        setMessage(t.imported);
      } catch { setMessage("Import error"); }
    };
    reader.readAsText(file);
  }

  return (
    <section className="page-block">
      <div className="section-title"><p className="eyebrow">Data management</p><h3>{t.dataTools}</h3></div>
      <div className="tool-grid">
        <button className="tool-card" onClick={exportJson}><strong>{t.exportJson}</strong><span>users + records + environment</span></button>
        <button className="tool-card" onClick={exportCsv}><strong>{t.exportCsv}</strong><span>skin analysis records</span></button>
        <button className="tool-card" onClick={() => fileRef.current.click()}><strong>{t.importJson}</strong><span>restore records from JSON</span></button>
        <button className="tool-card" onClick={backup}><strong>{t.backup}</strong><span>localStorage snapshot</span></button>
      </div>
      <input hidden ref={fileRef} type="file" accept="application/json" onChange={importJson} />
      {message && <p className="success-message">{message}</p>}
    </section>
  );
}