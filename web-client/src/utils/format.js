export function formatDate(value, lang = "uk") {
  if (!value) return "—";
  return new Intl.DateTimeFormat(lang === "uk" ? "uk-UA" : "en-US", {
    year: "numeric", month: "2-digit", day: "2-digit"
  }).format(new Date(value));
}

export function formatDateTime(value, lang = "uk") {
  if (!value) return "—";
  return new Intl.DateTimeFormat(lang === "uk" ? "uk-UA" : "en-US", {
    year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit"
  }).format(new Date(value));
}

export function downloadFile(filename, content, type = "application/json") {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export function toCsv(rows) {
  if (!rows.length) return "";
  const headers = Object.keys(rows[0]);
  const escape = (value) => `"${String(value ?? "").replaceAll('"', '""')}"`;
  return [headers.join(","), ...rows.map((row) => headers.map((h) => escape(row[h])).join(","))].join("\n");
}