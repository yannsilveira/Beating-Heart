const mensagem = document.getElementById('mensagem-amor');

mensagem.innerHTML = `Meu coração bate por você desde o dia 12/12/2022, totalizando ${diasDeNamoro()} dias e contando de muito amor, fidelidade, compaixão e desáfios. Estarei aqui para você sempre meu <img class="heart" src="./assets/icons8-heart-64.png" alt="">.`;

function diasDeNamoro() {
  const dataAtual = new Date();
  const dataReferencia = new Date("2022-12-12");
  const diferenca = dataAtual - dataReferencia;
  return Math.round(diferenca / (1000 * 60 * 60 * 24));
}