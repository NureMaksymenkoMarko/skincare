import React, { useEffect, useMemo, useState } from "react";
import Layout from "./components/Layout";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import UsersPage from "./pages/UsersPage";
import RecordsPage from "./pages/RecordsPage";
import EnvironmentPage from "./pages/EnvironmentPage";
import RecommendationsPage from "./pages/RecommendationsPage";
import DataToolsPage from "./pages/DataToolsPage";
import { translations } from "./i18n/translations";
import { api } from "./services/api";

export default function App() {
  const [lang, setLang] = useState(localStorage.getItem("lang") || "uk");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user") || "null"));
  const [page, setPage] = useState("dashboard");
  const [users, setUsers] = useState([]);
  const [records, setRecords] = useState([]);
  const [environment, setEnvironment] = useState([]);
  const t = translations[lang];

  useEffect(() => { localStorage.setItem("lang", lang); }, [lang]);

  useEffect(() => {
    if (!user) return;
    localStorage.setItem("user", JSON.stringify(user));
    async function load() {
      const [loadedUsers, loadedRecords, loadedEnvironment] = await Promise.all([
        user.is_admin ? api.users() : Promise.resolve([user]),
        api.records(),
        api.environment(user.id)
      ]);
      setUsers(loadedUsers);
      setRecords(loadedRecords);
      setEnvironment(loadedEnvironment);
    }
    load();
  }, [user]);

  const visibleRecords = useMemo(() => user?.is_admin ? records : records.slice(0, 3), [records, user]);

  function logout() {
    localStorage.removeItem("user");
    setUser(null);
    setPage("dashboard");
  }

  if (!user) return <AuthPage t={t} lang={lang} setLang={setLang} onAuth={setUser} />;

  let content = null;
  if (page === "dashboard") content = <Dashboard t={t} user={user} users={users} records={visibleRecords} environment={environment} />;
  if (page === "profile") content = <Profile t={t} user={user} setUser={setUser} />;
  if (page === "users") content = <UsersPage t={t} users={users} lang={lang} />;
  if (page === "records") content = <RecordsPage t={t} records={visibleRecords} setRecords={setRecords} lang={lang} isAdmin={user.is_admin} />;
  if (page === "environment") content = <EnvironmentPage t={t} environment={environment} lang={lang} />;
  if (page === "recommendations") content = <RecommendationsPage t={t} />;
  if (page === "dataTools") content = <DataToolsPage t={t} users={users} records={records} environment={environment} setRecords={setRecords} />;

  return (
    <Layout t={t} lang={lang} setLang={setLang} user={user} page={page} setPage={setPage} onLogout={logout}>
      {content}
    </Layout>
  );
}