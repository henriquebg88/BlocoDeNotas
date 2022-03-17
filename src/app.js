//////////////////////////////////////////////
//              Elementos HTML              //
//////////////////////////////////////////////
const PLUS_ICON_PATH = '<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />';
const MINUS_ICON_PATH = '<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clip-rule="evenodd" />';
const PATH_ICON_UPDATE = '<path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />';
const PATH_ICON_DELETE = '<path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />';
////////////////////////////////////////
//              Variáveis             //
////////////////////////////////////////
let isFormEnabled = false;
let notas = [];
let globalId = 1;

//////////////////////////////////////////////
//              Query Selectors             //
//////////////////////////////////////////////

//  Botões
let createButtonHTML = document.getElementById("createButton");
let confirmButtonHTML = document.getElementById("confirmButton");

//  Lista
let formHTML = document.getElementById("form")
let idInputHTML = document.getElementById("id");
let tituloIinputHTML = document.getElementById("titulo");
let conteudoIinputHTML = document.getElementById("conteudo");
let recipienteNotas = document.querySelector('ul');

///////////////////////////////////////
//              Funções              //
///////////////////////////////////////

function alternarMenu() {

    isFormEnabled = !isFormEnabled;

    if (!isFormEnabled) {
        idInputHTML.value = 0;
        tituloIinputHTML.value = "";
        conteudoIinputHTML.value = "";
    }

    confirmButtonHTML.toggleAttribute("hidden");
    formHTML.toggleAttribute("hidden");

    if (formHTML.hidden == false) {
        tituloIinputHTML.focus();
    }

    createButtonHTML.children[0].outerHTML = isFormEnabled ? MINUS_ICON_PATH : PLUS_ICON_PATH;
}

function limparLista() {
    for (let i = recipienteNotas.children.length - 1; i > 0; i--) {
        let tr = recipienteNotas.children[i];

        recipienteNotas.removeChild(tr);
    }
}

//  CREATE e UPDATE
function salvarNota(id, titulo, conteudo) {

    if (id == 0) {

        //CREATE
        id = globalId++;

        let notaObj = {
            id: id,
            titulo: titulo,
            conteudo: conteudo,
        }

        notas.push(notaObj);
    } else {

        //UPDATE
        notas.forEach(nota => {
            if (nota.id == id) {
                nota.titulo = titulo;
                nota.conteudo = conteudo;
            }
        })
    }



    repopularTabela();
    alternarMenu();
}

//  READ
function repopularTabela() {
    //Remover todos os Tr, menos o primeiro  
    limparLista();

    //Preencher todas as notas
    notas.forEach(nota => {

        exibirNota(nota);

    });
}

//  DELETE
function deletarNota(e) {
    var id = e.currentTarget.closest('.note-body').id;

    for (let i = 0; i < notas.length; i++) {
        const nota = notas[i];
        if (nota.id == id) {
            notas.splice(i, 1);
        }
    }
    repopularTabela();
}

// UPDATE
function updateNota(e) {
    var id = e.currentTarget.closest('.note-body').id
    var nota = notas.find(n => n.id == id);

    idInputHTML.value = nota.id;
    tituloIinputHTML.value = nota.titulo;
    conteudoIinputHTML.value = nota.conteudo;

    alternarMenu();
}

function exibirNota(nota) {
    let nota_DIV = document.createElement('div');
    nota_DIV.id = nota.id;

    for (const key in nota) {
        if (Object.hasOwnProperty.call(nota, key)) {
            const propriedade = nota[key];
            if (key != 'id') {

                let nota_li = document.createElement('li');
                let nota_text = document.createTextNode(propriedade);
                nota_li.appendChild(nota_text);

                if (key == 'titulo') {
                    let div_icons = document.createElement('div');


                    // Criando botão UPDATE
                    let svg_icon_update = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                    let path_update_icon = document.createElement('path');

                    svg_icon_update.appendChild(path_update_icon);

                    path_update_icon.outerHTML = PATH_ICON_UPDATE;

                    div_icons.appendChild(svg_icon_update);

                    svg_icon_update.addEventListener('click', e => {
                        e.stopPropagation();
                        updateNota(e);
                    });

                    // Criando botão DELETE
                    let svg_icon_delete = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                    let path_delete_icon = document.createElement('path');

                    svg_icon_delete.appendChild(path_delete_icon);

                    path_delete_icon.outerHTML = PATH_ICON_DELETE

                    div_icons.appendChild(svg_icon_delete);

                    svg_icon_delete.addEventListener('click', e => {
                        e.stopPropagation();
                        deletarNota(e);
                    });


                    div_icons.classList.add('icons');

                    nota_li.appendChild(div_icons);
                }


                nota_DIV.appendChild(nota_li);
                nota_DIV.classList.add('note-body');

                if (key == 'conteudo') {
                    nota_li.hidden = true;
                }
            }
        }
    }

    nota_DIV.addEventListener('click', e => e.currentTarget.children[1].toggleAttribute('hidden'));

    recipienteNotas.appendChild(nota_DIV);
}

//////////////////////////////////////////////
//              EventListeners              //
//////////////////////////////////////////////

//  Botão CREATE
createButtonHTML.addEventListener('click', () => {
    //Mostrar input e botões de confirmar
    alternarMenu();
});

//Botão confirmar
confirmButtonHTML.addEventListener('click', () => {

    let id = idInputHTML.value;
    let titulo = tituloIinputHTML.value;
    let conteudo = conteudoIinputHTML.value;

    salvarNota(id, titulo, conteudo);

})



/////////////////////////////////////////////
//              Inicialização              //
/////////////////////////////////////////////

salvarNota(0, 'Exemplo', 'Descrição  curta na nota.')
salvarNota(0, 'Outro exemplo maior', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')


repopularTabela();
