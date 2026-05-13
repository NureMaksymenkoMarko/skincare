import DataTable from "../components/DataTable";

export default function UsersPage({ t, users, skins }) {
  function getSkinUserId(skin) {
    return skin.user_id || skin.userId || skin.UserId || skin.user?.id;
  }

  function getSkinForUser(userId) {
    return skins.find((skin) => Number(getSkinUserId(skin)) === Number(userId));
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
        return skin?.type || "—";
      },
    },
  ];

  return (
    <section className="page-block">
      <div className="section-title">
        <p className="eyebrow">Admin</p>
        <h3>{t.users}</h3>
      </div>

      <DataTable rows={users} columns={columns} t={t} initialSort="name" />
    </section>
  );
}