import enviarEmailAjax from './envio-email-ajax.js';
import exibirMensagemResposta from './mensagem-alerta.js';

const listaCampoFormulario = document.querySelectorAll('[data-formulario-input]');

//console.log(listaCampoFormulario);

for(let campo of listaCampoFormulario){
	campo.addEventListener('focusout',(evento)=> {

	///console.log("opa deu certo");

	const campoVigente = evento.target;
	//console.log(campoVigente.value);
	//console.log(campoVigente.dataset.formularioInput,verificarCampo(campoVigente));

	if(verificarCampo(campoVigente))
		validarCampo(campoVigente);
	else
		invalidarCampo(campoVigente);

	})
}

const botaoCampoFormulario = document.querySelector('[data-formulario-button]');
botaoCampoFormulario.addEventListener('click',validarFormularioEmail);

function validarFormularioEmail(evento){
	evento.preventDefault(); //evita de atualizar a página quando enviar algum dado do formulário

	//verifica se existe algum campo não validado
	let algumCampoNaoValidado = false;
	for(let campo of listaCampoFormulario){
		//console.log(campo.dataset.formularioInput,"tem class --nao-validado?",campo.classList.contains("--nao-validado"));
		if(campo.classList.contains("--nao-validado")){
			algumCampoNaoValidado = true;
			invalidarCampo(campo);
		}
	}	
	if(algumCampoNaoValidado){
		//alert("Por favor, preencha os campos obrigatórios");
		exibirMensagemResposta(false,"Por favor, preencha os campos obrigatórios");

		return;
	}	

	//verifica se os dados são invalidos
	for(let campo of listaCampoFormulario){
		//console.log(campo.dataset.formularioInput,"tem class --invalido?",campo.classList.contains("--invalido"));
		if(campo.classList.contains("--invalido")){
			//alert("formulario invalido")
			exibirMensagemResposta(false,"formulario invalido");
			//console.log(listaCampoFormulario);
			return;
		}
	}	

	//se validou blz...
	enviarEmailAjax();
}

//funcoes
function verificarCampo(campo){
	if(verificarCampoVazio(campo)){
		//verifica se o campo é de email
		if(campo.dataset.formularioInput == "email")
			return verificarCampoEmail(campo);

		return true;
	}
	else{
		return false;
	}
}

function verificarCampoVazio(campo){
	return campo.value != "";
}

function verificarCampoEmail(campo){
  const email = campo.value;
  const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  const resultado = email.match(regex);
  
  return resultado;
}

function validarCampo(campo){
	campo.classList.remove("--invalido");
	campo.classList.remove("--nao-validado");
}

function invalidarCampo(campo){
	campo.classList.add("--invalido");
	campo.classList.remove("--nao-validado");
}
