import { renderCrux } from "./renderCrux";
import { sessionStorageOk } from "./sessionStorageOk";
import { saveJwt } from "./saveJwt";
import { showLogin } from "./showLogin";

async function setup() {
  if (!sessionStorageOk()) {
    renderCrux(`
Please enable session-storage by reloading this page
after leaving incognito Private Browsing.
    `);
    return false;
  }

  saveJwt();
  const Authorization = sessionStorage.getItem("Authorization");
  if (typeof Authorization === "string" && Authorization.length > 0) {
    return true;
  }
  showLogin();
  return false;
}

export { setup };
