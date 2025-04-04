const mensagem = document.getElementById('mensagem-amor');

mensagem.innerHTML = `<p>Você não imagina o significado que tem em minha vida. Por um tempo já cheguei a imaginar que o amor não seria para min. Felizmente você me respondeu no Instagram aquele dia. Nunca mais esquecerei aquela mensagem pois foi o ínicio da melhor decisão que tomei.</p>`;
mensagem.innerHTML += `Meu coração bate por você desde o dia 14/03/2025, totalizando ${diasDeNamoro()} dias e contando de muito amor, fidelidade, compaixão e desáfios. Estarei aqui para você sempre meu <img class="heart" src="./assets/icons8-heart-64.png" alt="">.`;


function diasDeNamoro() {
  const dataAtual = new Date();
  const dataReferencia = new Date("2025-03-14");
  const diferenca = dataAtual - dataReferencia;
  return Math.round(diferenca / (1000 * 60 * 60 * 24)) - 1;
}