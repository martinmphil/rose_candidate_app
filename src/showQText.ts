import { authorizedFetch } from "./authorizedFetch";
import { legitUser } from "./legitUser";
import { renderCrux } from "./renderCrux";

async function leaveExamPage() {
  sessionStorage.removeItem("examId");
  await legitUser();
}

async function answerSelected(candidateAnswer: string) {
  renderCrux(`<p class="loading">loading...</p>`);
  if (candidateAnswer) {
    await showQText(candidateAnswer);
    return;
  }
  throw ` Fault with candidate-answer ${candidateAnswer}. `;
}

function answerClickable() {
  const nodeList = document.querySelectorAll(
    ".choices[id]"
  ) as NodeListOf<HTMLElement>;

  nodeList.forEach((node) => {
    const candidateAnswer = node.getAttribute("id");
    if (node && candidateAnswer) {
      node.onclick = async () => await answerSelected(candidateAnswer);
    }
  });
}

async function getQText(examId: string, upload = "") {
  const qText = await authorizedFetch(
    `/data/exam/${examId.replace(/#/g, "%23")}`,
    "POST",
    upload
  );

  if (qText === "end_of_exam-standard_fixed_id_ne5gei8phi0al0oM") {
    await leaveExamPage();
    return;
  }

  if (typeof qText === "string" && qText.length > 0) {
    renderCrux(qText);
    answerClickable();
    return;
  }
  throw " Invalid question-text from get-question-text function. ";
}

async function showQText(upload = "") {
  const examId = sessionStorage.getItem("examId");
  if (typeof examId === "string" && examId.length > 0) {
    await getQText(examId, upload);
    return;
  }
  throw " Exam-id missing from show-exam function. ";
}

export { showQText };
