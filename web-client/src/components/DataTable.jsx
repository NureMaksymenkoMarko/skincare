import { useMemo, useState } from "react";

export default function DataTable({ rows, columns, t, initialSort }) {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState(initialSort || columns[0]?.key);
  const sortedRows = useMemo(() => {
    const filtered = rows.filter((row) => JSON.stringify(row).toLowerCase().includes(query.toLowerCase()));
    return [...filtered].sort((a, b) => String(a[sortKey] ?? "").localeCompare(String(b[sortKey] ?? "")));
  }, [rows, query, sortKey]);

  return (
    <div className="table-card">
      <div className="table-toolbar">
        <input placeholder={t.search} value={query} onChange={(e) => setQuery(e.target.value)} />
        <select value={sortKey} onChange={(e) => setSortKey(e.target.value)}>
          {columns.map((column) => <option key={column.key} value={column.key}>{t.sortBy}: {column.label}</option>)}
        </select>
      </div>
      <div className="table-scroll">
        <table>
          <thead><tr>{columns.map((column) => <th key={column.key}>{column.label}</th>)}</tr></thead>
          <tbody>
            {sortedRows.length ? sortedRows.map((row) => (
              <tr key={row.id || JSON.stringify(row)}>
                {columns.map((column) => <td key={column.key}>{column.render ? column.render(row) : String(row[column.key] ?? "—")}</td>)}
              </tr>
            )) : <tr><td colSpan={columns.length} className="empty-cell">{t.noData}</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}