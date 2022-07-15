function renderCrux(html: string) {
  const crux = document.querySelector<HTMLDivElement>("#crux")!;
  crux.innerHTML = html;
}

export { renderCrux };
