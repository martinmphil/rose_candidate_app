import "./style.css";
import { setup } from "./setup";
import { greetUser } from "./greetUser";
import { legitUser } from "./legitUser";
import { showLogin } from "./showLogin";

async function main() {
  const validSetup = await setup();
  if (!validSetup) {
    return;
  }
  const validUser = await greetUser();
  if (!validUser) {
    showLogin();
    return;
  }
  await legitUser();
}

main().catch((error) => {
  sessionStorage.clear();
  showLogin();
  console.warn(error);
});
