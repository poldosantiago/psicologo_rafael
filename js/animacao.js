const target = document.querySelectorAll('[data-anime]'); //pega todos os elementos que precisam ser animados
const classeModificadoraAnimada = '--animate'; //define a classe css para ativar os elementos

//função que exibe os elementos
function animarScroll(){
	const windowTop = window.pageYOffset + ((window.innerHeight * 3)/4); //aqui define uma altura legal para exibir os elementos

	//analise cada elemento animado
	target.forEach((elemento) =>{
		if(windowTop > elemento.offsetTop){
			elemento.classList.add(classeModificadoraAnimada);
		}
		else{
			elemento.classList.remove(classeModificadoraAnimada);	
		}
	});

	//oculta o botão fixo (whatsApp) quando se aproxima do contato
	const posicaoContato = document.querySelector("#contato");
	if(windowTop > posicaoContato.offsetTop-200){
		const botaoFixo = document.getElementById("icones-navegacao-fixo__item");
		botaoFixo.classList.remove(classeModificadoraAnimada);	
	}
}

//executa alguma coisa sempre que o scroll for ativado
window.addEventListener('scroll',() => animarScroll());

//executa a função uma vez, quando a página é aberta
//animarScroll();