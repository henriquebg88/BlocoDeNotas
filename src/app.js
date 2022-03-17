////////////////////////////////////////
//              Variáveis             //
////////////////////////////////////////
const PLUS_ICON_PATH = '<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />';
const MINUS_ICON_PATH = '<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clip-rule="evenodd" />';
let isFormEnabled = false;


//////////////////////////////////////////////
//              Query Selectors             //
//////////////////////////////////////////////

//  Botões
let createButtonHTML = document.getElementById("createButton");
let confirmButtonHTML = document.getElementById("confirmButton");
let cancelButtonHTML = document.getElementById("cancelButton");

//  Tabela
let formHTML = document.getElementById("form")
let tituloIinputHTML = document.getElementById("titulo");
let conteudoIinputHTML = document.getElementById("conteudo");


//////////////////////////////////////////////
//              EventListeners              //
//////////////////////////////////////////////

//  Botão criar
createButtonHTML.addEventListener('click', event => {

    isFormEnabled = !isFormEnabled;

    confirmButtonHTML.toggleAttribute("hidden");
    cancelButtonHTML.toggleAttribute("hidden");
    formHTML.toggleAttribute("hidden");


    if (formHTML.hidden == false) {
        tituloIinputHTML.focus();
    }

    event.currentTarget.children[0].outerHTML = isFormEnabled ? MINUS_ICON_PATH : PLUS_ICON_PATH;

});