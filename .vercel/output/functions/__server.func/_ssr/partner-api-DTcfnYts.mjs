//#region node_modules/.nitro/vite/services/ssr/assets/partner-api-DTcfnYts.js
var API_URL = "http://localhost:3334/api/";
var TOKEN_KEY = "@rota-milagres:token";
function getToken() {
	if (typeof window === "undefined") return null;
	return localStorage.getItem(TOKEN_KEY);
}
async function apiFetch(path, options = {}) {
	const token = getToken();
	const headers = new Headers(options.headers || {});
	if (!headers.has("Content-Type") && !(options.body instanceof FormData)) headers.set("Content-Type", "application/json");
	if (token) headers.set("Authorization", `Bearer ${token}`);
	const res = await fetch(`${API_URL}${path}`, {
		...options,
		headers
	});
	if (!res.ok) {
		const err = await res.json().catch(() => ({}));
		throw new Error(err.message || `HTTP ${res.status}`);
	}
	if (res.status === 204) return void 0;
	return res.json();
}
function updateMyPartner(data) {
	return apiFetch("/partner/me", {
		method: "PUT",
		body: JSON.stringify(data)
	});
}
function listReservations() {
	return apiFetch("/partner/me/reservations");
}
function updateReservationStatus(id, status) {
	return apiFetch(`/partner/me/reservations/${id}`, {
		method: "PATCH",
		body: JSON.stringify({ status })
	});
}
function listReviews() {
	return apiFetch("/partner/me/reviews");
}
function replyReview(id, reply) {
	return apiFetch(`/partner/me/reviews/${id}/reply`, {
		method: "POST",
		body: JSON.stringify({ reply })
	});
}
function getStats() {
	return apiFetch("/partner/me/stats");
}
//#endregion
export { updateMyPartner as a, replyReview as i, listReservations as n, updateReservationStatus as o, listReviews as r, getStats as t };
