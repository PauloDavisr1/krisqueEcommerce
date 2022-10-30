// navbar ativação
let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active')
    seachForm.classList.remove('active')
    cartItem.classList.remove('active')
}

// caixa de pesquisa
let seachForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () =>{
    seachForm.classList.toggle('active')
    navbar.classList.remove('active')
    cartItem.classList.remove('active')
}

// carrinho de compras
let cartItem = document.querySelector('.cart-items-container');
document.querySelector('#cart-btn').onclick = () =>{
    cartItem.classList.toggle('active')
    navbar.classList.remove('active')
    seachForm.classList.remove('active')
}
// substituição 
window.onscroll = () => {
    navbar.classList.remove('active')
    seachForm.classList.remove('active')
    cartItem.classList.remove('active')
}




