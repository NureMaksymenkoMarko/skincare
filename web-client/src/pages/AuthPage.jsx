import { useState } from "react";
import { Eye, EyeOff, Leaf } from "lucide-react";
import { api } from "../services/api";

const skinTypes = [
  "Normal",
  "Суха шкіра",
  "Жирна шкіра",
  "Комбінована шкіра",
  "Чутлива шкіра",
  "Зневоднена шкіра",
  "Подразнена шкіра",
  "Проблемна шкіра з висипаннями",
];

export default function AuthPage({ t, lang, setLang, onAuth }) {
  const [mode, setMode] = useState("login");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    skin_type: skinTypes[0],
    skin_description: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submit(event) {
    event.preventDefault();

    if (!form.email.trim() || !form.password.trim()) {
      alert("Введіть email та пароль");
      return;
    }

    if (mode === "register" && !form.name.trim()) {
      alert("Введіть ім'я");
      return;
    }

    setLoading(true);

    try {
      const user =
        mode === "login"
          ? await api.login(form.email, form.password)
          : await api.register(
              form.name,
              form.email,
              form.password,
              form.skin_type,
              form.skin_description
            );

      onAuth({ ...user, is_admin: Boolean(user.is_admin) });
    } catch (error) {
      alert(error.message || "Помилка авторизації");
      console.error("Auth error:", error);
    } finally {
      setLoading(false);
    }
  }

  function demo(isAdmin) {
    onAuth(
      isAdmin
        ? {
            id: 2,
            name: "Dr Kristina",
            email: "admin@skincare.local",
            is_admin: true,
          }
        : {
            id: 1,
            name: "Андрій",
            email: "andrii@example.com",
            is_admin: false,
          }
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-hero">
        <div className="auth-badge">🌿 SkinCare Web</div>

        <h2>Програмна система аналізу та догляду за шкірою</h2>

        <p>
          Web-клієнт підтримує роботу користувача та косметолога, перегляд
          аналізів шкіри, процедур догляду, IoT-показників і керування даними
          системи.
        </p>

        <div className="feature-grid">
          <span>🌿 SkinCare</span>
          <span>🧪 Аналізи</span>
          <span>🌡️ IoT</span>
          <span>👨‍⚕️ Косметолог</span>
        </div>
      </div>

      <div className="auth-card">
        <div className="brand big">
          <div className="brand-icon">
            <Leaf size={26} />
          </div>

          <div>
            <h1>SkinCare</h1>
            <p>Догляд за шкірою</p>
          </div>
        </div>

        <div className="auth-tabs">
          <button
            type="button"
            className={mode === "login" ? "active" : ""}
            onClick={() => setMode("login")}
          >
            {t.login}
          </button>

          <button
            type="button"
            className={mode === "register" ? "active" : ""}
            onClick={() => setMode("register")}
          >
            {t.register}
          </button>

          <button
            type="button"
            onClick={() => setLang(lang === "uk" ? "en" : "uk")}
          >
            {lang.toUpperCase()}
          </button>
        </div>

        <form onSubmit={submit}>
          {mode === "register" && (
            <label>
              {t.name}
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Прізвище та ім'я"
              />
            </label>
          )}

          <label>
            {t.email}
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Email"
            />
          </label>

          <label>
            {t.password}
            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Пароль"
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Показати пароль"
              >
                {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            </div>
          </label>

          {mode === "register" && (
            <>
              <label>
                Тип шкіри
                <select
                  value={form.skin_type}
                  onChange={(e) =>
                    setForm({ ...form, skin_type: e.target.value })
                  }
                >
                  {skinTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Опис стану шкіри
                <textarea
                  className="analysis-result-input"
                  value={form.skin_description}
                  onChange={(e) =>
                    setForm({ ...form, skin_description: e.target.value })
                  }
                  placeholder="Наприклад: є сухість, подразнення або висипання..."
                />
              </label>
            </>
          )}

          <button className="primary-btn" disabled={loading}>
            {loading
              ? "Завантаження..."
              : mode === "login"
                ? "Увійти"
                : "Зареєструватись"}
          </button>
        </form>

        <div className="demo-buttons">
          <button type="button" onClick={() => setMode("register")}>
            Немає акаунту? Зареєструватись
          </button>

          <button type="button" onClick={() => demo(false)}>
            Демо: пацієнт
          </button>

          <button type="button" onClick={() => demo(true)}>
            Демо: косметолог
          </button>
        </div>
      </div>
    </div>
  );
}