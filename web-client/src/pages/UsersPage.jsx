import { useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import { api } from "../services/api";

const skinTypeOptions = [
  "Не визначено",
  "Normal",
  "Суха шкіра",
  "Жирна шкіра",
  "Комбінована шкіра",
  "Чутлива шкіра",
  "Зневоднена шкіра",
  "Подразнена шкіра",
  "Проблемна шкіра з висипаннями",
];

export default function UsersPage({ t, users, skins }) {
  const [localSkins, setLocalSkins] = useState(skins || []);
  const [editing, setEditing] = useState({});

  useEffect(() => {
    setLocalSkins(skins || []);
  }, [skins]);

  function getSkinUserId(skin) {
    return (
      skin.user_id ||
      skin.userId ||
      skin.UserId ||
      skin.user?.id ||
      skin.User?.id
    );
  }

  function getSkinForUser(userId) {
    return localSkins.find(
      (skin) => Number(getSkinUserId(skin)) === Number(userId)
    );
  }

  function getEditValue(userId, field, fallback = "") {
    const key = String(userId);

    if (editing[key] && editing[key][field] !== undefined) {
      return editing[key][field];
    }

    return fallback || "";
  }

  function updateEditValue(userId, field, value) {
    const key = String(userId);

    setEditing((prev) => ({
      ...prev,
      [key]: {
        ...(prev[key] || {}),
        [field]: value,
      },
    }));
  }

  async function saveSkin(row) {
    const skin = getSkinForUser(row.id);

    if (!skin) {
      alert("Для цього користувача не знайдено ID шкіри");
      return;
    }

    const key = String(row.id);

    const newType = editing[key]?.type ?? skin.type;
    const newDescription = editing[key]?.description ?? skin.description;

    if (!newType.trim()) {
      alert("Введіть тип шкіри");
      return;
    }

    try {
      const updatedSkin = await api.updateSkin(skin.id, {
        type: newType,
        description: newDescription,
      });

      setLocalSkins((prev) =>
        prev.map((item) =>
          Number(item.id) === Number(updatedSkin.id) ? updatedSkin : item
        )
      );

      setEditing((prev) => {
        const copy = { ...prev };
        delete copy[key];
        return copy;
      });

      alert("Дані шкіри оновлено");
    } catch (error) {
      alert(`Не вдалося оновити дані шкіри: ${error.message}`);
      console.error("Update skin error:", error);
    }
  }

  const columns = [
    {
      key: "id",
      label: "ID користувача",
    },
    {
      key: "name",
      label: t.name,
    },
    {
      key: "email",
      label: t.email,
    },
    {
      key: "is_admin",
      label: t.role,
      render: (row) => (row.is_admin ? t.admin : t.user),
    },
    {
      key: "skin_id",
      label: "ID шкіри",
      render: (row) => {
        const skin = getSkinForUser(row.id);
        return skin ? skin.id : "—";
      },
    },
    {
      key: "skin_type",
      label: "Тип шкіри",
      render: (row) => {
        const skin = getSkinForUser(row.id);

        if (!skin) return "—";

        return (
          <select
            className="table-input"
            value={getEditValue(row.id, "type", skin.type)}
            onChange={(e) => updateEditValue(row.id, "type", e.target.value)}
          >
            {skinTypeOptions.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        );
      },
    },
    {
      key: "skin_description",
      label: "Опис шкіри",
      render: (row) => {
        const skin = getSkinForUser(row.id);

        if (!skin) return "—";

        return (
          <textarea
            className="table-textarea"
            value={getEditValue(row.id, "description", skin.description)}
            onChange={(e) =>
              updateEditValue(row.id, "description", e.target.value)
            }
            placeholder="Короткий опис стану шкіри"
          />
        );
      },
    },
    {
      key: "actions",
      label: "Дії",
      render: (row) => {
        const skin = getSkinForUser(row.id);

        if (!skin) return "—";

        return (
          <button
            className="primary-btn table-save-btn"
            onClick={() => saveSkin(row)}
          >
            Зберегти
          </button>
        );
      },
    },
  ];

  return (
    <section className="page-block">
      <div className="section-title">
        <p className="eyebrow">Admin</p>
        <h3>{t.users}</h3>
      </div>

      <div className="info-card">
        <h4>Картки шкіри пацієнтів</h4>
        <p>
          Тут адміністратор може переглянути ID шкіри кожного користувача,
          змінити тип шкіри та додати короткий опис стану. Саме ID шкіри
          використовується при створенні нового аналізу.
        </p>
      </div>

      <DataTable rows={users} columns={columns} t={t} initialSort="name" />
    </section>
  );
}