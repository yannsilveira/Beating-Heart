const mensagem = document.getElementById('mensagem-amor');

mensagem.innerHTML = `<p>Você não imagina o significado que tem em minha vida. Por um tempo já cheguei a imaginar que o amor não seria para min. Felizmente você me respondeu no Instagram aquele dia. Nunca mais esquecerei aquela mensagem pois foi o ínicio da melhor decisão que tomei. Meu coração bate forte por você desde o dia <span id="date">14/03/2025</span>, totalizando <span id="total-days">${diasDeNamoro()}</span> e contando de muito <span id="keywords">amor</span>, <span id="keywords">fidelidade</span>, <span id="keywords">compaixão</span> e <span id="keywords">desáfios</span>. Estarei aqui para você sempre <span id="my-black">minha preta</span>.</p>`;
mensagem.innerHTML += `<p>Com muito carinho, ASS: Seu amor ❤️</p>`;


function diasDeNamoro() {
  const dataAtual = new Date();
  const dataReferencia = new Date("2025-03-14");

  let anoAtual = dataAtual.getFullYear();
  let mesAtual = dataAtual.getMonth();
  let diaAtual = dataAtual.getDate();

  let anoRef = dataReferencia.getFullYear();
  let mesRef = dataReferencia.getMonth();
  let diaRef = dataReferencia.getDate();

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