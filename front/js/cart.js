let productsInCart = getCartFromLocalStorage('product');


function getCartFromLocalStorage($key) {
  return JSON.parse(localStorage.getItem($key))
}

function createHtmlForCart(productItem) {

  return `<article class="cart__item" data-id="${productItem.id}" data-color="${productItem.color}">
  <div class="cart__item__img">
    <img src="${productItem.image}" alt="${productItem.alt}">
  </div>
  <div class="cart__item__content">
    <div class="cart__item__content__titlePrice">
      <h2>${productItem.name}</h2>
      <p>${productItem.color}</p>
      <p>${productItem.price} €</p>
    </div>
    <div class="cart__item__content__settings">
      <div class="cart__item__content__settings__quantity">
        <p>Qté : </p>
        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productItem.quantity}">
      </div>
      <div class="cart__item__content__settings__delete">
        <p class="deleteItem">Supprimer</p>
      </div>
    </div>
  </div>
</article>`
}

// Display all product from cart
function displayProductsFromCart() {

  let itemCartHtml = '';

  productsInCart.forEach((productItem) => {
    itemCartHtml = itemCartHtml + createHtmlForCart(productItem);
  })

  if (productsInCart.length > 0) {
    const $itemCart = document.getElementById('cart__items');
    $itemCart.innerHTML = itemCartHtml;
  }
}

function deleteProductFromCart() {
  let $deleteLinkProduct = document.querySelectorAll('.deleteItem');

  $deleteLinkProduct.forEach((deleteElement) => {
    deleteElement.addEventListener('click', (event) => {
      event.preventDefault();
  
      // Recuperer le parent node de l'element cliqué
      let element = deleteElement.closest('.cart__item');
  
      let productId = element.getAttribute('data-id');
      let productColor = element.getAttribute('data-color');
  
      let productIndexToDelete = productsInCart.findIndex((product) => {
        return productColor === product.color && productId === product.id
      })
  
      console.log(productsInCart)
      console.log(productIndexToDelete)
  
  
      // Delete to localstorage
  
      element.remove();
      productsInCart = productsInCart.filter( elt => elt.id !== productId || elt.color !== productColor);
    
      localStorage.setItem('product', JSON.stringify(productsInCart));
      console.log('click delete :' + productId + ' ' + productColor)
      alert('Votre article a bien été supprimé.');
    })
  })
}

  function totalArticlesOfCart() {
    let totalItems = 0;
    productsInCart.forEach((product) => {
      
      const newQuantity = parseInt(product.quantity, 10);
      totalItems += newQuantity;
    
      const totalQuantity = document.getElementById('totalQuantity');
      totalQuantity.textContent = totalItems;
    })
  }

  function TotalPriceOfCart() {
      const calculPrice = [];
      productsInCart.forEach((product) => {

        const cartAmount = product.price * product.quantity;
        calculPrice.push(cartAmount);
    
    
        const reduce = (previousValue, currentValue) => previousValue + currentValue;
        total = calculPrice.reduce(reduce);
      })
      const totalPrice = document.getElementById('totalPrice');
      totalPrice.textContent = total;
    }


displayProductsFromCart()

deleteProductFromCart()

totalArticlesOfCart();

TotalPriceOfCart();