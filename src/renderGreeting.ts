function renderGreeting(emailAddr: string) {
  const greeting = document.querySelector<HTMLDivElement>("#greeting")!;
  greeting.innerText = `Hello ${emailAddr}`;
}

export { renderGreeting };
