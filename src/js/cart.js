
let modalKey = 0
let quantCogumelos = 1
let cart = [] 

const seleciona = (elemento) => document.querySelector(elemento)
const selecionaTodos = (elemento) => document.querySelectorAll(elemento)

const formatoReal = (valor) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

const formatoMonetario = (valor) => {
    if(valor) {
        return valor.toFixed(2)
    }
}


const abrirModal = () => {
    seleciona('.cogumeloWindowArea').style.opacity = 0 
    seleciona('.cogumeloWindowArea').style.display = 'flex'
    setTimeout(() => seleciona('.cogumeloWindowArea').style.opacity = 1, 150)
}


const fecharModal = () => {
    seleciona('.cogumeloWindowArea').style.opacity = 0 
    setTimeout(() => seleciona('.cogumeloWindowArea').style.display = 'none', 500)
}

const botoesFechar = () => {
    selecionaTodos('.cogumeloInfo--cancelButton, .cogumeloInfo--cancelMobileButton').forEach( (item) => item.addEventListener('click', fecharModal) )
}

const preencheDadosDosCogumelos = (cogumeloItem, item, index) => {
	cogumeloItem.setAttribute('data-key', index)
    cogumeloItem.querySelector('.cogumelo-item--img img').src = item.img
    cogumeloItem.querySelector('.cogumelo-item--price').innerHTML = formatoReal(item.price)
    cogumeloItem.querySelector('.cogumelo-item--name').innerHTML = item.name
    cogumeloItem.querySelector('.cogumelo-item--desc').innerHTML = item.description
}

const preencheDadosModal = (item) => {
    seleciona('.cogumeloBig img').src = item.img
    seleciona('.cogumeloInfo h1').innerHTML = item.name
    seleciona('.cogumeloInfo--desc').innerHTML = item.description
    seleciona('.cogumeloInfo--actualPrice').innerHTML = formatoReal(item.price[2])
}


const pegarKey = (e) => {
    let key = e.target.closest('.cogumelo-item').getAttribute('data-key')
    console.log('cogumelo clicada ' + key)
    console.log(cogumeloJson[key])
    quantcogumelos = 1
    modalKey = key

    return key
}

const preencherTamanhos = (key) => {
    seleciona('.cogumeloInfo--size.selected').classList.remove('selected')
    selecionaTodos('.cogumeloInfo--size').forEach((size, sizeIndex) => {
        (sizeIndex == 2) ? size.classList.add('selected') : ''
        size.querySelector('span').innerHTML = cogumeloJson[key].sizes[sizeIndex]
    })
}

const escolherTamanhoPreco = (key) => {
    selecionaTodos('.cogumeloInfo--size').forEach((size, sizeIndex) => {
        size.addEventListener('click', (e) => {
            seleciona('.cogumeloInfo--size.selected').classList.remove('selected')
            
            size.classList.add('selected')

            
            seleciona('.cogumeloInfo--actualPrice').innerHTML = formatoReal(cogumeloJson[key].price[sizeIndex])
        })
    })
}

const mudarQuantidade = () => {
    seleciona('.cogumeloInfo--qtmais').addEventListener('click', () => {
        quantCogumelos++
        seleciona('.cogumeloInfo--qt').innerHTML = quantCogumelos
    })

    seleciona('.cogumeloInfo--qtmenos').addEventListener('click', () => {
        if(quantCogumelos > 1) {
            quantCogumelos--
            seleciona('.cogumeloInfo--qt').innerHTML = quantCogumelos	
        }
    })
}

const abrirCarrinho = () => {
    console.log('Qtd de itens no carrinho ' + cart.length)
    if(cart.length > 0) {
        
	    seleciona('aside').classList.add('show')
        seleciona('header').style.display = 'flex' 
    }

    
    seleciona('.menu-openner').addEventListener('click', () => {
        if(cart.length > 0) {
            seleciona('aside').classList.add('show')
            seleciona('aside').style.left = '0'
        }
    })
}

const fecharCarrinho = () => {
    
    seleciona('.menu-closer').addEventListener('click', () => {
        seleciona('aside').style.left = '100vw' 
        seleciona('header').style.display = 'flex'
    })
}

const atualizarCarrinho = () => {
    
	seleciona('.menu-openner span').innerHTML = cart.length
	
	
	if(cart.length > 0) {

		
		seleciona('aside').classList.add('show')

		
		seleciona('.cart').innerHTML = ''

        
		let subtotal = 0
		let desconto = 0
		let total    = 0

       
		for(let i in cart) {
			
			let cogumeloItem = cogumeloJson.find( (item) => item.id == cart[i].id )
			console.log(cogumeloItem)

           
        	subtotal += cart[i].price * cart[i].qt
			let cartItem = seleciona('.models .cart--item').cloneNode(true)
			seleciona('.cart').append(cartItem)

			let cogumeloSizeName = cart[i].size

			let cogumeloName = `${cogumeloItem.name} (${cogumeloSizeName})`

			
			cartItem.querySelector('img').src = cogumeloItem.img
			cartItem.querySelector('.cart--item-nome').innerHTML = cogumeloName
			cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt

			
			cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
				console.log('Clicou no botão mais')
				
				cart[i].qt++
				
				atualizarCarrinho()
			})

			cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
				console.log('Clicou no botão menos')
				if(cart[i].qt > 1) {
					
					cart[i].qt--
				} else {
					
					cart.splice(i, 1)
				}

                (cart.length < 1) ? seleciona('header').style.display = 'flex' : ''

				
				atualizarCarrinho()
			})

			seleciona('.cart').append(cartItem)

		} 
		desconto = subtotal * 0
		total = subtotal - desconto

		
		seleciona('.subtotal span:last-child').innerHTML = formatoReal(subtotal)
		seleciona('.desconto span:last-child').innerHTML = formatoReal(desconto)
		seleciona('.total span:last-child').innerHTML    = formatoReal(total)

	} else {
		seleciona('aside').classList.remove('show')
		seleciona('aside').style.left = '100vw'
	}
}

const finalizarCompra = () => {
    seleciona('.cart--finalizar').addEventListener('click', () => {
        console.log('Finalizar compra')
        seleciona('aside').classList.remove('show')
        seleciona('aside').style.left = '100vw'
        seleciona('header').style.display = 'flex'
    })
}

const adicionarNoCarrinho = (item) => {
    
    let { id, price, size } = item

    let key = cart.findIndex( (productInCart) => productInCart.id === id )

    if(key > -1) {
        cart[key].qt += quantCogumelos
    } else {
        let cogumelo = {      
            id,
            size: `${size}g`,
            qt: quantCogumelos,
            price,
        }
        cart.push(cogumelo)

        console.log('Sub total R$ ' + (cogumelo.qt * cogumelo.price).toFixed(2))
    }

    fecharModal()
    abrirCarrinho()
    atualizarCarrinho()
}

cogumeloJson.map((item, index ) => {
    
    let cogumeloItem = seleciona('.models .cogumelo-item').cloneNode(true)

    cogumeloItem.firstElementChild.addEventListener('click', () => adicionarNoCarrinho(item))  
    
    seleciona('.cogumelo-area').appendChild(cogumeloItem)
    
    preencheDadosDosCogumelos(cogumeloItem, item, index)
    
}) 
mudarQuantidade()

atualizarCarrinho()
fecharCarrinho()
finalizarCompra()

