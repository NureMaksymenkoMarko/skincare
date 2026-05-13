import { useState } from "react";
import { HeartPulse } from "lucide-react";
import { api } from "../services/api";

export default function AuthPage({ t, lang, setLang, onAuth }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "Марко Максименко", email: "marko@example.com", password: "Qwerty123!" });
  const [loading, setLoading] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setLoading(true);
    try {
      const user = mode === "login" ? await api.login(form.email, form.password) : await api.register(form.name, form.email, form.password);
      onAuth({ ...user, is_admin: Boolean(user.is_admin) });
    } finally { setLoading(false); }
  }

  function demo(isAdmin) {
    onAuth(isAdmin
      ? { id: 2, name: "Олена Косметолог", email: "admin@skincare.local", is_admin: true }
      : { id: 1, name: "Марко Максименко", email: "marko@example.com", is_admin: false });
  }

  return (
    <div className="auth-page">
      <div className="auth-hero">
        <div className="brand big"><div className="brand-icon"><HeartPulse size={30} /></div><div><h1>{t.appName}</h1><p>{t.appSubtitle}</p></div></div>
        <h2>Web-клієнт програмної системи аналізу та догляду за шкірою</h2>
        <p>{t.apiNote}</p>
        <div className="feature-grid"><span>REST API</span><span>UA / EN</span><span>Admin panel</span><span>IoT data</span></div>
      </div>
      <div className="auth-card">
        <div className="auth-tabs">
          <button className={mode === "login" ? "active" : ""} onClick={() => setMode("login")}>{t.login}</button>
          <button className={mode === "register" ? "active" : ""} onClick={() => setMode("register")}>{t.register}</button>
          <button onClick={() => setLang(lang === "uk" ? "en" : "uk")}>{lang.toUpperCase()}</button>
        </div>
        <form onSubmit={submit}>
          {mode === "register" && <label>{t.name}<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>}
          <label>{t.email}<input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
          <label>{t.password}<input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></label>
          <button className="primary-btn" disabled={loading}>{mode === "login" ? t.signIn : t.signUp}</button>
        </form>
        <div className="demo-buttons">
          <button onClick={() => demo(false)}>{t.demoLogin}: {t.user}</button>
          <button onClick={() => demo(true)}>{t.demoLogin}: {t.admin}</button>
        </div>
      </div>
    </div>
  );
}