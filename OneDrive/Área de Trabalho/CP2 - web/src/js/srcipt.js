const botaoTema = document.getElementById("toggle-theme");

botaoTema.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

document.getElementById("ano").textContent = new Date().getFullYear();

// ===== JS SLIDESHOW =====
let imagens = [
    "../assets/HADES.jpg",
    "../assets/HADES2.jpg",
    "../assets/COTL.jpg",
    "../assets/RAINW.jpg",
    "../assets/DCELY.jpg",
    "../assets/CPH.png"
];

let i = 0;
let tempo = 3000; // 3 segundos

function slideShow() {
    document.getElementById("image").src = imagens[i];
    i++;
    if (i === imagens.length) {
    i = 0;
    }
    setTimeout(slideShow, tempo);
}

slideShow();