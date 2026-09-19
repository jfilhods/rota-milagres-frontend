import { u as useAuth } from "./router-HQ7TexWm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-partner-CdEYaUcw.js
function usePartner() {
	const { user } = useAuth();
	return user?.partner ?? null;
}
//#endregion
export { usePartner as t };
