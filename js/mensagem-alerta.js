function exibirMensagemResposta(status,mensagem){
    const textoMensagemAlerta = document.querySelector('[data-mensagem-texto]');
    const mensagemAlerta = document.querySelector('[data-mensagem-alerta]');

    if(status){        
        textoMensagemAlerta.innerHTML = "<strong>Sucesso:</strong> "+mensagem;
        mensagemAlerta.classList.add('--sucesso');
        mensagemAlerta.classList.remove('--oculto');
    }
    else{
        textoMensagemAlerta.innerHTML = "<strong>Falha:</strong> "+mensagem;
        mensagemAlerta.classList.add('--falha');
        mensagemAlerta.classList.remove('--oculto');
    }    

    fecharmensagemDepoisTempo(3000);
}

function fecharMensagemAlerta(evento){
	const btnVigente = evento.target;
	const elementoVigente = btnVigente.parentElement;
	elementoVigente.classList.add('--oculto');
	elementoVigente.classList.remove('--sucesso');
	elementoVigente.classList.remove('--falha');
}

function fecharmensagemDepoisTempo(tempo){
	const fecharTempo = setTimeout(()=> btnFecharAlerta.click(),tempo);
}

const btnFecharAlerta = document.querySelector('[data-fechar-alerta]');
btnFecharAlerta.addEventListener('click',(evento)=> fecharMensagemAlerta(evento));

//o alerta fecha sozinho depois de 5 segundos...


export default exibirMensagemResposta;