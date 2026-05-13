import { useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import { api } from "../services/api";

export default function UsersPage({ t, users, skins }) {
  const skinTypeOptions = [
    t.notDefined,
    t.skinTypeNormal,
    t.skinTypeDry,
    t.skinTypeOily,
    t.skinTypeCombination,
    t.skinTypeSensitive,
    t.skinTypeDehydrated,
    t.skinTypeIrritated,
    t.skinTypeProblem,
  ];

  const [localSkins, setLocalSkins] = useState(skins || []);
  const [editing, setEditing] = useState({});

  useEffect(() => {
    async function loadSkins() {
      try {
        const loadedSkins = await api.skins();
        setLocalSkins(loadedSkins || []);
      } catch (error) {
        console.error("Cannot load skins:", error);
        setLocalSkins(skins || []);
      }
    }

    loadSkins();
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
      alert(t.skinNotFoundForUser);
      return;
    }

    const key = String(row.id);

    const newType = editing[key]?.type ?? skin.type;
    const newDescription = editing[key]?.description ?? skin.description ?? "";

    if (!newType.trim()) {
      alert(t.enterSkinType);
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

      alert(t.skinDataUpdated);
    } catch (error) {
      alert(`${t.cannotUpdateSkin}: ${error.message}`);
      console.error("Update skin error:", error);
    }
  }

  const columns = [
    {
      key: "id",
      label: t.userId,
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
      label: t.skinId,
      render: (row) => {
        const skin = getSkinForUser(row.id);
        return skin ? skin.id : "—";
      },
    },
    {
      key: "skin_type",
      label: t.skinType,
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
      label: t.skinDescription,
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
            placeholder={t.shortSkinDescription}
          />
        );
      },
    },
    {
      key: "actions",
      label: t.actions,
      render: (row) => {
        const skin = getSkinForUser(row.id);

        if (!skin) return "—";

        return (
          <button
            className="primary-btn table-save-btn"
            onClick={() => saveSkin(row)}
          >
            {t.save}
          </button>
        );
      },
    },
  ];

  return (
    <section className="page-block">
      <div className="section-title">
        <p className="eyebrow">{t.adminPanel}</p>
        <h3>{t.users}</h3>
      </div>

      <div className="info-card">
        <h4>{t.patientSkinCards}</h4>
        <p>{t.patientSkinCardsText}</p>
      </div>

      <DataTable rows={users} columns={columns} t={t} initialSort="name" />
    </section>
  );
}