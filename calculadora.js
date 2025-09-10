//display resultado
const display = document.querySelector("#display");

//menu gaveta
const menuGaveta = document.querySelector("#menu-gaveta");
const menuAba = document.querySelector("#menu-aba");

//botões
const bLimpar = document.querySelector("#b-limpar");
const bCopiar = document.querySelector("#b-copiar");
const bApagarCaractere = document.querySelector("#b-apagar-caractere");
const bIgual = document.querySelector("#b-igual");

const bSoma = document.querySelector("#b-soma");
const bSubtracao = document.querySelector("#b-subtr");
const bDivisao = document.querySelector("#b-div");
const bMultiplicacao = document.querySelector("#b-multi");
const bPotencia = document.querySelector("#b-potencia");
const bPorcentagem = document.querySelector("#b-porcentagem");

const b0 = document.querySelector("#b0");
const b1 = document.querySelector("#b1");
const b2 = document.querySelector("#b2");
const b3 = document.querySelector("#b3");
const b4 = document.querySelector("#b4");
const b5 = document.querySelector("#b5");
const b6 = document.querySelector("#b6");
const b7 = document.querySelector("#b7");
const b8 = document.querySelector("#b8");
const b9 = document.querySelector("#b9");
const bSeparador = document.querySelector("#b-separador");
const bParenteses = document.querySelector("#b-parenteses");
const bPonto = document.querySelector("#b-ponto");

const bCaracteres = [b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,bSeparador, bPonto];
const bOperadores = [bSoma, bSubtracao, bDivisao, bMultiplicacao, bPotencia, bPorcentagem];

let erroDeCalculo = false;
let parentesesAberto = true;

const ehOperador = (string)=>{
    const c = string[0]; 
    return "+-*/% de ".includes(c) ? true : false;
}

bCaracteres.forEach(b =>{
    b.addEventListener("click", () => {
        const ultimoCaractere = display.textContent[display.textContent.length-1];
        const caractere = b.textContent;
        erroDeCalculo = false;

        if((display.textContent === "0" && caractere !== ",") || erroDeCalculo){
            display.textContent = "";
        }
        else if(caractere === ","){
            if((ultimoCaractere === "," || ultimoCaractere === ".") || ehOperador(ultimoCaractere))
                return;
        }
        else if(caractere === "."){
            if((ultimoCaractere === "." || ultimoCaractere === ",")|| ehOperador(ultimoCaractere))    return;
        }
        display.textContent += caractere;
        
    });
});

bOperadores.forEach(b=>{
    b.addEventListener("click", ()=>{
        const ultimoCaractere = display.textContent[display.textContent.length-1];
        const  operador = b.textContent;

        if((ehOperador(ultimoCaractere) || ((ultimoCaractere === ",") || (ultimoCaractere === ".")))) return;
        else{
            if(operador === "%"){
                if(display.textContent.includes("% de ")){
                    return;
                }
                else{
                    display.textContent += "% de ";
                }
            }
            else{
                switch(operador){
                    case "x": display.textContent += "*"; break;
                    case "^": display.textContent += "**"; break;
                    case "÷": display.textContent += "/"; break;
                    default: display.textContent += operador;
                }
            }
        }
    });    
});

bParenteses.addEventListener("click", ()=>{
    erroDeCalculo = false;
    if(display.textContent === "0" || erroDeCalculo){
        display.textContent = "";
    }
    if(parentesesAberto){
        display.textContent += "(";
    }
    else{
        display.textContent += ")";
    }
    parentesesAberto = !parentesesAberto;
});

bApagarCaractere.addEventListener("click",()=>{
    if(display.textContent.length > 1){
        display.textContent = display.textContent.slice(0,-1); //retorna a string sem o ultimo caractere
    }
    else{
        display.textContent = 0;
    }
});

bCopiar.addEventListener("click",()=>{
    navigator.clipboard.writeText(display.textContent); 
    
    //navigator.clipboard.writeText(fonte) -> copia um texto para área de transferência

    //navigator.clipboard.readText(destino); -> cola um texto para área de transferência e retorna uma promise resolvida com o texto
});

bLimpar.addEventListener("click", ()=> {
    display.textContent = "0";
    erroDeCalculo = false;
    parentesesAberto = true;
});

bIgual.addEventListener("click",()=>{
    let calculo = display.textContent.replace(/\./g, ""); // regex - retorna a string substituindo ponto por "" em todas as ocorrencias
    calculo = calculo.replace(/,/g, ".") ; // regex - retorna uma string substrituindo , por . (o g diz pra remover todas e não só aprimeira ocorrência)
    if(calculo.includes("/0")){
        display.textContent = "Cálculo inválido";
        erroDeCalculo = true;
    }
    else if(calculo.includes("% de ")){
        const n = calculo.split("% de ");
        const resultado = (Number(n[0])*(Number(n[1]))/100);
        display.textContent = resultado.toString().replace(/\./g, ",");
    }
    else{
        try{
            const resultado = eval(calculo); //executa o codigo js da string e retorna um numero
            if(resultado === Infinity || isNaN(resultado)){
                display.textContent = "Cálculo inválido";
                erroDeCalculo = true;
            }
            display.textContent = resultado.toString().replace(/\./g, ","); // converte pra string e subtitui o ponto por virgura
        }
        catch{
            display.textContent = "Cálculo inválido";
            erroDeCalculo = true;
        }
    }
});

menuAba.addEventListener("click",()=>{
    const icone = document.querySelector("#icone-aba");
    menuGaveta.classList.toggle("menu-gaveta-escondido");
    
    if(menuGaveta.classList.contains("menu-gaveta-escondido")){
        icone.style.transition = "transform 1s ease-in";
        icone.style.transform = "rotate(0deg)";
    }
    else{
        icone.style.transition = "transform 1s ease-in";
        icone.style.transform = "rotate(180deg)";
    }
});