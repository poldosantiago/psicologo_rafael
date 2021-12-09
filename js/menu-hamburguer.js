function exibirMenu(){
	let menu = document.getElementsByClassName("menu__lista");
	menu[0].classList.toggle("--ativo");
}

const btnHamburguer = document.querySelector('[data-menu-hamburguer]');
btnHamburguer.addEventListener('click',exibirMenu);