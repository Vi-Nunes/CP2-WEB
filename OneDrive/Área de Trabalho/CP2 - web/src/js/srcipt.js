const botaoTema = document.getElementById("toggle-theme");

botaoTema.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

document.getElementById("ano").textContent = new Date().getFullYear();