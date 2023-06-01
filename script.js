const button = document.querySelectorAll('.btn');
const divider = document.getElementById('resul');
const resultado = document.getElementById('btnresul');
const modificar = document.getElementById('modificar');
const escurecer = document.getElementById('escurecer');

const inputQuant = document.querySelectorAll(".quantidade");
const inputPeso = document.querySelectorAll(".peso");
const inputConver = document.querySelectorAll(".conversor");
const inputCusto = document.querySelectorAll(".custo");
const inputModi = document.querySelectorAll(".modi");
const inputLucro = document.querySelectorAll(".valor")

const p = document.querySelectorAll(".receitas");
const li = document.querySelectorAll(".resto");
const strong = document.querySelectorAll(".valoresmodi");
const pr = document.querySelectorAll(".resulucro");
const vr = document.querySelector(".valoresul");


button.forEach(x => { x.addEventListener('click', abrir) });

function abrir(e){
    if (e.target.id == 'primeiro') {
        divider.removeAttribute('hidden');
        resultado.removeAttribute('hidden');
        valores()
    }
    if (e.target.id == 'segundo') {
        escurecer.removeAttribute('hidden');
        modificar.removeAttribute('hidden');
        divider.setAttribute('hidden', 'hidden');
        resultado.setAttribute('hidden', 'hidden');
    }
    if(e.target.id == 'terceiro' || e.target.id == 'quarto'){
        if(e.target.id == 'quarto'){
            modivalores()
        }
        modificar.setAttribute('hidden', 'hidden');
        escurecer.setAttribute('hidden', 'hidden');
    }
    if (e.target.id == 'quinto') {
        calculoLucro()
    }
}

var listaQuant = [];
var listaPeso = [];
var listaConver = [];
var listaCusto = [];
var listaCUnit = [0, 0, 0, 0, 0, 0];
var receitas = [0, 0, 0];
var valorIdeal = [400, 395, 40, 50, 100, 300];
var valorDoce = [0, 0, 0];
var soma = 0;
var lucro = [];

function modivalores(){
    var cont = 0;
    inputModi.forEach((m) => {
        parseInt(m.value);
        if(m.value != ""){
            valorIdeal[cont] = m.value;
        }
        cont = cont + 1;
    })

    cont = 0;

    strong.forEach((s) => {
        if (cont == 0) {
            s.innerHTML = `${valorIdeal[cont]}g`
        }
        if (cont == 1) {
            s.innerHTML = `${valorIdeal[cont]}g`
        }
        if (cont == 2) {
            s.innerHTML = `${valorIdeal[cont]}g`
        }
        if (cont == 3) {
            s.innerHTML = `${valorIdeal[cont]}g`
        }
        if (cont == 4) {
            s.innerHTML = `${valorIdeal[cont]}g`
        }
        if (cont == 5) {
            s.innerHTML = `${valorIdeal[cont]}g`
        }
        cont = cont + 1;
    })
}

function valores(){
    inputQuant.forEach((q) => {
        if(q.value == ""){
            q.value = 0;
        }
        parseInt(q.value);
        listaQuant.push(q.value);
    });

    inputPeso.forEach((p) =>{
        if(p.value == ""){
            p.value = 0;
        }
        parseFloat(p.value)
        listaPeso.push(p.value);
    });

    inputConver.forEach((v) =>{
        if(v.value == ""){
            v.value = "g";
        
        }
        listaConver.push(v.value);
    });

    inputCusto.forEach((c) =>{
        if(c.value == ""){
            c.value = 0;
        }
        parseFloat(c.value)
        listaCusto.push(c.value);
    });

    for(var i = 0; i<6; i++){
        // conversão
        if(listaConver[i+1] == "Kg"){
            listaPeso[i] = (listaPeso[i] * listaQuant[i]) * 1000;
        }
        if(listaConver[i+1] == "g"){
            listaPeso[i] = (listaPeso[i] * listaQuant[i]);
        }

        if(i == 0 || i == 1 || i == 2){
            if(listaQuant[i] > 0){
                if(listaPeso[i] >= valorIdeal[i]){
                    listaCUnit[i] = listaCusto[i] / listaQuant[i];
                    soma = soma + listaCUnit[i];
                    if (soma > 60) {
                        soma = 0;
                        listaQuant.splice(0, 6);
                        listaPeso.splice(0, 6);
                        listaConver.splice(0, 7);
                        listaCusto.splice(0, 6);
                        listaCUnit = [0, 0, 0, 0, 0, 0];
                        alert('A bandeija passa dos R$60,00.')
                        divider.setAttribute('hidden', 'hidden');
                        resultado.setAttribute('hidden', 'hidden');
                        break;
                    }
                }
                else{
                    alert('Não é possível fazer uma bandeija sem os ingredientes básicos.')
                    soma = 0;
                    listaQuant.splice(0, 6);
                    listaPeso.splice(0, 6);
                    listaConver.splice(0, 7);
                    listaCusto.splice(0, 6);
                    listaCUnit = [0, 0, 0, 0, 0, 0];
                    divider.setAttribute('hidden', 'hidden');
                    resultado.setAttribute('hidden', 'hidden');
                    break;
                }
            }
            else{
                alert('Não é possível fazer uma bandeija sem os ingredientes básicos.')
                soma = 0;
                listaQuant.splice(0, 6);
                listaPeso.splice(0, 6);
                listaConver.splice(0, 7);
                listaCusto.splice(0, 6);
                listaCUnit = [0, 0, 0, 0, 0, 0];
                divider.setAttribute('hidden', 'hidden');
                resultado.setAttribute('hidden', 'hidden');
                break;
            }
        }

        if(i == 3 || i == 4 || i == 5){
            if(i == 3){
                if(listaQuant[i] > 0){
                    while(listaPeso[i] >= valorIdeal[i] && listaPeso[0] >= valorIdeal[0] && listaPeso[1] >= valorIdeal[1] && listaPeso[2] >= valorIdeal[2]){
                        soma = soma + listaCUnit[i];
                        valorDoce[0] = soma / 50;
                        if (soma > 60) {
                            soma = soma - listaCUnit[i];
                            break;
                        }
                        else {
                            soma = soma - listaCUnit[i];
                            receitas[0] = receitas[0] + 1;
                            listaPeso[i] = listaPeso[i] - valorIdeal[i];
                            listaPeso[0] = listaPeso[0] - valorIdeal[0];
                            listaPeso[1] = listaPeso[1] - valorIdeal[1];
                            listaPeso[2] = listaPeso[2] - valorIdeal[2];
                        }
                    }
                }
            }
            if(i == 4){
                if (listaQuant[i] > 0) {
                    while (listaPeso[i] >= valorIdeal[i] && listaPeso[0] >= valorIdeal[0] && listaPeso[1] >= valorIdeal[1] && listaPeso[2] >= valorIdeal[2]) {
                        soma = soma + listaCUnit[i];
                        valorDoce[1] = soma / 50;
                        if (soma > 60) {
                            soma = soma - listaCUnit[i];
                            break;
                        }
                        else {
                            soma = soma - listaCUnit[i];
                            receitas[1] = receitas[1] + 1;
                            listaPeso[i] = listaPeso[i] - valorIdeal[i];
                            listaPeso[0] = listaPeso[0] - valorIdeal[0];
                            listaPeso[1] = listaPeso[1] - valorIdeal[1];
                            listaPeso[2] = listaPeso[2] - valorIdeal[2];
                        }
                    }
                }
            }
            if(i == 5){
                if (listaQuant[i] > 0) {
                    while (listaPeso[i] >= valorIdeal[i] && listaPeso[0] >= valorIdeal[0] && listaPeso[1] >= valorIdeal[1] && listaPeso[2] >= valorIdeal[2]) {
                        soma = soma + listaCUnit[i];
                        valorDoce[2] = soma / 50;
                        console.log(soma, listaCUnit[i], "soma")
                        if (soma > 60) {
                            soma = soma - listaCUnit[i];
                            break;
                        }
                        else {
                            soma = soma - listaCUnit[i];
                            receitas[2] = receitas[2] + 1;
                            listaPeso[i] = listaPeso[i] - valorIdeal[i];
                            listaPeso[0] = listaPeso[0] - valorIdeal[0];
                            listaPeso[1] = listaPeso[1] - valorIdeal[1];
                            listaPeso[2] = listaPeso[2] - valorIdeal[2];
                        }
                    }
                }
            }
        }
    }

            
    var i = 0;

    li.forEach((l) => {
        if (i == 0) {
            l.innerHTML = `<span><img src="https://cdn.discordapp.com/emojis/1065829923320774676.webp?size=96&quality=lossless" alt="docin" height="18" width="18"></span>
            Chocolate fracionado meio amargo: ${listaPeso[i]}g`
        }
        if (i == 1) {
            l.innerHTML = `<span><img src="https://cdn.discordapp.com/emojis/1065829923320774676.webp?size=96&quality=lossless" alt="docin" height="18" width="18"></span>
            Leite condensado: ${listaPeso[i]}g`
        }
        if (i == 2) {
            l.innerHTML = `<span><img src="https://cdn.discordapp.com/emojis/1065829923320774676.webp?size=96&quality=lossless" alt="docin" height="18" width="18"></span>
            Margarina: ${listaPeso[i]}g`
        }
        if (i == 3) {
            l.innerHTML = `<span><img src="https://cdn.discordapp.com/emojis/1065829923320774676.webp?size=96&quality=lossless" alt="docin" height="18" width="18"></span>
            Leite em pó: ${listaPeso[i]}g`
        }
        if (i == 4) {
            l.innerHTML = `<span><img src="https://cdn.discordapp.com/emojis/1065829923320774676.webp?size=96&quality=lossless" alt="docin" height="18" width="18"></span>
            Café solúvel: ${listaPeso[i]}g`
        }
        if (i == 5) {
            l.innerHTML = `<span><img src="https://cdn.discordapp.com/emojis/1065829923320774676.webp?size=96&quality=lossless" alt="docin" height="18" width="18"></span>
            Coco ralado seco: ${listaPeso[i]}g`
        }
        i = i + 1;
    })

    i = 0;

    p.forEach((p) => {
        parseInt(receitas[i]);
        if(i == 0){
            p.innerHTML = `[${receitas[i]}] Bandeja(s) de Bombom de leite ninho`
        }
        if(i == 1){
            p.innerHTML = `[${receitas[i]}] Bandeja(s) de Bombom de coco (beijinho)`
        }
        if(i == 2){
            p.innerHTML = `[${receitas[i]}] Bandeja(s) de Bombom de café`
        }
        i = i + 1;
    })

    if(receitas[0] == 0 && receitas[1] == 0 && receitas[2] == 0){
        alert('O peso não é o suficiente para fazer alguma bandeija ou o custo das bandeijas excedeu R$60,00.')
        divider.setAttribute('hidden', 'hidden');
        resultado.setAttribute('hidden', 'hidden');
    }

    i = 0;

    pr.forEach((r) =>{
        parseFloat(valorDoce[i]);
        console.log(valorDoce[i], receitas[i]);
        if(i == 0) {
            if(receitas[0] > 0){
                r.innerHTML = `- Bombom de leite ninho: <br>
            &nbsp;&nbsp;&nbsp;Cada um terá que custar mais que ${valorDoce[i]}<br> reais para obter lucro.`
            }
            else{
                r.innerHTML = `- Bombom de leite ninho: <br>
            &nbsp;&nbsp;&nbsp;Nenhuma bandeja feita`
            }
        }
        if(i == 1){
            if(receitas[1] > 0){
                r.innerHTML = `- Bombom de coco (beijinho): <br>
            &nbsp;&nbsp;&nbsp;Cada um terá que custar mais que ${valorDoce[i]}<br> reais para obter lucro.`
            }
            else{
                r.innerHTML = `- Bombom de coco (beijinho): <br>
            &nbsp;&nbsp;&nbsp;Nenhuma bandeja feita`
            }
        }
        if(i == 2){
            if(receitas[2] > 0){
                r.innerHTML = `- Bombom de café: <br>
            &nbsp;&nbsp;&nbsp;Cada um terá que custar mais que ${valorDoce[i]}<br> reais para obter lucro.`
            }
            else{
                r.innerHTML = `- Bombom de café: <br>
                &nbsp;&nbsp;&nbsp;Nenhuma bandeja feita`
            }
        }
        i = i + 1;
    })
    soma = 0;
    listaQuant.splice(0, 6);
    listaPeso.splice(0, 6);
    listaConver.splice(0, 7);
    listaCusto.splice(0, 6);
    listaCUnit = [0, 0, 0, 0, 0, 0];
    receitas = [0, 0, 0];
    valorDoce = [0, 0, 0];
}

function calculoLucro() {
    var i = 0;
    inputLucro.forEach((lu) => { 
        if (lu.value == "") {
            i = i + 1;
        }
        parseFloat(lu.value)
        lucro.push(lu.value);
    })
    if (i > 0) {
        alert('Você não inseriu todas as informações necessárias.')
        lucro.splice(0, 4);
    }
    else {
        lucro[3] = (lucro[0] * lucro[1]) - lucro[2];
        console.log(lucro[3]);
        vr.setAttribute("value", `R$${lucro[3].toFixed(2)}`)
    }

    lucro.splice(0, 4);
}