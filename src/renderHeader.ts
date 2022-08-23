function renderHeader(html: string) {
  const headerLogInOut = document.querySelector<HTMLDivElement>(
    "header .login-or-out"
  )!;
  headerLogInOut.innerHTML = html;
}

export { renderHeader };
