export const mockUsers = [
  { id: 1, name: "Марко Максименко", email: "marko@example.com", is_admin: false, createdAt: "2026-05-02T10:20:00.000Z" },
  { id: 2, name: "Олена Косметолог", email: "admin@skincare.local", is_admin: true, createdAt: "2026-05-01T09:10:00.000Z" },
  { id: 3, name: "Анна Кравченко", email: "anna@example.com", is_admin: false, createdAt: "2026-05-03T14:25:00.000Z" },
  { id: 4, name: "Ірина Бондар", email: "iryna@example.com", is_admin: false, createdAt: "2026-05-04T08:45:00.000Z" }
];

export const mockEnvironment = [
  { id: 1, user_id: 1, temperature: 23.5, humidity: 45.2, created_at: "2026-05-07T09:30:00.000Z" },
  { id: 2, user_id: 1, temperature: 24.1, humidity: 47.0, created_at: "2026-05-07T12:10:00.000Z" },
  { id: 3, user_id: 1, temperature: 22.8, humidity: 43.9, created_at: "2026-05-07T18:20:00.000Z" },
  { id: 4, user_id: 3, temperature: 25.0, humidity: 51.2, created_at: "2026-05-07T13:00:00.000Z" }
];

export const mockRecords = [
  { id: 1, skin_condition: "Сухість та легке почервоніння", date: "2026-05-01", analysis_id: 1, createdAt: "2026-05-01T12:00:00.000Z" },
  { id: 2, skin_condition: "Підвищена жирність у T-зоні", date: "2026-05-03", analysis_id: 2, createdAt: "2026-05-03T12:00:00.000Z" },
  { id: 3, skin_condition: "Нерівний тон шкіри", date: "2026-05-05", analysis_id: 3, createdAt: "2026-05-05T12:00:00.000Z" }
];

export const mockRecommendations = [
  { id: 1, type: "morning", title: "Очищення та SPF", description: "М'який гель для вмивання, зволожувальний крем і SPF 30+." },
  { id: 2, type: "evening", title: "Відновлення бар'єру", description: "Сироватка з ніацинамідом та крем для відновлення шкірного бар'єру." },
  { id: 3, type: "weekly", title: "Контроль стану", description: "Раз на тиждень фіксувати зміни шкіри та порівнювати з IoT-показниками." }
];