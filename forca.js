//Novo Jogo
var jogoIniciado = false;
var acertos = [];
var qtdAcertos = 0;
var erros = [];
var qtdErros = 0;
var tamanhoPalavra;
var qtdHifens;
var erroMaximo = 6;

//Novo Jogo
document.querySelector('#iniciar-jogo').addEventListener('click', function() {
	jogoIniciado = true;
	if (palavra != "")
		apagaTela(tamanhoPalavra);
	palavra = palavras[Math.floor(Math.random()*qtdPalavras)];
	tamanhoPalavra = palavra.length;
	desenhaTracos(tamanhoPalavra);
	palavraSemAcento = removerAcentos(palavra);
	//alert(palavra);
	//Desenha hifens
	qtdHifens = 0;
	var indice = palavraSemAcento.indexOf("-");
	while (indice != -1)
		{
			qtdHifens++;
			desenhaLetra("-", indice);
			indice = palavraSemAcento.indexOf("-", indice+1);
		}
	acertos = [];
	erros = [];
	qtdAcertos = qtdHifens;
	qtdErros = 0;
});

//Digitar Letras
document.addEventListener('keypress', function(event) {
	if (jogoIniciado && !foco)
	{
		var digitado = event.key;
		if(digitado.search(/[A-Z]/gi) != -1)
			verificaLetra(digitado.toUpperCase());
		if (qtdAcertos == tamanhoPalavra)
		{
			jogoIniciado = false;
			desenhaGanhou();
		}
		else if (qtdErros >= 6) {
			jogoIniciado = false;
			desenhaPerdeu();
		}
	}
});

inputPalavraNova = document.querySelector('#input-nova-palavra');

var foco = false;
inputPalavraNova.addEventListener('focus', function() {
	foco = true;
});

inputPalavraNova.addEventListener('blur', function() {
	foco = false;
});

//Adicionar palavra
document.querySelector('#nova-palavra').addEventListener('click', function() {
	var palavraNova = inputPalavraNova.value.toUpperCase();
	if (palavras.indexOf(palavraNova) != -1)
	{
		alert("Palavra já existente na lista");
		return;
	}
	palavraNovaSemAcento = removerAcentos(palavraNova);
	var caracterInvalido = false;
	var caracteresInvalidos = "";
	for (i=0, n=palavraNovaSemAcento.length; i<n; i++)
	{
		if (palavraNovaSemAcento[i].search(/[A-Z]/gi) == -1 && palavraNovaSemAcento[i] != "-")
		{
			if (caracteresInvalidos.indexOf(palavraNovaSemAcento[i]) == -1)
			{
				if (caracterInvalido)
					caracteresInvalidos += ", ";
				else
					caracterInvalido = true;
				caracteresInvalidos += palavraNovaSemAcento[i];
			}
		}
	}
	if (caracterInvalido)
	{
		alert("A palavra não pode ser adicionada por conter caracteres não permitidos: " + caracteresInvalidos);
	}
	else
	{
		palavras.push(palavraNova);
		alert("Palavra adicionada");
	}
	inputPalavraNova.value = "";
});

function removerAcentos(palavraAcentuada) {
	palavraAcentuada = palavraAcentuada.replace(/[ÀÁÂÃÄÅ]/gi,"A");
	palavraAcentuada = palavraAcentuada.replace(/[ÈÉÊË]/gi,"E");
	palavraAcentuada = palavraAcentuada.replace(/[ÌÍÎÏ]/gi,"I");
	palavraAcentuada = palavraAcentuada.replace(/[ÒÓÔÖ]/gi,"O");
	palavraAcentuada = palavraAcentuada.replace(/[ÙÚÛÜ]/gi,"U");
	palavraAcentuada = palavraAcentuada.replace(/[Ç]/gi,"C");

	return palavraAcentuada;
}

function verificaLetra(letra) {
	if (acertos.indexOf(letra) == -1 && erros.indexOf(letra) == -1)
	{
		var indice = palavraSemAcento.indexOf(letra);
		if (indice == -1)
		{
			erros.push(letra);
			qtdErros++;
			desenhaForca();
			desenhaLetraErrada(letra);
			return;
		}
		acertos.push(letra);
		while (indice != -1)
		{
			qtdAcertos++;
			desenhaLetra(palavra.substr(indice, 1), indice);
			indice = palavraSemAcento.indexOf(letra, indice+1);
		}
	}
}