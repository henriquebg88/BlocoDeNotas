//////////////////////////////////////////////
//              Elementos HTML              //
//////////////////////////////////////////////
const PLUS_ICON_PATH = '<path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />';
const MINUS_ICON_PATH = '<path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />';
const PATH_ICON_UPDATE = '<path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />';
const PATH_ICON_DELETE = '<path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />';
////////////////////////////////////////
//              Variáveis             //
////////////////////////////////////////
let isFormEnabled = false;
let isUpdating = { status: false, id: 0 };
let notas = [];
let globalId = 1;

//////////////////////////////////////////////
//              Query Selectors             //
//////////////////////////////////////////////

//  Botões
let createButtonHTML = document.getElementById("createButton");
let confirmButtonHTML = document.getElementById("confirmButton");

//  Lista
let formHTML = document.querySelector("form");
let idInputHTML = document.getElementById("id");
let tituloIinputHTML = document.getElementById("titulo");
let conteudoIinputHTML = document.getElementById("conteudo");
let recipienteNotas = document.querySelector('ul');

///////////////////////////////////////
//              Funções              //
///////////////////////////////////////

function alternarMenu() {

    if (isFormEnabled) {
        isUpdating.status = false;
        isUpdating.id = 0;
        repopularTabela();
    } else {

        mensagemErro(tituloIinputHTML, "");
        mensagemErro(conteudoIinputHTML, "");
    }

    isFormEnabled = !isFormEnabled;

    if (!isFormEnabled) {
        idInputHTML.value = 0;
        tituloIinputHTML.value = "";
        conteudoIinputHTML.value = "";
    }

    createButtonHTML.classList.toggle('btn-primary-inverted');
    confirmButtonHTML.toggleAttribute("hidden");
    formHTML.toggleAttribute("hidden");

    createButtonHTML.children[0].outerHTML = isFormEnabled ? MINUS_ICON_PATH : PLUS_ICON_PATH;
    if (isFormEnabled) tituloIinputHTML.focus();
}

function limparLista() {
    recipienteNotas.innerHTML = "";
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
        isUpdating.status = false;
        isUpdating.id = 0;
        notas.forEach(nota => {
            if (nota.id == id) {
                nota.titulo = titulo;
                nota.conteudo = conteudo;
            }
        })
    }



    repopularTabela();
    if (isFormEnabled) alternarMenu();
}

//  READ
function repopularTabela() {
    //Remover todos os Tr, menos o primeiro  
    limparLista();

    for (let i = notas.length - 1; i >= 0; i--) {
        const nota = notas[i];
        criarNotaHTML(nota);
    }
    if (isUpdating.status) removerNotaHTMLById(isUpdating.id);

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

    isUpdating.status = true;
    isUpdating.id = id;

    if (isUpdating.status) repopularTabela();

    removerNotaHTMLById(isUpdating.id);


    var nota = notas.find(n => n.id == id);

    idInputHTML.value = nota.id;
    tituloIinputHTML.value = nota.titulo;
    conteudoIinputHTML.value = nota.conteudo;


    if (!isFormEnabled) alternarMenu();
    tituloIinputHTML.focus();

}

function criarNotaHTML(nota) {
    let nota_DIV = document.createElement('div');
    nota_DIV.id = nota.id;

    for (const key in nota) {
        if (Object.hasOwnProperty.call(nota, key)) {
            const propriedade = nota[key];
            if (key != 'id') {

                let nota_li = document.createElement('li');
                let nota_p = document.createElement('p');
                nota_li.appendChild(nota_p);
                let nota_text = document.createTextNode(propriedade);
                nota_p.appendChild(nota_text);

                if (key == 'titulo') {
                    let div_icons = document.createElement('div');


                    // Criando botão UPDATE
                    let svg_icon_update = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                    let path_update_icon = document.createElement('path');

                    svg_icon_update.appendChild(path_update_icon);

                    path_update_icon.outerHTML = PATH_ICON_UPDATE;

                    div_icons.appendChild(svg_icon_update);
                    svg_icon_update.classList.add('btn');

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
                    svg_icon_delete.classList.add('btn');

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

    nota_DIV.addEventListener('click', e => abrirFecharNota(e));

    recipienteNotas.appendChild(nota_DIV);
}

function removerNotaHTMLById(id) {
    var notasHTML = document.querySelectorAll('.note-body');

    notasHTML.forEach(notaHTML => {
        if (notaHTML.id == id) {
            recipienteNotas.removeChild(notaHTML);
        }
    });

}

function abrirFecharNota(e) {

    e.currentTarget.classList.toggle('nota-aberta');
    e.currentTarget.children[1].toggleAttribute('hidden');
    e.currentTarget.children[0].classList.toggle('nota-aberta');
}

function validarInputs() {

    let validacoes = [];

    if (tituloIinputHTML.value.trim() == "") {
        mensagemErro(tituloIinputHTML, "É necessário dar um título para sua nota");
        validacoes[0] = false;
    } else {
        mensagemErro(tituloIinputHTML, "");
        validacoes[0] = true;
    }

    if (conteudoIinputHTML.value.trim() == "") {
        mensagemErro(conteudoIinputHTML, "É necessário escrever sua nota");
        validacoes[1] = false;
    } else {
        mensagemErro(conteudoIinputHTML, "");
        validacoes[1] = true;
    }

    for (let i = 0; i < validacoes.length; i++) {
        const validacao = validacoes[i];
        if (!validacao) return false;
    }

    return true;
}

function mensagemErro(node, mensagem) {
    $(node).next('error').text(mensagem);
}



//////////////////////////////////////////////
//              EventListeners              //
//////////////////////////////////////////////

//  Botão +
createButtonHTML.addEventListener('click', () => {
    //Mostrar input e botões de confirmar
    alternarMenu();
});

//Botão SALVAR
confirmButtonHTML.addEventListener('click', () => {

    let id = idInputHTML.value;
    let titulo = tituloIinputHTML.value;
    let conteudo = conteudoIinputHTML.value;

    //Checagem para input vazio ou com whitespaces
    if (!validarInputs()) return;
    salvarNota(id, titulo, conteudo);
})
document.addEventListener("submit", e => {
    e.preventDefault();
});
///////////////////////////////////////////////////
//              Comandos por teclas              //
///////////////////////////////////////////////////
document.addEventListener("keydown", e => {
    if (e.key == 'Enter') {

        if (!isFormEnabled) {
            alternarMenu();
        } else {
            if (tituloIinputHTML.value.trim() == "") {
                tituloIinputHTML.focus();
            } else {
                if (conteudoIinputHTML.value.trim() == "") {
                    conteudoIinputHTML.focus();
                } else {
                    confirmButtonHTML.dispatchEvent(new Event('click'));
                }
            }
        }

    } else {

        if (e.key == 'Escape') {
            if (isFormEnabled) alternarMenu();
        }

    }

});


/////////////////////////////////////////////
//              Inicialização              //
/////////////////////////////////////////////

salvarNota(0, 'Tecla ESC', 'A tecla "ESC" fechará o formulário de edição');
salvarNota(0, 'Tecla ENTER+', 'A tecla "ENTER" além de abrir o formulário, irá pular para o item que não estiver preenchido, e irá confirmar o salvamento, estando todos preechidos. Prático, não?');

repopularTabela();

