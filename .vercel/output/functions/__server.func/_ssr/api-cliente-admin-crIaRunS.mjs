//#region node_modules/.nitro/vite/services/ssr/assets/api-cliente-admin-crIaRunS.js
var API_BASE = "http://localhost:3334/api/";
/**
* Função base para requisições autenticadas do admin
*/
async function adminRequest(path, init = {}) {
	const token = localStorage.getItem("auth_token") || localStorage.getItem("token") || localStorage.getItem("admin_token");
	const headers = new Headers(init.headers);
	headers.set("Content-Type", "application/json");
	if (token) headers.set("Authorization", `Bearer ${token}`);
	const res = await fetch(`${API_BASE}${path}`, {
		...init,
		headers
	});
	if (res.status === 204) return;
	const data = await res.json().catch(() => ({}));
	if (!res.ok) throw new Error(data?.message || data?.error || "Erro na API");
	return data;
}
/**
* Lista todos os clientes com filtros
*/
async function getAdminClients(filters) {
	const params = new URLSearchParams();
	if (filters) {
		if (filters.search) params.append("search", filters.search);
		if (filters.active !== void 0) params.append("active", String(filters.active));
		if (filters.role) params.append("role", filters.role);
		if (filters.page) params.append("page", String(filters.page));
		if (filters.limit) params.append("limit", String(filters.limit));
		if (filters.sortBy) params.append("sortBy", filters.sortBy);
		if (filters.sortOrder) params.append("sortOrder", filters.sortOrder);
		if (filters.startDate) params.append("startDate", filters.startDate);
		if (filters.endDate) params.append("endDate", filters.endDate);
	}
	return adminRequest(`admin/clientes${params.toString() ? `?${params.toString()}` : ""}`);
}
/**
* Busca um cliente específico pelo ID
*/
async function getAdminClient(id) {
	if (!id) throw new Error("ID do cliente é obrigatório");
	return adminRequest(`admin/clientes/${id}`);
}
/**
* Cria um novo cliente (Admin)
*/
async function createAdminClient(data) {
	if (!data.email) throw new Error("Email é obrigatório");
	if (!data.password || data.password.length < 6) throw new Error("Senha deve ter pelo menos 6 caracteres");
	const payload = {
		name: data.name?.trim() || null,
		email: data.email.trim().toLowerCase(),
		phone: data.phone?.trim() || null,
		cpf: data.cpf?.replace(/\D/g, "") || null,
		password: data.password,
		active: data.active !== void 0 ? data.active : true,
		role: data.role || "user"
	};
	return adminRequest("admin/clientes", {
		method: "POST",
		body: JSON.stringify(payload)
	});
}
/**
* Atualiza um cliente existente
*/
async function updateAdminClient(id, data) {
	if (!id) throw new Error("ID do cliente é obrigatório");
	const payload = {};
	if (data.name !== void 0) payload["name"] = data.name?.trim() || null;
	if (data.email !== void 0) payload["email"] = data.email.trim().toLowerCase();
	if (data.phone !== void 0) payload["phone"] = data.phone?.trim() || null;
	if (data.cpf !== void 0) payload["cpf"] = data.cpf?.replace(/\D/g, "") || null;
	if (data.active !== void 0) payload["active"] = data.active;
	if (data.role !== void 0) payload["role"] = data.role;
	if (data.password) payload["password"] = data.password;
	return adminRequest(`admin/clientes/${id}`, {
		method: "PUT",
		body: JSON.stringify(payload)
	});
}
/**
* Remove um cliente (soft delete)
*/
async function deleteAdminClient(id) {
	if (!id) throw new Error("ID do cliente é obrigatório");
	return adminRequest(`admin/clientes/${id}`, { method: "DELETE" });
}
//#endregion
export { updateAdminClient as a, getAdminClients as i, deleteAdminClient as n, getAdminClient as r, createAdminClient as t };
