//////////////////////////////////////////////
//              Elementos HTML              //
//////////////////////////////////////////////
const PLUS_ICON_PATH = '<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />';
const MINUS_ICON_PATH = '<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clip-rule="evenodd" />';
const SVG_BTN_EDIT = '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"> <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /> <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd" /> </svg>';
const SVG_BTN_REMOVE = '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"> <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" /> </svg>';
////////////////////////////////////////
//              Variáveis             //
////////////////////////////////////////
let isFormEnabled = false;
let notas = [];


//////////////////////////////////////////////
//              Query Selectors             //
//////////////////////////////////////////////

//  Botões
let createButtonHTML = document.getElementById("createButton");
let confirmButtonHTML = document.getElementById("confirmButton");

//  Tabela
let formHTML = document.getElementById("form")
let tituloIinputHTML = document.getElementById("titulo");
let conteudoIinputHTML = document.getElementById("conteudo");
let tbody = document.querySelector('tbody');

///////////////////////////////////////
//              Funções              //
///////////////////////////////////////

function alternarMenu() {
    isFormEnabled = !isFormEnabled;

    confirmButtonHTML.toggleAttribute("hidden");
    formHTML.toggleAttribute("hidden");

    if (formHTML.hidden == false) {
        tituloIinputHTML.focus();
    }

    createButtonHTML.children[0].outerHTML = isFormEnabled ? MINUS_ICON_PATH : PLUS_ICON_PATH;
}

function limparLista() {
    for (let i = tbody.children.length - 1; i > 0; i--) {
        let tr = tbody.children[i];

        tbody.removeChild(tr);
    }
}

//READ
function repopularTabela() {
    //Remover todos os Tr, menos o primeiro  
    limparLista();

    //Preencher com todas as notas
    notas.forEach(nota => {
        //Criar linha
        let linha = document.createElement('tr');

        //Criar colunas
        for (const key in nota) {
            if (Object.hasOwnProperty.call(nota, key)) {
                const propriedade = nota[key];
                if (key != 'id') {

                    let coluna = document.createElement('td');
                    let texto = document.createTextNode(propriedade);
                    coluna.appendChild(texto);
                    linha.appendChild(coluna);
                }
            }
        }

        //Coluna para botões de ação
        let coluna = document.createElement('td');
        let svgEdit = document.createElement('svg');
        let svgRemove = document.createElement('svg');

        coluna.appendChild(svgEdit);
        coluna.appendChild(svgRemove);

        svgEdit.outerHTML = SVG_BTN_EDIT;
        svgRemove.outerHTML = SVG_BTN_REMOVE;

        linha.appendChild(coluna);

        tbody.appendChild(linha);
    });
}

//CREATE
function criarNota(titulo, conteudo) {
    let id = 0;

    notas.forEach(nota => {
        id = nota.id == id ? ++id : id;
    });

    let notaObj = {
        id: id,
        titulo: titulo,
        conteudo: conteudo,
    }

    tituloIinputHTML.value = "";
    conteudoIinputHTML.value = "";

    notas.push(notaObj);
    repopularTabela();
}

//////////////////////////////////////////////
//              EventListeners              //
//////////////////////////////////////////////

//  Botão criar
createButtonHTML.addEventListener('click', () => {
    //Mostrar input e botões de confirmar
    alternarMenu();
});

//Botão confirmar
confirmButtonHTML.addEventListener('click', () => {

    let titulo = tituloIinputHTML.value;
    let conteudo = conteudoIinputHTML.value;

    criarNota(titulo, conteudo);

})


/////////////////////////////////////////////
//              Inicialização              //
/////////////////////////////////////////////

notas.push({
    id: 0,
    titulo: 'Exemplo',
    conteudo: 'Descrição da nota.',
});

repopularTabela();
