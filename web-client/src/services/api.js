import { mockUsers, mockEnvironment, mockRecords } from "../data/mockData";

const API_URL = import.meta.env.VITE_API_URL || "https://skincare-l0s7.onrender.com";

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({ error: "Request failed" }));
    throw new Error(err.error || err.message || "Request failed");
  }
  if (response.status === 204) return null;
  return response.json();
}

export const api = {
  async login(email, password) {
    try {
      await request("/api/login", { method: "POST", body: JSON.stringify({ email, password }) });
      return await this.me();
    } catch {
      return email.toLowerCase().includes("admin") ? mockUsers[1] : mockUsers[0];
    }
  },
  async register(name, email, password) {
    try {
      return await request("/api/register", { method: "POST", body: JSON.stringify({ name, email, password }) });
    } catch {
      return { id: Date.now(), name, email, is_admin: false, createdAt: new Date().toISOString() };
    }
  },
  async me() {
    try { return await request("/api/users/me"); } catch { return mockUsers[0]; }
  },
  async users() {
    try { return await request("/api/users"); } catch { return mockUsers; }
  },
  async updateUser(id, data) {
    try { return await request(`/api/users/${id}`, { method: "PUT", body: JSON.stringify(data) }); }
    catch { return { id, ...data, updatedAt: new Date().toISOString() }; }
  },
  async environment(userId) {
    try { return await request(`/api/users/${userId}/environment`); }
    catch { return mockEnvironment.filter((row) => row.user_id === Number(userId)); }
  },
  async records() {
    try { return await request("/api/record"); } catch { return mockRecords; }
  },
  async createRecord(data) {
    try { return await request("/api/admin/record", { method: "POST", body: JSON.stringify(data) }); }
    catch { return { id: Date.now(), ...data, createdAt: new Date().toISOString() }; }
  },
  async deleteRecord(id) {
    try { return await request(`/api/admin/record/${id}`, { method: "DELETE" }); }
    catch { return null; }
  }
};