import exibirMensagemResposta from './mensagem-alerta.js';

let btn = document.querySelector('[data-formulario="button"]');

function enviarEmailAjax(){
    let valoresFormulario = {
        nome: document.querySelector('[data-formulario-input="nome"]').value,
        email: document.querySelector('[data-formulario-input="email"]').value,
        assunto: document.querySelector('[data-formulario-input="assunto"]').value,
        mensagem: document.querySelector('[data-formulario-input="mensagem"]').value,
        checkbox: document.querySelector('[data-formulario-checkbox]').checked
    }

    exibirImagemLoad();
    let ajax = new XMLHttpRequest();
    ajax.open('post', '../src/email/envio.php');

    ajax.onreadystatechange = ()=>{
        if (ajax.readyState == 4 && ajax.status >= 200 && ajax.status <= 400) {
            let respostaAjax = JSON.parse(ajax.responseText);

            // Aqui os dados já foram tratados.
            ocultarImagemLoad();
            resetarFormulario();

            //alert(respostaAjax.mensagem);
            exibirMensagemResposta(respostaAjax.status,respostaAjax.mensagem);
        }
    }

    ajax.send(JSON.stringify(valoresFormulario));
}

//funções de apoio
function resetarFormulario(){
    let listaInputs = document.querySelectorAll('[data-formulario-input]');
    for(let input of listaInputs){
        input.classList.add("--nao-validado"); //inserindo a classe não validado novamente
        input.value = ""; //limpando conteúdo
    }
    document.querySelector('[data-formulario-checkbox]').checked = false;
}

function exibirImagemLoad(){
    document.querySelector('[data-image-load]').classList.add('--visivel');
}

function ocultarImagemLoad(){
    document.querySelector('[data-image-load]').classList.remove('--visivel');
}


export default enviarEmailAjax;