import { Activity, BarChart3, Database, FileText, Globe2, HeartPulse, LogOut, Shield, Users } from "lucide-react";

const adminItems = [
  { key: "dashboard", icon: BarChart3 }, { key: "users", icon: Users },
  { key: "records", icon: FileText }, { key: "environment", icon: Activity },
  { key: "dataTools", icon: Database }
];

const userItems = [
  { key: "dashboard", icon: BarChart3 }, { key: "profile", icon: Shield },
  { key: "records", icon: FileText }, { key: "environment", icon: Activity },
  { key: "recommendations", icon: HeartPulse }
];

export default function Layout({ children, t, lang, setLang, user, page, setPage, onLogout }) {
  const items = user?.is_admin ? adminItems : userItems;
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon"><HeartPulse size={24} /></div>
          <div><h1>{t.appName}</h1><p>{t.appSubtitle}</p></div>
        </div>
        <nav className="nav">
          {items.map(({ key, icon: Icon }) => (
            <button key={key} className={page === key ? "nav-item active" : "nav-item"} onClick={() => setPage(key)}>
              <Icon size={18} /><span>{t[key]}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <button className="lang-btn" onClick={() => setLang(lang === "uk" ? "en" : "uk")}>
            <Globe2 size={17} /> {t.language}: {lang.toUpperCase()}
          </button>
          <button className="logout-btn" onClick={onLogout}><LogOut size={17} /> {t.logout}</button>
        </div>
      </aside>
      <main className="main">
        <header className="topbar">
          <div><p className="eyebrow">{user?.is_admin ? t.admin : t.user}</p><h2>{user?.name}</h2></div>
          <div className="status-pill"><span className="dot"></span>{t.online}</div>
        </header>
        {children}
      </main>
    </div>
  );
}