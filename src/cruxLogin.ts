import { renderCrux } from "./renderCrux";
import { ingress } from "./ingress";

function cruxLogin() {
  renderCrux(`<p class="ingress"><a href=${ingress}>Please log in </a></p>`);
}

export { cruxLogin };
