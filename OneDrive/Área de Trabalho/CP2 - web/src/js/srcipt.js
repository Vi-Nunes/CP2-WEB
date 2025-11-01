const botaoTema = document.getElementById("toggle-theme");

botaoTema.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});