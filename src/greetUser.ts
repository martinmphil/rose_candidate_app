import { authorizedFetch } from "./authorizedFetch";
import { renderGreeting } from "./renderGreeting";
import { showLogin } from "./showLogin";

async function greetUser() {
  const emailAddr = await authorizedFetch("/data/email");

  if (typeof emailAddr === "string" && emailAddr.length > 1) {
    renderGreeting(emailAddr);
    return true;
  }
  showLogin();
  sessionStorage.clear();
  return false;
}

export { greetUser };
