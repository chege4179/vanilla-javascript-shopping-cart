const cart = JSON.parse(localStorage.getItem('Cart'))
const CartTotal = document.getElementById('cart-total')
const CartArea = document.getElementById('cartArea')


CartTotal.innerText = parseInt(localStorage.getItem('CartTotal'))
const newCart = cart.map((item) => {
    return { price:parseInt(item.price),amount:1,name:item.name }
})
console.log('New Cart',newCart)

if (cart.length === 0){
    CartArea.innerHTML ='<h1>No Items in your cart</h1>'
}else {
    CartArea.innerHTML  = ''
    cart.forEach((item) => {
        CartArea.innerHTML += CartContent(item.name,item.price,item.description,item.imageUrl)
    })
}
const InputField = document.getElementsByClassName('cart-quantity-input')
const RemoveFromCart = document.querySelectorAll('#removeCart')
console.log(RemoveFromCart)
RemoveFromCart.forEach((button) => {
    button.addEventListener('click',(e) => {
        const name = e.target.parentElement.getElementsByClassName('card-title')[0].innerText
        const newCartAfterRemoval = newCart.filter((cartItem) => cartItem.name !== name)
        console.log(newCartAfterRemoval)
        e.target.parentElement.parentElement.remove()
        if (newCartAfterRemoval.length === 0){
            CartTotal.innerText = 0
        }
        getCartTotal(newCartAfterRemoval)

    })
})

Array.from(InputField).forEach((input) => {
    input.addEventListener('change',(e) => {
        const price = e.target.parentElement.getElementsByClassName('card-title')[1].innerText
        console.log('Amount',parseInt(price))
        changeAmount(parseInt(e.target.value),parseInt(price),newCart)
    })
})


function CartContent  (name,price,description,imageUrl)  {
    return(
        `
            <div class="card" style="width: 900px;display: flex; flex-direction: row">
              <img src='${imageUrl}'  width="200px" height="200px" alt="image">
              <div class="card-body">
                  <div style="display: flex; flex-direction: row; justify-content: space-between">
                      <div>
                        <h5 class="card-title">${name}</h5>
                        <h5 class="card-title">${price}</h5>
                      </div>
                      <input class="cart-quantity-input" type="number" value="1">
                  </div>
                  <p class="card-text">${description}</p>
                  <a href="#" id="removeCart" class="btn btn-primary">Remove From Cart</a>
              </div>
            </div>        
        `)
}

function getCartTotal(cart){
    const totalPrice = cart.map((item) => {
        const subtotal = item.amount * item.price
        return subtotal
    })
    console.log(totalPrice)
    const total = totalPrice.reduce((a,b) => a + b,0)
    console.log(total)
    CartTotal.innerText = total

}

function changeAmount( newamount, price,changeArray ) {
    for (let i in changeArray) {
        if (changeArray[i].price === price ) {
            changeArray[i].amount = newamount;
            break; //Stop this loop, we found it!
        }
    }
    console.log(changeArray)
    getCartTotal(changeArray)
}
getCartTotal(newCart)
