import { showDisciplines } from "./showDisciplines";
import { showQText } from "./showQText";

function clickableLogoutLinkInHeader() {
  const node = document.querySelector(
    "header .login-or-out a.egress"
  ) as HTMLAnchorElement;
  if (node != null) {
    node.onclick = () => sessionStorage.clear();
  }
}

async function legitUser() {
  clickableLogoutLinkInHeader();
  const examId = sessionStorage.getItem("examId");
  if (typeof examId === "string" && examId.length > 0) {
    await showQText();
    return;
  }
  await showDisciplines();
}
export { legitUser };
