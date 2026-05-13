import { useState } from "react";
import { api } from "../services/api";

export default function Profile({ t, user, setUser }) {
  const [form, setForm] = useState({ name: user.name, email: user.email, password: "" });
  const [message, setMessage] = useState("");

  async function save() {
    const updated = await api.updateUser(user.id, form);
    setUser({ ...user, ...updated, name: form.name, email: form.email });
    setMessage(t.updated);
  }

  return (
    <section className="page-block">
      <div className="section-title"><p className="eyebrow">{t.profile}</p><h3>{user.name}</h3></div>
      <div className="form-card">
        <label>{t.name}<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
        <label>{t.email}<input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
        <label>{t.password}<input type="password" placeholder="••••••••" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></label>
        <button className="primary-btn" onClick={save}>{t.save}</button>
        {message && <p className="success-message">{message}</p>}
      </div>
    </section>
  );
}