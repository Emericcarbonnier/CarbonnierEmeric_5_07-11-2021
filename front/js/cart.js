// ont extrait le panier du localstorage
let products = [];
let productInCart = JSON.parse(localStorage.getItem('product'));

function addProductInCart(){

  let itemCards = [];
 
// i correspond au nombre d'entré dans le tablezau panier
  for (i = 0; i < productInCart.length; i++) {
  products.push(productInCart[i].id);
 
  // ont met en place le html du panier pour chaque entré
  itemCards = itemCards + `
    
    <article class="cart__item" data-id="${productInCart[i].id}" data-color="${productInCart.color}">
    <div class="cart__item__img">
      <img src="${productInCart[i].image}" alt="${productInCart[i].alt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__titlePrice">
        <h2>${productInCart[i].name}</h2>
        <p>${productInCart[i].color}</p>
        <p>${productInCart[i].price} €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productInCart[i].quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>
    `;
  }
  if (i === productInCart.length) {
  const itemCart = document.getElementById('cart__items');
  itemCart.innerHTML += itemCards;
  }}

addProductInCart()


// function deleteProduct(){

// let deleteProductInCart = document.querySelectorAll(".deleteItem");
// console.log(deleteProductInCart)

// for (d = 0; d < deleteProductInCart.length; d++) {
//   deleteProductInCart[d].addEventListener("click", (event) =>{
//     event.preventDefault()
//   }
 



// }
