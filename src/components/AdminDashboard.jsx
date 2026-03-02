import { useState, useEffect } from 'react';
import api from '../api/apiClient';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [token, setToken] = useState(localStorage.getItem('adminToken') || '');
    const [isLoggedIn, setIsLoggedIn] = useState(!!token);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [loginError, setLoginError] = useState('');
    const [darkMode, setDarkMode] = useState(localStorage.getItem('adminTheme') !== 'light');

    // Data
    const [messages, setMessages] = useState([]);
    const [projects, setProjects] = useState([]);
    const [teamMembers, setTeamMembers] = useState([]);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);

    // Forms
    const [showForm, setShowForm] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formLoading, setFormLoading] = useState(false);
    const [expandedMsg, setExpandedMsg] = useState(null);

    const emptyProject = { title: '', category: '', description: '', technologies: '', image: '' };
    const emptyTeam = { name: '', role: '', department: '', bio: '', image: '', linkedin: '', github: '', twitter: '' };
    const emptyService = { title: '', description: '', features: '', color: '#0ea5e9', category: 'software', icon: '' };

    const [projectForm, setProjectForm] = useState(emptyProject);
    const [teamForm, setTeamForm] = useState(emptyTeam);
    const [serviceForm, setServiceForm] = useState(emptyService);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');

    // Theme
    useEffect(() => {
        localStorage.setItem('adminTheme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    // Auth
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginError('');
        try {
            const res = await api.login(loginData.email, loginData.password);
            localStorage.setItem('adminToken', res.token);
            setToken(res.token);
            setIsLoggedIn(true);
        } catch (err) {
            setLoginError(err.message || 'Invalid credentials');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        setToken('');
        setIsLoggedIn(false);
    };

    // Fetch all data on login, then per tab
    useEffect(() => {
        if (!isLoggedIn) return;
        const fetchAll = async () => {
            setLoading(true);
            try {
                const [msgRes, projRes, teamRes, svcRes] = await Promise.allSettled([
                    api.getMessages(), api.getProjects(), api.getTeam(), api.getServices()
                ]);
                if (msgRes.status === 'fulfilled') setMessages(msgRes.value.data);
                if (projRes.status === 'fulfilled') setProjects(projRes.value.data);
                if (teamRes.status === 'fulfilled') setTeamMembers(teamRes.value.data);
                if (svcRes.status === 'fulfilled') setServices(svcRes.value.data);
            } catch (err) {
                if (err.message?.includes('authorized')) handleLogout();
            }
            setLoading(false);
        };
        fetchAll();
    }, [isLoggedIn]);

    // Image
    const handleImageSelect = (e) => {
        const file = e.target.files[0];
        if (file) { setImageFile(file); setImagePreview(URL.createObjectURL(file)); }
    };
    const uploadImage = async () => {
        if (!imageFile) return imagePreview || '';
        try { const res = await api.uploadImage(imageFile); return res.data.url; }
        catch { return ''; }
    };

    // Open forms
    const openAddForm = () => {
        setEditingItem(null); setImageFile(null); setImagePreview('');
        if (activeTab === 'projects') setProjectForm(emptyProject);
        if (activeTab === 'team') setTeamForm(emptyTeam);
        if (activeTab === 'services') setServiceForm(emptyService);
        setShowForm(true);
    };
    const openEditForm = (item) => {
        setEditingItem(item); setImageFile(null); setImagePreview(item.image || '');
        if (activeTab === 'projects') setProjectForm({ title: item.title, category: item.category, description: item.description, technologies: item.technologies.join(', '), image: item.image || '' });
        if (activeTab === 'team') setTeamForm({ name: item.name, role: item.role, department: item.department, bio: item.bio || '', image: item.image || '', linkedin: item.social?.linkedin || '', github: item.social?.github || '', twitter: item.social?.twitter || '' });
        if (activeTab === 'services') setServiceForm({ title: item.title, description: item.description, features: item.features.join(', '), color: item.color || '#0ea5e9', category: item.category, icon: item.icon || '' });
        setShowForm(true);
    };

    // Save handlers
    const saveProject = async (e) => {
        e.preventDefault(); setFormLoading(true);
        try {
            const imageUrl = await uploadImage();
            const data = { title: projectForm.title, category: projectForm.category, description: projectForm.description, technologies: projectForm.technologies.split(',').map(t => t.trim()).filter(Boolean), image: imageUrl || projectForm.image };
            if (editingItem) { const res = await api.updateProject(editingItem._id, data); setProjects(projects.map(p => p._id === editingItem._id ? res.data : p)); }
            else { const res = await api.createProject(data); setProjects([...projects, res.data]); }
            setShowForm(false);
        } catch (err) { alert(err.message); }
        setFormLoading(false);
    };
    const saveTeamMember = async (e) => {
        e.preventDefault(); setFormLoading(true);
        try {
            const imageUrl = await uploadImage();
            const data = { name: teamForm.name, role: teamForm.role, department: teamForm.department, bio: teamForm.bio, image: imageUrl || teamForm.image, social: { linkedin: teamForm.linkedin, github: teamForm.github, twitter: teamForm.twitter } };
            if (editingItem) { const res = await api.updateTeamMember(editingItem._id, data); setTeamMembers(teamMembers.map(t => t._id === editingItem._id ? res.data : t)); }
            else { const res = await api.createTeamMember(data); setTeamMembers([...teamMembers, res.data]); }
            setShowForm(false);
        } catch (err) { alert(err.message); }
        setFormLoading(false);
    };
    const saveService = async (e) => {
        e.preventDefault(); setFormLoading(true);
        try {
            const data = { title: serviceForm.title, description: serviceForm.description, features: serviceForm.features.split(',').map(f => f.trim()).filter(Boolean), color: serviceForm.color, category: serviceForm.category, icon: serviceForm.icon };
            if (editingItem) { await api.request(`/services/${editingItem._id}`, { method: 'PUT', body: JSON.stringify(data) }); setServices(services.map(s => s._id === editingItem._id ? { ...s, ...data } : s)); }
            else { await api.request('/services', { method: 'POST', body: JSON.stringify(data) }); const res = await api.getServices(); setServices(res.data); }
            setShowForm(false);
        } catch (err) { alert(err.message); }
        setFormLoading(false);
    };

    // Delete handlers
    const deleteMessage = async (id) => { if (!confirm('Delete this message?')) return; try { await api.deleteMessage(id); setMessages(messages.filter(m => m._id !== id)); } catch (err) { alert(err.message); } };
    const deleteProject = async (id) => { if (!confirm('Delete this project?')) return; try { await api.deleteProject(id); setProjects(projects.filter(p => p._id !== id)); } catch (err) { alert(err.message); } };
    const deleteTeamMember = async (id) => { if (!confirm('Remove this team member?')) return; try { await api.deleteTeamMember(id); setTeamMembers(teamMembers.filter(t => t._id !== id)); } catch (err) { alert(err.message); } };
    const deleteService = async (id) => { if (!confirm('Delete this service?')) return; try { await api.request(`/services/${id}`, { method: 'DELETE' }); setServices(services.filter(s => s._id !== id)); } catch (err) { alert(err.message); } };
    const updateStatus = async (id, status) => { try { await api.updateMessageStatus(id, status); setMessages(messages.map(m => m._id === id ? { ...m, status } : m)); } catch (err) { alert(err.message); } };

    // ─── LOGIN ─────────────────────────────────
    if (!isLoggedIn) {
        return (
            <div className={`adm ${darkMode ? 'adm-dark' : 'adm-light'}`}>
                <div className="adm-login-page">
                    <div className="adm-login-card">
                        <div className="adm-login-logo">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                        </div>
                        <h1>Welcome Back</h1>
                        <p>Sign in to Inxcode Admin</p>
                        <form onSubmit={handleLogin}>
                            <div className="adm-input-group">
                                <label>Email address</label>
                                <input type="email" value={loginData.email} onChange={e => setLoginData({...loginData, email: e.target.value})} placeholder="admin@inxcode.com" required />
                            </div>
                            <div className="adm-input-group">
                                <label>Password</label>
                                <input type="password" value={loginData.password} onChange={e => setLoginData({...loginData, password: e.target.value})} placeholder="••••••••" required />
                            </div>
                            {loginError && <div className="adm-alert adm-alert-error">{loginError}</div>}
                            <button type="submit" className="adm-btn-primary">Sign In</button>
                        </form>
                        <a className="adm-link" onClick={() => window.location.hash = ''}>← Back to website</a>
                    </div>
                </div>
            </div>
        );
    }

    // ─── STATS ─────────────────────────────────
    const newMsgCount = messages.filter(m => m.status === 'new').length;
    const stats = [
        { label: 'Messages', value: messages.length, accent: 'var(--accent-blue)', sub: `${newMsgCount} new`, icon: '✉' },
        { label: 'Projects', value: projects.length, accent: 'var(--accent-purple)', sub: 'Portfolio', icon: '📁' },
        { label: 'Team', value: teamMembers.length, accent: 'var(--accent-green)', sub: 'Members', icon: '👥' },
        { label: 'Services', value: services.length, accent: 'var(--accent-orange)', sub: 'Active', icon: '⚡' },
    ];

    // ─── SIDEBAR TABS ──────────────────────────
    const tabs = [
        { key: 'dashboard', label: 'Dashboard', icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>) },
        { key: 'messages', label: 'Messages', badge: newMsgCount, icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>) },
        { key: 'projects', label: 'Projects', icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>) },
        { key: 'team', label: 'Team', icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>) },
        { key: 'services', label: 'Services', icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>) },
    ];

    // ─── FORM MODAL ────────────────────────────
    const renderFormModal = () => {
        if (!showForm) return null;
        const formTitle = `${editingItem ? 'Edit' : 'New'} ${activeTab === 'projects' ? 'Project' : activeTab === 'team' ? 'Team Member' : 'Service'}`;
        return (
            <div className="adm-modal-overlay" onClick={() => setShowForm(false)}>
                <div className="adm-modal" onClick={e => e.stopPropagation()}>
                    <div className="adm-modal-head">
                        <h2>{formTitle}</h2>
                        <button className="adm-modal-close" onClick={() => setShowForm(false)}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                        </button>
                    </div>
                    {activeTab === 'projects' && (
                        <form onSubmit={saveProject} className="adm-form">
                            <div className="adm-form-row">
                                <div className="adm-input-group"><label>Title *</label><input value={projectForm.title} onChange={e => setProjectForm({...projectForm, title: e.target.value})} placeholder="Project title" required /></div>
                                <div className="adm-input-group"><label>Category *</label>
                                    <select value={projectForm.category} onChange={e => setProjectForm({...projectForm, category: e.target.value})} required>
                                        <option value="">Choose…</option><option>Web Development</option><option>Mobile Development</option><option>Education Tech</option><option>Enterprise Software</option><option>AI & ML</option><option>SaaS</option>
                                    </select></div>
                            </div>
                            <div className="adm-input-group"><label>Description *</label><textarea value={projectForm.description} onChange={e => setProjectForm({...projectForm, description: e.target.value})} placeholder="Brief description" rows="3" required /></div>
                            <div className="adm-input-group"><label>Technologies *</label><input value={projectForm.technologies} onChange={e => setProjectForm({...projectForm, technologies: e.target.value})} placeholder="React, Node.js, MongoDB (comma-separated)" required /></div>
                            <div className="adm-input-group"><label>Image</label>
                                <div className="adm-upload">{imagePreview && <img src={imagePreview} alt="Preview" className="adm-upload-preview" />}<input type="file" accept="image/*" onChange={handleImageSelect} /></div>
                            </div>
                            <button type="submit" className="adm-btn-primary" disabled={formLoading}>{formLoading ? 'Saving…' : editingItem ? 'Update' : 'Create'}</button>
                        </form>
                    )}
                    {activeTab === 'team' && (
                        <form onSubmit={saveTeamMember} className="adm-form">
                            <div className="adm-form-row">
                                <div className="adm-input-group"><label>Name *</label><input value={teamForm.name} onChange={e => setTeamForm({...teamForm, name: e.target.value})} placeholder="Full name" required /></div>
                                <div className="adm-input-group"><label>Role *</label><input value={teamForm.role} onChange={e => setTeamForm({...teamForm, role: e.target.value})} placeholder="e.g. Lead Developer" required /></div>
                            </div>
                            <div className="adm-form-row">
                                <div className="adm-input-group"><label>Department *</label>
                                    <select value={teamForm.department} onChange={e => setTeamForm({...teamForm, department: e.target.value})} required>
                                        <option value="">Choose…</option><option>Leadership</option><option>Technology</option><option>Design</option><option>Administration</option><option>Human Resources</option><option>Marketing</option>
                                    </select></div>
                                <div className="adm-input-group"><label>Bio</label><input value={teamForm.bio} onChange={e => setTeamForm({...teamForm, bio: e.target.value})} placeholder="Short bio" /></div>
                            </div>
                            <div className="adm-form-row adm-form-row-3">
                                <div className="adm-input-group"><label>LinkedIn</label><input value={teamForm.linkedin} onChange={e => setTeamForm({...teamForm, linkedin: e.target.value})} placeholder="URL" /></div>
                                <div className="adm-input-group"><label>GitHub</label><input value={teamForm.github} onChange={e => setTeamForm({...teamForm, github: e.target.value})} placeholder="URL" /></div>
                                <div className="adm-input-group"><label>Twitter</label><input value={teamForm.twitter} onChange={e => setTeamForm({...teamForm, twitter: e.target.value})} placeholder="URL" /></div>
                            </div>
                            <div className="adm-input-group"><label>Photo</label>
                                <div className="adm-upload">{imagePreview && <img src={imagePreview} alt="Preview" className="adm-upload-preview" />}<input type="file" accept="image/*" onChange={handleImageSelect} /></div>
                            </div>
                            <button type="submit" className="adm-btn-primary" disabled={formLoading}>{formLoading ? 'Saving…' : editingItem ? 'Update' : 'Create'}</button>
                        </form>
                    )}
                    {activeTab === 'services' && (
                        <form onSubmit={saveService} className="adm-form">
                            <div className="adm-form-row">
                                <div className="adm-input-group"><label>Title *</label><input value={serviceForm.title} onChange={e => setServiceForm({...serviceForm, title: e.target.value})} placeholder="Service name" required /></div>
                                <div className="adm-input-group"><label>Category *</label>
                                    <select value={serviceForm.category} onChange={e => setServiceForm({...serviceForm, category: e.target.value})} required><option value="software">Software</option><option value="education">Education</option></select></div>
                            </div>
                            <div className="adm-input-group"><label>Description *</label><textarea value={serviceForm.description} onChange={e => setServiceForm({...serviceForm, description: e.target.value})} placeholder="Service description" rows="3" required /></div>
                            <div className="adm-input-group"><label>Features *</label><input value={serviceForm.features} onChange={e => setServiceForm({...serviceForm, features: e.target.value})} placeholder="Feature 1, Feature 2 (comma-separated)" required /></div>
                            <div className="adm-form-row">
                                <div className="adm-input-group"><label>Color</label>
                                    <div className="adm-color-pick"><input type="color" value={serviceForm.color} onChange={e => setServiceForm({...serviceForm, color: e.target.value})} /><span>{serviceForm.color}</span></div>
                                </div>
                                <div className="adm-input-group"><label>Icon</label><input value={serviceForm.icon} onChange={e => setServiceForm({...serviceForm, icon: e.target.value})} placeholder="monitor, code, cloud…" /></div>
                            </div>
                            <button type="submit" className="adm-btn-primary" disabled={formLoading}>{formLoading ? 'Saving…' : editingItem ? 'Update' : 'Create'}</button>
                        </form>
                    )}
                </div>
            </div>
        );
    };

    // ─── DASHBOARD ─────────────────────────────
    return (
        <div className={`adm ${darkMode ? 'adm-dark' : 'adm-light'}`}>
            {renderFormModal()}

            {/* Sidebar */}
            <aside className="adm-side">
                <div className="adm-side-brand">
                    <div className="adm-brand-icon">
                    <img src={darkMode ? '/whitelogo.png' : '/logo.png'} alt="Inxcode" className="adm-brand-logo" />
                </div>
                    <div><strong>Inxcode</strong><small>Admin Panel</small></div>
                </div>

                <nav className="adm-side-nav">
                    {tabs.map(t => (
                        <button key={t.key} className={`adm-nav-item ${activeTab === t.key ? 'active' : ''}`} onClick={() => { setActiveTab(t.key); setShowForm(false); }}>
                            <span className="adm-nav-icon">{t.icon}</span>
                            <span className="adm-nav-label">{t.label}</span>
                            {t.badge > 0 && <span className="adm-badge">{t.badge}</span>}
                        </button>
                    ))}
                </nav>

                <div className="adm-side-bottom">
                    <button className="adm-theme-toggle" onClick={() => setDarkMode(!darkMode)}>
                        {darkMode
                            ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
                            : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                        }
                        <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
                    </button>
                    <button className="adm-logout" onClick={handleLogout}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                        <span>Sign Out</span>
                    </button>
                    <a className="adm-link-sm" onClick={() => window.location.hash = ''}>← Back to website</a>
                </div>
            </aside>

            {/* Main */}
            <main className="adm-main">
                {/* Topbar */}
                <header className="adm-topbar">
                    <div>
                        <h1 className="adm-page-title">{activeTab === 'dashboard' ? 'Dashboard' : tabs.find(t => t.key === activeTab)?.label}</h1>
                        <p className="adm-page-sub">{activeTab === 'dashboard' ? 'Welcome back, Admin' : `Manage your ${activeTab}`}</p>
                    </div>
                    {activeTab !== 'dashboard' && activeTab !== 'messages' && (
                        <button className="adm-btn-primary adm-btn-add" onClick={openAddForm}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                            Add {activeTab === 'projects' ? 'Project' : activeTab === 'team' ? 'Member' : 'Service'}
                        </button>
                    )}
                </header>

                {loading ? (
                    <div className="adm-loader"><div className="adm-spinner"></div><p>Loading data…</p></div>
                ) : (
                    <div className="adm-body">
                        {/* Dashboard Overview */}
                        {activeTab === 'dashboard' && (
                            <>
                                {/* Dashboard Header */}
                                <div className="adm-welcome">
                                    <div className="adm-welcome-left">
                                        <div className="adm-welcome-greeting">
                                            <h2>Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 17 ? 'Afternoon' : 'Evening'}, Admin</h2>
                                            <div className="adm-server-status">
                                                <span className="adm-status-dot adm-dot-live"></span>
                                                <span>System Online</span>
                                            </div>
                                        </div>
                                        <p className="adm-welcome-sub">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
                                    </div>
                                    <div className="adm-welcome-right">
                                        <div className="adm-kpi">
                                            <div className="adm-kpi-item">
                                                <span className="adm-kpi-val">{newMsgCount}</span>
                                                <span className="adm-kpi-label">New Today</span>
                                            </div>
                                            <div className="adm-kpi-divider"></div>
                                            <div className="adm-kpi-item">
                                                <span className="adm-kpi-val">{projects.length + teamMembers.length + services.length}</span>
                                                <span className="adm-kpi-label">Total Items</span>
                                            </div>
                                            <div className="adm-kpi-divider"></div>
                                            <div className="adm-kpi-item">
                                                <span className="adm-kpi-val adm-kpi-green">99.9%</span>
                                                <span className="adm-kpi-label">Uptime</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Stat Cards */}
                                <div className="adm-stats">
                                    {stats.map((s, i) => (
                                        <div key={i} className={`adm-stat-card adm-stat-${i}`} onClick={() => setActiveTab(['messages', 'projects', 'team', 'services'][i])}>
                                            <div className="adm-stat-icon-wrap">
                                                <div className="adm-stat-icon">{s.icon}</div>
                                            </div>
                                            <div className="adm-stat-info">
                                                <span className="adm-stat-val">{s.value}</span>
                                                <span className="adm-stat-label">{s.label}</span>
                                            </div>
                                            <div className="adm-stat-arrow">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Two Column Layout */}
                                <div className="adm-dash-grid">
                                    {/* Recent Messages */}
                                    <div className="adm-recent">
                                        <div className="adm-section-head">
                                            <h3>Recent Messages</h3>
                                            <button className="adm-view-all" onClick={() => setActiveTab('messages')}>View All →</button>
                                        </div>
                                        {messages.length === 0 && <p className="adm-empty-text">No messages yet</p>}
                                        {messages.slice(0, 5).map(msg => (
                                            <div key={msg._id} className="adm-recent-item" onClick={() => { setActiveTab('messages'); setExpandedMsg(msg._id); }}>
                                                <div className="adm-recent-avatar">{msg.name.charAt(0)}</div>
                                                <div className="adm-recent-info"><strong>{msg.name}</strong><span>{msg.subject}</span></div>
                                                <span className={`adm-status adm-status-${msg.status}`}>{msg.status}</span>
                                                <span className="adm-recent-date">{new Date(msg.createdAt).toLocaleDateString()}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Quick Actions */}
                                    <div className="adm-quick-actions">
                                        <div className="adm-section-head">
                                            <h3>Quick Actions</h3>
                                        </div>
                                        <div className="adm-action-grid">
                                            <button className="adm-action-btn" onClick={() => { setActiveTab('projects'); setTimeout(() => openAddForm(), 100); }}>
                                                <div className="adm-action-icon" style={{background: 'var(--accent-purple)'}}>
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
                                                </div>
                                                <span>Add Project</span>
                                            </button>
                                            <button className="adm-action-btn" onClick={() => { setActiveTab('team'); setTimeout(() => openAddForm(), 100); }}>
                                                <div className="adm-action-icon" style={{background: 'var(--accent-green)'}}>
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
                                                </div>
                                                <span>Add Member</span>
                                            </button>
                                            <button className="adm-action-btn" onClick={() => { setActiveTab('services'); setTimeout(() => openAddForm(), 100); }}>
                                                <div className="adm-action-icon" style={{background: 'var(--accent-orange)'}}>
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                                                </div>
                                                <span>Add Service</span>
                                            </button>
                                            <button className="adm-action-btn" onClick={() => window.location.hash = ''}>
                                                <div className="adm-action-icon" style={{background: 'var(--accent-blue)'}}>
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                                                </div>
                                                <span>View Website</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Messages */}
                        {activeTab === 'messages' && (
                            <div className="adm-table-container">
                                {messages.length === 0 ? <p className="adm-empty-text">No messages yet</p> : (
                                    <table className="adm-table">
                                        <thead><tr><th>Sender</th><th>Subject</th><th>Status</th><th>Date</th><th style={{textAlign:'right'}}>Actions</th></tr></thead>
                                        <tbody>
                                            {messages.map(msg => (
                                                <>
                                                    <tr key={msg._id} className={`${msg.status === 'new' ? 'adm-row-new' : ''} ${expandedMsg === msg._id ? 'adm-row-expanded' : ''}`} onClick={() => setExpandedMsg(expandedMsg === msg._id ? null : msg._id)}>
                                                        <td><div className="adm-sender"><div className="adm-sender-avatar">{msg.name.charAt(0)}</div><div><strong>{msg.name}</strong><small>{msg.email}</small></div></div></td>
                                                        <td>{msg.subject}</td>
                                                        <td><span className={`adm-status adm-status-${msg.status}`}>{msg.status}</span></td>
                                                        <td>{new Date(msg.createdAt).toLocaleDateString()}</td>
                                                        <td className="adm-actions">
                                                            {msg.status === 'new' && <button className="adm-btn-sm adm-btn-info" onClick={(e) => {e.stopPropagation(); updateStatus(msg._id, 'read')}}>Read</button>}
                                                            {msg.status === 'read' && <button className="adm-btn-sm adm-btn-success" onClick={(e) => {e.stopPropagation(); updateStatus(msg._id, 'replied')}}>Replied</button>}
                                                            <button className="adm-btn-sm adm-btn-danger" onClick={(e) => {e.stopPropagation(); deleteMessage(msg._id)}}>Delete</button>
                                                        </td>
                                                    </tr>
                                                    {expandedMsg === msg._id && (
                                                        <tr key={msg._id + '-detail'} className="adm-row-detail">
                                                            <td colSpan="5">
                                                                <div className="adm-msg-detail">
                                                                    <div className="adm-msg-meta"><span>📞 {msg.phone || 'N/A'}</span><span>📧 {msg.email}</span></div>
                                                                    <p>{msg.message}</p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )}
                                                </>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        )}

                        {/* Projects */}
                        {activeTab === 'projects' && (
                            <div className="adm-grid">{projects.map(p => (
                                <div key={p._id} className="adm-card">
                                    {p.image && <img src={p.image} alt={p.title} className="adm-card-img" />}
                                    <div className="adm-card-body">
                                        <div className="adm-card-top"><h3>{p.title}</h3><span className="adm-chip">{p.category}</span></div>
                                        <p>{p.description}</p>
                                        <div className="adm-tags">{p.technologies.map((t,i) => <span key={i} className="adm-tag">{t}</span>)}</div>
                                        <div className="adm-card-foot">
                                            <button className="adm-btn-sm adm-btn-ghost" onClick={() => openEditForm(p)}>Edit</button>
                                            <button className="adm-btn-sm adm-btn-danger" onClick={() => deleteProject(p._id)}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            ))}</div>
                        )}

                        {/* Team */}
                        {activeTab === 'team' && (
                            <div className="adm-grid">{teamMembers.map(m => (
                                <div key={m._id} className="adm-card adm-card-team">
                                    <div className="adm-card-body">
                                        <div className="adm-team-top">
                                            {m.image ? <img src={m.image} className="adm-avatar" alt={m.name} /> : <div className="adm-avatar adm-avatar-placeholder">{m.name.charAt(0)}</div>}
                                            <div><h3>{m.name}</h3><span className="adm-role">{m.role}</span></div>
                                        </div>
                                        <span className="adm-chip">{m.department}</span>
                                        <p>{m.bio}</p>
                                        <div className="adm-card-foot">
                                            <button className="adm-btn-sm adm-btn-ghost" onClick={() => openEditForm(m)}>Edit</button>
                                            <button className="adm-btn-sm adm-btn-danger" onClick={() => deleteTeamMember(m._id)}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            ))}</div>
                        )}

                        {/* Services */}
                        {activeTab === 'services' && (
                            <div className="adm-svc-grid">{services.map(s => (
                                <div key={s._id} className="adm-svc-card" style={{'--svc-color': s.color || '#0ea5e9'}}>
                                    <div className="adm-svc-header">
                                        <div className="adm-svc-icon-circle" style={{background: s.color || '#0ea5e9'}}>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                                        </div>
                                        <div className="adm-svc-meta">
                                            <h3>{s.title}</h3>
                                            <span className="adm-chip">{s.category}</span>
                                        </div>
                                    </div>
                                    <p className="adm-svc-desc">{s.description}</p>
                                    <div className="adm-svc-features">
                                        <span className="adm-svc-features-label">Features ({s.features.length})</span>
                                        <div className="adm-tags">{s.features.map((f,i) => <span key={i} className="adm-tag">{f}</span>)}</div>
                                    </div>
                                    <div className="adm-card-foot">
                                        <button className="adm-btn-sm adm-btn-ghost" onClick={() => openEditForm(s)}>
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> Edit
                                        </button>
                                        <button className="adm-btn-sm adm-btn-danger" onClick={() => deleteService(s._id)}>
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg> Delete
                                        </button>
                                    </div>
                                </div>
                            ))}</div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminDashboard;
