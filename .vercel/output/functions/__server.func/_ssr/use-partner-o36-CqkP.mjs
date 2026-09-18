import { u as useAuth } from "./router-BAnSfLYa.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-partner-o36-CqkP.js
function usePartner() {
	const { user } = useAuth();
	return user?.partner ?? null;
}
//#endregion
export { usePartner as t };
