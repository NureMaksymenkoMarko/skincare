import { mockEnvironment } from "../data/mockData";

const API_URL =
  import.meta.env.VITE_API_URL || "https://skincare-l0s7.onrender.com";

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({
      error: "Request failed",
    }));

    throw new Error(err.error || err.message || "Request failed");
  }

  if (response.status === 204) return null;

  return response.json();
}

export const api = {
  async login(email, password) {
    await request("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    return await this.me();
  },

  async register(name, email, password, skin_type, skin_description) {
    await request("/api/register", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        password,
        skin_type,
        skin_description,
      }),
    });

    return await this.me();
  },

  async me() {
    return await request("/api/users/me");
  },

  async users() {
    return await request("/api/users");
  },

  async updateUser(id, data) {
    return await request(`/api/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  async deleteUser(id) {
    return await request(`/api/users/${id}`, {
      method: "DELETE",
    });
  },

  async skins() {
    return await request("/api/admin/skin");
  },

  async mySkin() {
    return await request("/api/users/me/skin");
  },

  async updateSkin(id, data) {
    return await request(`/api/admin/skin/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  async environment(userId) {
    try {
      return await request(`/api/users/${userId}/environment`);
    } catch (error) {
      return mockEnvironment.filter((row) => row.user_id === Number(userId));
    }
  },

  async analyses() {
    return await request("/api/analysis");
  },

  async analysesByUserId(userId) {
    return await request(`/api/users/${userId}/analysis`);
  },

  async createAnalysis(data) {
    return await request("/api/admin/analysis", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async updateAnalysis(id, data) {
    return await request(`/api/admin/analysis/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  async deleteAnalysis(id) {
    return await request(`/api/admin/analysis/${id}`, {
      method: "DELETE",
    });
  },

  async skinAnalysisRecords() {
    return await request("/api/record");
  },

  async createRecord(data) {
    return await request("/api/admin/record", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async deleteRecord(id) {
    return await request(`/api/admin/record/${id}`, {
      method: "DELETE",
    });
  },
};