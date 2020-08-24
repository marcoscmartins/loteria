var QUINA = 80;
var MEGASENA = 60;
var LOTOMANIA = 100;
var LOTOFACIL = 25;

// quantidade de sorteios
var numero = 0;
// tipo de sorteio
var tipo = "";
// todos os numeros sorteados
var colecao = [];
// numeros que mais sairam
var melhores = [{ nro: 0, qtd: 0 }];
//var melhores = {'nro':0, 'qtd':0};
// guarda os numeros que já foram contados
var verificados = [];
// quantidade de sorteados de acordo com o tipo
var qtdSorteados = 0;
// aponta para o label que aparece antes do resultado
var labelResultado;

function Numero()
{
    this.nro = 0;
    this.qtd = 0;
}

function limpa(e)
{ 
    if (labelResultado) {
        labelResultado.hidden= false;
        labelResultado.textContent = '...';
    }
    
    limpaLabels();
}

function calc(e) 
{
    labelResultado = document.getElementById("resultado");
    labelResultado.textContent = 'calculando...';
    labelResultado.hidden = false;
    
    numero = document.getElementById("numero").value;
    tipo = document.getElementById("lista").value;
    qtdSorteados = getSorteadosByType(tipo);
    
    var total = getQuantByType(tipo);
    var arr = generateArray(total);
    
    sorteio(numero, arr);
}

// realiza o sorteio
function sorteio(len, arr) 
{
    colecao = [];
    for (i = 0; i < len; i++)
    {
        random(arr);
        colecao = colecao.concat(arr.slice(0, qtdSorteados));
    }
    
    selecionaOsMelhores();
}

// Realiza os cálculos necessários para identificar os melhores números do sorteio
function selecionaOsMelhores()
{
    melhores = [];
    verificados = [];
    
    var arr = colecao.slice(0, colecao.length);
    
    for (i = 0; i < arr.length; i++)
    {
        var aux = arr[i];
        if (verificados.indexOf(aux) != -1)
            continue;
        
        var count = contaNumero(aux, colecao);
        //console.log("Aux: ", aux, count);
        verificados.push(aux);
        
        melhores.push({
                'nro': aux,
                'qtd': count
            });
    }
    
    melhores = melhores.sort(function(a, b){ return b.qtd - a.qtd });
    for (i = 0; i < melhores.length; i++)
        console.log(" Melhores ", melhores[i].nro, melhores[i].qtd);
   
    entregaResultado();
}

// Responsável por criar labels na página com os melhores números
function entregaResultado()
{
    var resultField = document.getElementById("result");
    var label;
    var span;
    
    if (labelResultado)
        labelResultado.hidden= true;
    
    limpaLabels();
    
    // adiciona quantas labels forem necessárias para o resultado
    for (i = 0; i < qtdSorteados; i++)
    {
        label = resultField.appendChild(document.createElement("label"));
        label.setAttribute('class', 'resultNode');
        label.setAttribute('id', 'node');
        label.setAttribute('title', 'Este número está entre os que mais sairam.');
        label.appendChild(document.createTextNode(melhores[i].nro));
        
        span = label.appendChild(document.createElement("label"));
        span.setAttribute('class', 'qtd');
        span.setAttribute('title', 'Quant. de vezes que este número saiu.');
        span.appendChild(document.createTextNode(melhores[i].qtd + "x"));
    }
}

// remove todos os labels
function limpaLabels()
{
    var list = document.getElementsByClassName("resultNode");
    for(var i = list.length - 1; 0 <= i; i--)
    {
        if(list[i] && list[i].parentElement && list[i].id != "resultado")
            list[i].parentElement.removeChild(list[i]);
    }
}

/**
* Gera uma array com a quantidade de números da cartela
*/
function generateArray(size)
{
    var arr = [];
    for (i = 1; i <= size; i++)
        arr.push(i);
    random(arr);
    return arr;
}

/**
* Retorna a quantidade de números presentes na cartela
*/
function getQuantByType(str)
{
    if (str == "quina")
        return QUINA;
    else if (str == "megasena")
        return MEGASENA;
    else if (str == "lotomania")
        return LOTOMANIA;
    else 
        return LOTOFACIL;
    
    return 0;
}
/**
* Retorna a quantidade de números sorteados
*/
function getSorteadosByType(str)
{
    if (str == "quina")
        return 5;
    else if (str == "megasena")
        return 6;
    else if (str == "lotomania")
        return 50;
    else 
        return 15;
    
    return 0;
}

/**
* Responsável pela mistura dos elementos do array
*/ 
function random(_arr) 
{			
    _arr.sort(randOrder);
}

/**
* Troca os objetos de posição no array
*/
function randOrder(a, b) 
{    
    return Math.random() > 0.5 ? 1 : -1;
}

function order(arr)
{
    arr.sort(function(a, b) {
        return a - b;
    });
}

// retorna o número ocorrências do número passado como parâmetro
function contaNumero(search, dataset)
{
    var count = dataset.reduce(function(n, val) {
        return n + (val === search);
    }, 0);
    
    return count;
}

// busca o número no array e retora true caso exista e false caso contrário
function findNumber(aux, index)
{
    for (i = index; i < melhores; i++)
    {
        console.log(melhores[i], aux);
        if (melhores[i].nro == aux)
            return true;
    }
    return false;
}
