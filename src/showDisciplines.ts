import { authorizedFetch } from "./authorizedFetch";
import { legitUser } from "./legitUser";
import { renderCrux } from "./renderCrux";

async function disciplineSelected(examId: string) {
  renderCrux(`<p class="loading">loading...</p>`);
  sessionStorage.setItem("examId", examId);
  await legitUser();
}

function disciplineClickable() {
  const nodeList = document.querySelectorAll(
    ".discipline[id]"
  ) as NodeListOf<HTMLElement>;

  nodeList.forEach((node) => {
    const examId = node.getAttribute("id");
    if (node && examId) {
      node.onclick = async () => await disciplineSelected(examId);
    }
  });
}

async function showDisciplines() {
  const disciplines = await authorizedFetch("/data/disciplines");
  if (typeof disciplines === "string" && disciplines.length > 0) {
    renderCrux(disciplines);
    disciplineClickable();
    return;
  }
  throw " Invalid disciplines-listings from show-disciplines function. ";
}

export { showDisciplines };
