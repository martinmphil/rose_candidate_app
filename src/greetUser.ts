import { authorizedFetch } from "./authorizedFetch";
import { cruxLogin } from "./cruxLogin";
import { renderGreeting } from "./renderGreeting";

async function greetUser() {
  const emailAddr = await authorizedFetch("/data/email");

  if (typeof emailAddr === "string" && emailAddr.length > 1) {
    renderGreeting(emailAddr);
    return true;
  }
  cruxLogin();
  sessionStorage.clear();
  return false;
}

export { greetUser };
