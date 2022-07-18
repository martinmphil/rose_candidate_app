import { showDisciplines } from "./showDisciplines";
import { showQText } from "./showQText";

async function legitUser() {
  const examId = sessionStorage.getItem("examId");
  if (typeof examId === "string" && examId.length > 0) {
    await showQText();
    return;
  }
  await showDisciplines();
}
export { legitUser };
