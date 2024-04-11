const html = document.querySelector('html');
const foco = document.querySelector('.app__card-button--foco');
const curto = document.querySelector('.app__card-button--curto');
const longo = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const startPause = document.querySelector('#start-pause');
const musicaFocoInput = document.querySelector('#alternar-musica');
const icone = document.querySelector('.app__card-primary-butto-icon');
const tempoNaTela = document.querySelector('#timer');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const musica = new Audio('./sons/luna-rise-part-one.mp3');
const audioFinalizado = new Audio('./sons/beep.mp3');
const audioPausa = new Audio('./sons/pause.mp3');
const audioPlay = new Audio('./sons/play.wav');
musica.loop = true;

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused){
        musica.play();

    } else{
        musica.pause();
    }
})

foco.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco');
    foco.classList.add('active');
});

curto.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto');
    curto.classList.add('active');
});

longo.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo');
    longo.classList.add('active');
});

function alterarContexto(contexto){
    mostrarTempo();
    botoes.forEach(function(contexto){
        contexto.classList.remove('active');
    })
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `./imagens/${contexto}.png`);
    switch(contexto){
        case "foco": 
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`;
            break;
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada? <br> <strong class="app__title-strong"> Faça uma pausa curta! </strong>`
            break;
        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar à superfície. <br>
            <strong class="app__title-strong"> Faça uma pausa longa. </strong>`
            break;
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        audioFinalizado.play();
        alert('Tempo Finalizado!');
        const focoAtivo = html.getAttribute('data-contexto') == 'foco';
        if(focoAtivo){
            const evento = new CustomEvent('focoFinalizado');
            document.dispatchEvent(evento);
        }
        zerar();
        return;
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();
}

startPause.addEventListener('click' , iniciarOuPausar);

function iniciarOuPausar(){
    if(intervaloId){
        audioPausa.play();
        zerar();
        return;
    }
    audioPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciarOuPausarBt.textContent = "Pausar";
    icone.setAttribute('src', `./imagens/pause.png`);
}

function zerar(){
    clearInterval(intervaloId);
    iniciarOuPausarBt.textContent = "Começar";
    icone.setAttribute('src', `./imagens/play_arrow.png`);
    intervaloId = null;
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'});
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();