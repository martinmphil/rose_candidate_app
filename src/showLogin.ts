import { renderCrux } from "./renderCrux";
import { ingress } from "./ingress";
import { renderHeader } from "./renderHeader";

function showLogin() {
  const loginHtml = `<p><a href=${ingress}>Please log in </a></p>`;
  renderCrux(loginHtml);
  renderHeader(loginHtml);
}

export { showLogin };
