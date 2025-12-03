const mensagem = document.getElementById('mensagem-amor');

mensagem.innerHTML = `<p>Você não imagina o significado que tem em minha vida. Por um tempo já cheguei a imaginar que o amor não seria para min. Felizmente você me respondeu no Instagram aquele dia. Nunca mais esquecerei aquela mensagem pois foi o ínicio da melhor decisão que tomei. Meu coração bate forte por você desde o dia <span id="date">14/03/2025</span>, totalizando <span id="total-days">${diasDeNamoro()}</span> e contando de muito <span id="keywords">amor</span>, <span id="keywords">fidelidade</span>, <span id="keywords">compaixão</span> e <span id="keywords">desáfios</span>. Estarei aqui para você sempre <span id="my-black">minha preta</span>.</p>`;
mensagem.innerHTML += `<p>Com muito carinho, ASS: Seu amor ❤️</p>`;

/* ---------------- Função cálculo dias ---------------- */
function diasDeNamoro() {
  const dataAtual = new Date();
  const dataReferencia = new Date("2025-03-14");

  let anoAtual = dataAtual.getFullYear();
  let mesAtual = dataAtual.getMonth();
  let diaAtual = dataAtual.getDate();

  let anoRef = dataReferencia.getFullYear();
  let mesRef = dataReferencia.getMonth();
  let dataMenosUmDia = new Date(dataReferencia);
  dataMenosUmDia.setDate(dataMenosUmDia.getDate() + 1);
  let diaRef = dataMenosUmDia.getDate();

  let anos = anoAtual - anoRef;
  let meses = mesAtual - mesRef;
  let dias = diaAtual - diaRef;

  if (dias < 0) {
    meses -= 1;
    const ultimoDiaMesAnterior = new Date(anoAtual, mesAtual, 0).getDate();
    dias += ultimoDiaMesAnterior;
  }

  if (meses < 0) {
    anos -= 1;
    meses += 12;
  }

  let resultado = '';

  if (anos > 0) {
    resultado += `${anos} ano${anos > 1 ? 's' : ''}`;
  }

  if (meses > 0) {
    if (resultado) resultado += ', ';
    resultado += `${meses} ${meses > 1 ? 'meses' : 'mês'}`;
  }

  if (dias > 0 || (!anos && !meses)) {
    if (resultado) resultado += ' e ';
    resultado += `${dias} dia${dias > 1 ? 's' : ''}`;
  }

  return resultado;
}

// Alternância de tema claro/escuro
const themeBtn = document.getElementById('theme-btn');
if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
  });
}

// Flor aparece após 10 segundos
const flowers = document.getElementsByClassName('flower');

if (flowers.length > 0) {
  Array.from(flowers).forEach((element, index) => {
    setTimeout(() => {
      element.style.display = 'block';
    }, 2000 * (index + 1));
  });
}

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const box = 20;
let snake, direction, food, score, game;

const message = document.getElementById("message");
const restartBtn = document.getElementById("restart");
const scoreDisplay = document.getElementById("score");

function initGame() {
  snake = [{ x: 9 * box, y: 10 * box }];
  direction = null;
  score = 0;
  food = {
    x: Math.floor(Math.random() * (canvas.width / box)) * box,
    y: Math.floor(Math.random() * (canvas.height / box)) * box,
  };
  message.style.display = "none";
  restartBtn.style.display = "none";
  scoreDisplay.innerText = "Corações: 0";

  if (game) clearInterval(game);
  game = setInterval(draw, 100);
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  else if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  else if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  else if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
});

document.getElementById("up").addEventListener("click", () => {
  if (direction !== "DOWN") direction = "UP";
});
document.getElementById("down").addEventListener("click", () => {
  if (direction !== "UP") direction = "DOWN";
});
document.getElementById("left").addEventListener("click", () => {
  if (direction !== "RIGHT") direction = "LEFT";
});
document.getElementById("right").addEventListener("click", () => {
  if (direction !== "LEFT") direction = "RIGHT";
});

function draw() {
  ctx.fillStyle = "#333";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // desenhar cobrinha
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "lime" : "green";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  // desenhar coração
  ctx.font = "20px Arial";
  ctx.fillText("❤️", food.x + 2, food.y + 18);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction === "LEFT") snakeX -= box;
  if (direction === "UP") snakeY -= box;
  if (direction === "RIGHT") snakeX += box;
  if (direction === "DOWN") snakeY += box;

  // se comer o coração
  if (snakeX === food.x && snakeY === food.y) {
    score++;
    scoreDisplay.innerText = "Corações: " + score;

    if (score >= 14) {
      clearInterval(game);
      message.innerText = "🎉 Você coletou os 14 corações! Com isso, completou o nosso amor! ❤️🐍";
      message.id = "mensagem-amor"
      message.style.display = "block";
      restartBtn.style.display = "inline-block";
      return;
    }

    food = {
      x: Math.floor(Math.random() * (canvas.width / box)) * box,
      y: Math.floor(Math.random() * (canvas.height / box)) * box,
    };
  } else {
    snake.pop();
  }

  let newHead = { x: snakeX, y: snakeY };

  // colisão
  if (
    snakeX < 0 ||
    snakeY < 0 ||
    snakeX >= canvas.width ||
    snakeY >= canvas.height ||
    collision(newHead, snake)
  ) {
    clearInterval(game);
    message.innerText = "☠️ Nosso relacionamento falhou! Clique em Recomeçar.";
    message.id = "mensagem-amor"
    message.style.display = "block";
    restartBtn.style.display = "inline-block";
    return;
  }

  snake.unshift(newHead);
}

function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x === array[i].x && head.y === array[i].y) {
      return true;
    }
  }
  return false;
}

restartBtn.addEventListener("click", initGame);

initGame();

const EMAIL_DESTINO = "yannsilveira34@gmail.com";

const DIAS_BLOQUEIO = 60;
const SEGUNDOS_BLOQUEIO = 6;

const STORAGE_KEY = "ultimoEnvioEmail";

const btn = document.getElementById("btnEmail");
const status = document.getElementById("status");

function getTempoBloqueio() {
  return DIAS_BLOQUEIO > 0
    ? DIAS_BLOQUEIO * 24 * 60 * 60 * 1000
    : SEGUNDOS_BLOQUEIO * 1000;
}

function verificarBloqueio() {
  const ultimo = localStorage.getItem(STORAGE_KEY);
  if (!ultimo) return 0;

  const agora = Date.now();
  const bloqueio = getTempoBloqueio();

  const restante = bloqueio - (agora - parseInt(ultimo));

  return restante > 0 ? restante : 0;
}

function atualizar() {
  const restante = verificarBloqueio();

  if (restante > 0) {
    btn.disabled = true;

    if (DIAS_BLOQUEIO > 0) {
      const liberacao = new Date(Date.now() + restante);

      status.innerHTML = `
      <span id="datavalidacao">
        💌 Você já enviou sua mensagem.<br>
        Disponível novamente em:
        ${liberacao.toLocaleDateString("pt-BR")}
        </span>
      `;
    }

    else {
      const segundos = Math.ceil(restante / 1000);

      status.innerHTML = `
      <span id="datavalidacao">
        💌 Você já enviou sua mensagem.<br>
        Aguarde ${segundos} segundo${segundos > 1 ? "s" : ""}...
        </span>`;
    }

  } else {
    btn.disabled = false;
    status.textContent = "";
  }
}

setInterval(atualizar, 1000);

btn.addEventListener("click", () => {
  const assunto = "Solicitando uma carta de amor 💖";

  const corpo = `
Oi amor,

Gostaria muito de ganhar uma cartinha nova. Por isso estou te solicitando.

Com amor 💗, sua pretinha.
`;

  window.location.href = `
mailto:${EMAIL_DESTINO}
?subject=${encodeURIComponent(assunto)}
&body=${encodeURIComponent(corpo)}
`.replace(/\s/g, "");

  localStorage.setItem(STORAGE_KEY, Date.now());
  atualizar();
});

atualizar();