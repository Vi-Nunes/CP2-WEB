alert("Quiz Respawn!\nResponda o quiz para ganhar prêmios exclusivos!")

const perguntas= [
    {
        pergunta:"1° pergunta- Qual jogo é um Metroidvania da Respawn?\nA) Silksong\nB) Minecraft\nC) Forza Horizon 5\nD) Resident Evil 2 Remake",
        resposta:"A"
    },
    {
        pergunta:"2° pergunta- Qual jogo da loja é do gênero Sandbox?\nA) Street Fighter 6\nB) Minecraft\nC) Ghost of Tsushima\nD) Expedition 33",
        resposta:"B"
    },
    {
        pergunta:"3° pergunta- Qual jogo é famoso por corridas em mundo aberto?\nA) Silksong\nB) Resident Evil 2 Remake\nC) Forza Horizon 5\nD) Minecraft",
        resposta:"C"
    },
    {
        pergunta:"4° pergunta- Qual elemento é mais explorado em Expedition 33?\nA) Estratégia e exploração de mapas\nB) Corridas de alta velocidade\nC) Combate 1v1\nD) Construção de blocos",
        resposta:"A"
    },
    {
        pergunta:"5° pergunta- Qual jogo é conhecido por combates de luta 1v1?\nA) Minecraft\nB) Ghost of Tsushima\nC) Silksong\nD) Street Fighter 6",
        resposta:"D"
    },
    {
        pergunta:"6° pergunta- Qual jogo da loja é remake de um clássico de Survival Horror de 1998?\nA) Silksong\nB) Resident Evil 2 Remake\nC) Ghost of Tsushima\nD) Forza Horizon 5",
        resposta:"B"
    },
    {
        pergunta:"7° pergunta- Qual jogo combina ação/aventura com elementos de sobrevivência?\nA) The Last of Us Part 1 A\nB) Expedition 33\nC) Minecraft\nD) Forza Horizon 5",
        resposta:"A"
    },
    {
        pergunta:"8° pergunta- Em qual jogo você explora um Japão feudal fictício?\nA) Street Fighter 6\nB) Minecraft\nC) Ghost of Tsushima\nD) Silksong",
        resposta:"C"
    }
];

//Declarando a variável de acertos que recebe 0
let acertos = 0;

//Criar um laço de repetição para verificar as perguntas
for(let i=0; i<perguntas.length; i++){
    const respostaUsuario=prompt(perguntas[i].pergunta);

    //Verifica se o usuário digitou uma resposta em letra minúscula
    if(respostaUsuario.toLowerCase()=== perguntas[i].resposta.toLocaleLowerCase()){
        acertos++;
    }
}
document.getElementById("msg").innerHTML=(`Você acertou ${acertos} de ${perguntas.length} perguntas!`)

document.getElementById("tabelaPremios").style.display = "block";
