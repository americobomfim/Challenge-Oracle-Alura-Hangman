var tela = document.querySelector('#forca');
var pincel = tela.getContext('2d');

var larguraTela = tela.width;
var alturaTela = tela.height;
var espessuraDesenho = 3;
var topoinicioBaseX = 300;
var topoBaseY = 520;
var larguraBase = 200;
var alturaBase = 50;
var alturaHaste = 500;
var larguraHaste = 200;
var alturaCorda = 50;
var espessuraBoneco = 3;
var metadeEspessuraBoneco = Math.floor(espessuraBoneco/2);
var raioCabeca = 30;
var diametroCabeca = raioCabeca*2;
var tamanhoOlhos = 2;
var tamanhoNariz = 4;
var tamanhoBoca = 20;
var alturaTronco = 200;
var alturaPescoco = 20;
var distanciaMembrosX = 50;
var distanciaMembrosY = 50;
var proporcaoTracoEspaco = 70;
var distanciaPrimeiroTraco = 50;
var tamanhoTraco = 50;
var tamanhoTracoCalc;
var traco;
var distanciaTraco = Math.floor(tamanhoTraco/proporcaoTracoEspaco*(100-proporcaoTracoEspaco));
var distanciaTracoCalc;
var espessuraTraco = 2;
var distanciaLetra = 10;
var estiloFonte = 'Arial';
var corTraco = 'blue';
var corLetra = 'blue';
var corForca = 'blue';
var corBoneco = 'blue';
var corPerdeu = 'red';
var corGanhou = 'green';
var corLetraErrada = "black";
var tamanhoFonteLetraErrada = 30;
var tamanhoFonteFim = 20;

function desenhaForca() {
	switch(qtdErros) {
		case 1:
			desenhaCabeca();
			desenhaOlhos();
			desenhaNariz();
			desenhaBocaFeliz();
			break;
		case 2:
			desenhaTronco();
			break;
		case 3:
			desenhaBraçoEsquerdo();
			break;
		case 4:
			apagaCabeca();
			desenhaCabeca();
			desenhaOlhos();
			desenhaNariz();
			desenhaBocaPadrao();
			desenhaBraçoDireito();
			break;
		case 5:
			desenhaPeEsquerdo();
			break;
		case 6:
			apagaCabeca();
			desenhaCabeca();
			desenhaOlhos();
			desenhaNariz();
			desenhaBocaTriste();
			desenhaPeDireito();
			break;
	}
}

//Desena forca
pincel.strokeStyle = corForca;
pincel.lineWidth = espessuraDesenho;
pincel.textAlign = 'center';

//Desenha base
var metadeBase = Math.floor(larguraBase/2);
var inicioBaseX = topoinicioBaseX-metadeBase;
var baseY = topoBaseY+alturaBase;
var fimBaseX = inicioBaseX+larguraBase;

pincel.moveTo(topoinicioBaseX, topoBaseY);
pincel.lineTo(inicioBaseX,baseY);
pincel.lineTo(fimBaseX,baseY);
pincel.lineTo(topoinicioBaseX, topoBaseY);

//Desenha haste
var hasteY = topoBaseY-alturaHaste;
var hasteX = topoinicioBaseX+larguraHaste;
pincel.lineTo(topoinicioBaseX, hasteY);
pincel.lineTo(hasteX, hasteY);

var cordaY = hasteY+alturaCorda;

//Desenha Corda
function desenhaCorda() {
	pincel.lineTo(hasteX, cordaY);
	pincel.stroke();
}

desenhaCorda();

//Desenha Cabeça
var metadeCabeca = cordaY+raioCabeca;
var meiaVolta = Math.PI;
var volta = 2*meiaVolta;

function desenhaCabeca() {
	pincel.strokeStyle = corBoneco;
	pincel.lineWidth = espessuraBoneco;
	pincel.beginPath();
	pincel.arc(hasteX,metadeCabeca,raioCabeca,0,volta);
	pincel.stroke();
}

var metadeRaioCabeca = Math.floor(raioCabeca/2);
var distanciaOlhosX = Math.floor(raioCabeca/3);
var distanciaOlhosY = cordaY+metadeRaioCabeca;

//Desenha Olhos
function desenhaOlhos() {
	pincel.beginPath();
	pincel.arc(hasteX-distanciaOlhosX,distanciaOlhosY,tamanhoOlhos,0,volta);
	pincel.stroke();
	pincel.beginPath();
	pincel.arc(hasteX+distanciaOlhosX,distanciaOlhosY,tamanhoOlhos,0,volta);
	pincel.stroke();
}

var distanciaNariz = Math.floor(tamanhoNariz/2);

//Desenha Nariz
function desenhaNariz() {
	pincel.beginPath();
	pincel.moveTo(hasteX,metadeCabeca-distanciaNariz);
	pincel.lineTo(hasteX,metadeCabeca+distanciaNariz);
	pincel.stroke();
}

//desenhaBocaFeliz
function desenhaBocaFeliz() {
	pincel.beginPath();
	pincel.arc(hasteX,metadeCabeca,tamanhoBoca,0,meiaVolta);
	pincel.stroke();
}

//desenhaBocaPadrão
function desenhaBocaPadrao() {
	pincel.beginPath();
	pincel.moveTo(hasteX-metadeRaioCabeca,metadeCabeca+metadeRaioCabeca);
	pincel.lineTo(hasteX+metadeRaioCabeca,metadeCabeca+metadeRaioCabeca);
	pincel.stroke();
}

var bocaTriste = Math.floor(tamanhoBoca/2);
//desenhaBocaTriste
function desenhaBocaTriste() {
	pincel.beginPath();
	pincel.arc(hasteX,metadeCabeca+tamanhoBoca,bocaTriste,0,meiaVolta, true);
	pincel.stroke();
}

var cabeca = cordaY+diametroCabeca;

//ApagaCabeça
function apagaCabeca() {
	pincel.clearRect(hasteX-raioCabeca-metadeEspessuraBoneco, cordaY-metadeEspessuraBoneco, diametroCabeca+metadeEspessuraBoneco+1, diametroCabeca+metadeEspessuraBoneco+1);
}

//DesenhaTronco
function desenhaTronco() {
	pincel.beginPath();
	pincel.moveTo(hasteX, cabeca);
	pincel.lineTo(hasteX, tronco);
	pincel.stroke();
}

var pescoco = cabeca+alturaPescoco;
var bracos = pescoco+distanciaMembrosY;

//DesenhaBraçoEsquerdo
function desenhaBraçoEsquerdo() {
	pincel.beginPath();
	pincel.moveTo(hasteX, pescoco);
	pincel.lineTo(hasteX-distanciaMembrosX, bracos);
	pincel.stroke();
}

var extremidade = hasteX+distanciaMembrosX;;
//DesenhaBraçoDireito
function desenhaBraçoDireito() {
	pincel.beginPath();
	pincel.moveTo(hasteX, pescoco);
	pincel.lineTo(extremidade, bracos);
	pincel.stroke();
}

var tronco = cabeca+alturaTronco;
var pes = tronco+distanciaMembrosY;

//DesenhaPeEsquerdo
function desenhaPeEsquerdo() {
	pincel.beginPath();
	pincel.moveTo(hasteX, tronco);
	pincel.lineTo(hasteX-distanciaMembrosX, pes);
	pincel.stroke();
}

//DesenhaPeDireito
function desenhaPeDireito() {
	pincel.beginPath();
	pincel.moveTo(hasteX, tronco);
	pincel.lineTo(hasteX+distanciaMembrosX, pes);
	pincel.stroke();
}

var MsgFimX = extremidade+Math.floor((larguraTela-extremidade)/2);

//DesenhaPerdeu
function desenhaPerdeu() {
	pincel.fillStyle = corPerdeu;
	pincel.font = tamanhoFonteFim + "px " + estiloFonte;
	pincel.fillText("Você Perdeu!", MsgFimX, cabeca);
}

//DesenhaGanhou
function desenhaGanhou() {
	pincel.fillStyle = corGanhou;
	pincel.font = tamanhoFonteFim + "px " + estiloFonte;
	pincel.fillText("Você Venceu!", MsgFimX, cabeca-tamanhoFonteFim);
	pincel.fillText("Parabéns!", MsgFimX, cabeca);
	apagaCabeca();
	desenhaCabeca();
	desenhaOlhos();
	desenhaNariz();
	desenhaBocaFeliz();

}

inicioTraco = fimBaseX+distanciaPrimeiroTraco;
//DesenhaTracos
function desenhaTracos(qtdTracos) {
	pincel.lineWidth = espessuraTraco;
	pincel.strokeStyle = corTraco;
	var divisaoTela = (larguraTela-(inicioTraco))/qtdTracos;
	tamanhoTracoCalc = Math.floor(divisaoTela*proporcaoTracoEspaco/100);
	distanciaTracoCalc = Math.floor(divisaoTela-tamanhoTracoCalc);
	if (tamanhoTracoCalc > tamanhoTraco)
	{
		tamanhoTracoCalc = tamanhoTraco;
		distanciaTracoCalc = distanciaTraco;
	}
	traco = tamanhoTracoCalc+distanciaTracoCalc;
	for (i=0, novoTraco = inicioTraco-traco; i<qtdTracos; i++)
	{
		novoTraco += traco;
		pincel.beginPath();
		pincel.moveTo(novoTraco,baseY);
		pincel.lineTo(novoTraco+tamanhoTracoCalc,baseY);
		pincel.stroke();
	}
}

var inicioApagaX = fimBaseX+espessuraDesenho;
var inicioApagaY = cordaY-metadeEspessuraBoneco-1;
var fimApagaX = larguraTela-inicioApagaX;
var fimApagaY = alturaTela-inicioApagaY;
//ApagaTela
function apagaTela(qtdTracos) {
	pincel.clearRect(inicioApagaX, inicioApagaY, fimApagaX, fimApagaY);
}

var alturaLetra = baseY-distanciaLetra;
//DesenhaLetra
function desenhaLetra(letra, posicaoLetra) {
	pincel.fillStyle = corLetra;
	pincel.font = tamanhoTracoCalc + "px " + estiloFonte;
	var novoTraco = distanciaPrimeiroTraco+posicaoLetra*traco;
	pincel.fillText(letra, fimBaseX+novoTraco+Math.floor(tamanhoTracoCalc/2), alturaLetra);
}

var LetraErradaY = cabeca+tamanhoFonteLetraErrada;
var LetraErradaX = MsgFimX-4*tamanhoFonteLetraErrada+Math.floor(tamanhoFonteLetraErrada/2);

//DesenhaLetraErrada
function desenhaLetraErrada(letra) {
	pincel.fillStyle = corLetraErrada;
	pincel.font = tamanhoFonteLetraErrada + "px " + estiloFonte;
	var posicaoLetraErradaY = Math.floor((qtdErros-1)/8);
	var posicaoLetraErradaX = qtdErros-posicaoLetraErradaY*8;
	//alert(LetraErradaX + ", " + LetraErradaY + ", " + posicaoLetraErradaX + ", " + posicaoLetraErradaY);
	pincel.fillText(letra, LetraErradaX+(posicaoLetraErradaX*tamanhoFonteLetraErrada), LetraErradaY+(posicaoLetraErradaY*tamanhoFonteLetraErrada));
}

