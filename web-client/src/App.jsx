import { useEffect, useMemo, useState } from "react";
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
import { mockUsers } from "./data/mockData";

export default function App() {
  const [lang, setLang] = useState(localStorage.getItem("lang") || "uk");
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("dashboard");

  const [users, setUsers] = useState([]);
  const [skins, setSkins] = useState([]);
  const [records, setRecords] = useState([]);
  const [environment, setEnvironment] = useState([]);

  const t = translations[lang];

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  useEffect(() => {
    if (!user) return;

    async function load() {
      let loadedUsers = [];
      let loadedSkins = [];
      let loadedRecords = [];
      let loadedEnvironment = [];

      try {
        loadedUsers = user.is_admin ? await api.users() : [user];
      } catch (error) {
        console.warn("Users loading error:", error);
        loadedUsers = user.is_admin ? mockUsers : [user];
      }

      try {
        if (user.is_admin) {
          try {
            loadedSkins = await api.skins();
          } catch (error) {
            console.warn("All skins loading error:", error);
            loadedSkins = [];
          }

          if (!loadedSkins || loadedSkins.length === 0) {
            const skinGroups = await Promise.all(
              loadedUsers.map(async (item) => {
                try {
                  return await api.skinByUserId(item.id);
                } catch {
                  return null;
                }
              })
            );

            loadedSkins = skinGroups.filter(Boolean);
          }
        } else {
          try {
            const currentUserSkin = await api.skinByUserId(user.id);
            loadedSkins = currentUserSkin ? [currentUserSkin] : [];
          } catch {
            loadedSkins = [];
          }
        }
      } catch (error) {
        console.warn("Skins loading error:", error);
        loadedSkins = [];
      }

      try {
        if (user.is_admin) {
          loadedRecords = await api.analyses();
        } else {
          loadedRecords = await api.analysesByUserId(user.id);
        }
      } catch (error) {
        console.warn("Analysis loading error:", error);
        loadedRecords = [];
      }

      try {
        if (user.is_admin) {
          const environmentGroups = await Promise.all(
            loadedUsers.map(async (item) => {
              try {
                return await api.environment(item.id);
              } catch {
                return [];
              }
            })
          );

          loadedEnvironment = environmentGroups
            .flat()
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        } else {
          loadedEnvironment = await api.environment(user.id);
        }
      } catch (error) {
        console.warn("Environment loading error:", error);
        loadedEnvironment = [];
      }

      setUsers(loadedUsers);
      setSkins(loadedSkins);
      setRecords(loadedRecords);
      setEnvironment(loadedEnvironment);
    }

    load();
  }, [user]);

  const visibleRecords = useMemo(() => {
    return records;
  }, [records]);

  function logout() {
    setUser(null);
    setPage("dashboard");
    setUsers([]);
    setSkins([]);
    setRecords([]);
    setEnvironment([]);
    localStorage.removeItem("user");
  }

  if (!user) {
    return (
      <AuthPage t={t} lang={lang} setLang={setLang} onAuth={setUser} />
    );
  }

  let content = null;

  if (page === "dashboard") {
    content = (
      <Dashboard
        t={t}
        user={user}
        users={users}
        records={visibleRecords}
        environment={environment}
        skins={skins}
      />
    );
  }

  if (page === "profile") {
    content = <Profile t={t} user={user} setUser={setUser} skins={skins} />;
  }

  if (page === "users") {
    content = <UsersPage t={t} users={users} skins={skins} />;
  }

  if (page === "records") {
    content = (
      <RecordsPage
        t={t}
        records={visibleRecords}
        setRecords={setRecords}
        isAdmin={user.is_admin}
      />
    );
  }

  if (page === "environment") {
    content = (
      <EnvironmentPage t={t} environment={environment} lang={lang} />
    );
  }

  if (page === "recommendations") {
    content = <RecommendationsPage t={t} />;
  }

  if (page === "dataTools") {
    content = (
      <DataToolsPage
        t={t}
        users={users}
        records={records}
        environment={environment}
        setRecords={setRecords}
      />
    );
  }

  return (
    <Layout
      t={t}
      lang={lang}
      setLang={setLang}
      user={user}
      page={page}
      setPage={setPage}
      onLogout={logout}
    >
      {content}
    </Layout>
  );
}