import {myGlobalString, cart, BASE_URL} from './GlobalState.js'

const mainContainer = document.getElementById('main-container')
const CartButton = document.getElementById('cart')
const CartLength = document.getElementById('cart-length')
console.log(myGlobalString)
console.log(cart)
LoadProducts()

let cartShown = false

function createProduct(name, imageUrl, price, description) {
	const ProductDiv = document.createElement('div')
	const ProductImage = document.createElement('img')
	const ProductName = document.createElement('h5')
	const ProductDescription = document.createElement('p')
	const AddToCartButton = document.createElement('a')
	const ProductInfo = document.createElement('div')
	ProductDiv.classList.add('card')
	ProductDiv.style.height = '390px'
	ProductDiv.style.width = '350px'

	ProductImage.className = 'card-img-top'
	ProductImage.style.height = '250px'
	ProductInfo.className = 'card-body'
	ProductName.className = 'card-title'
	ProductDescription.className = 'card-text'
	AddToCartButton.className = 'btn btn-primary'
	AddToCartButton.innerText = 'Add To Cart'

	ProductImage.setAttribute('src', imageUrl)
	ProductName.innerText = name
	ProductDescription.innerText = description
	ProductInfo.appendChild(ProductName)
	ProductInfo.appendChild(ProductDescription)
	ProductInfo.appendChild(AddToCartButton)
	ProductDiv.appendChild(ProductImage)
	ProductDiv.appendChild(ProductInfo)


	AddToCartButton.addEventListener('click', (e) => {
		const index = cart.findIndex((item) => item.name === name)
		if (index !== -1) {
			alert('This product is already in your cart')
		} else {
			cart.push({name, imageUrl, price, description})
			localStorage.setItem('Cart', JSON.stringify(cart))
			console.log(cart)
			CartLength.innerText = cart.length
		}
	})
	return ProductDiv
}

function press() {
	console.log('Pressed')
}

function LoadProducts() {
	mainContainer.innerHTML = ''
	fetch(`${BASE_URL}/product/all`)
		.then((res) => res.json())
		.then((res) => {
			console.log(res)

			res.products.forEach((product) => {
				mainContainer.appendChild(createProduct(product.name,product.images[0].url , product.price, product.description.slice(0,40)))
			})
		})
		.catch(err => {
			mainContainer.innerHTML = '<h1>Some Thing went wrong</h1>'
		})
}

const CartContent = (name, price, description, imageUrl) => {
	return (
		`
            <div class="card" style="width: 900px;display: flex; flex-direction: row">
              <img src='http://localhost:8000${imageUrl}'  width="200px" height="200px" alt="image">
              <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <p class="card-text">${description}</p>
                <a href="#" id="removeCart" class="btn btn-primary">Remove From Cart</a>
              </div>
            </div>        
        `)
}
// CartButton.addEventListener('click',()=> {
//
//     if (!cartShown){
//         cartShown = true
//         CartButton.innerText = 'Cart'
//         LoadProducts();
//     }else {
//         cartShown = false
//         CartButton.innerText = 'Go Back To Products'
//
//
//     }
//
// })

