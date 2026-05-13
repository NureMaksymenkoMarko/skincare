import DataTable from "../components/DataTable";
import { formatDateTime } from "../utils/format";

export default function UsersPage({ t, users, lang }) {
  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: t.name },
    { key: "email", label: t.email },
    { key: "is_admin", label: t.role, render: (row) => row.is_admin ? t.admin : t.user },
    { key: "createdAt", label: t.date, render: (row) => formatDateTime(row.createdAt, lang) }
  ];
  return <section className="page-block"><div className="section-title"><p className="eyebrow">Admin</p><h3>{t.users}</h3></div><DataTable rows={users} columns={columns} t={t} initialSort="name" /></section>;
}