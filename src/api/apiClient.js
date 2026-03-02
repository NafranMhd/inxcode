// API service layer using native fetch
const API_BASE = '/api';

const api = {
    // Generic fetch wrapper
    async request(endpoint, options = {}) {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            ...options,
        };

        // Add auth token if available
        const token = localStorage.getItem('adminToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        const response = await fetch(`${API_BASE}${endpoint}`, config);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong');
        }

        return data;
    },

    // ─── Public APIs ───────────────────────────
    getProjects() {
        return this.request('/projects');
    },

    getTeam() {
        return this.request('/team');
    },

    getServices(category) {
        const query = category ? `?category=${category}` : '';
        return this.request(`/services${query}`);
    },

    submitContact(formData) {
        return this.request('/contact', {
            method: 'POST',
            body: JSON.stringify(formData),
        });
    },

    // ─── Auth APIs ─────────────────────────────
    login(email, password) {
        return this.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
    },

    register(name, email, password) {
        return this.request('/auth/register', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
        });
    },

    getMe() {
        return this.request('/auth/me');
    },

    // ─── Admin CRUD APIs ───────────────────────
    createProject(data) {
        return this.request('/projects', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    updateProject(id, data) {
        return this.request(`/projects/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    },

    deleteProject(id) {
        return this.request(`/projects/${id}`, { method: 'DELETE' });
    },

    createTeamMember(data) {
        return this.request('/team', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    updateTeamMember(id, data) {
        return this.request(`/team/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    },

    deleteTeamMember(id) {
        return this.request(`/team/${id}`, { method: 'DELETE' });
    },

    getMessages() {
        return this.request('/contact');
    },

    updateMessageStatus(id, status) {
        return this.request(`/contact/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ status }),
        });
    },

    deleteMessage(id) {
        return this.request(`/contact/${id}`, { method: 'DELETE' });
    },

    // ─── Upload ────────────────────────────────
    async uploadImage(file) {
        const formData = new FormData();
        formData.append('image', file);

        const token = localStorage.getItem('adminToken');
        const response = await fetch(`${API_BASE}/upload`, {
            method: 'POST',
            headers: token ? { Authorization: `Bearer ${token}` } : {},
            body: formData,
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        return data;
    },
};

export default api;
