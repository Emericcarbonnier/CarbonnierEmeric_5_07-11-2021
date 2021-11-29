let params = new URL(window.location.href).searchParams;

let newId = params.get('id');
console.log (newId)

// création des constante que l'ont va utilisé dans le html

const img = document.getElementsByClassName('item__img')
const title = document.getElementById('title')
const price = document.getElementById('price')
const desciption = document.getElementById('description')
const colors = document.getElementById('colors')
const addData = document.getElementById('addToCart');
const selectQuantity = document.getElementById('quantity');
const selectColors = document.getElementById('colors');
let imgSrc = "";
let imgAlt = "";

fetch('http://localhost:3300/api/products/' + newId)
.then(response => response.json())
.then((product) => {
    // Verification de l'extraction du tableau depuis l'API
    console.log(product);

    
    // ont prend les valeurs du tableau 'products' pour les assigné au html

        img[0].innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
        imgSrc = product.imageUrl;
        imgAlt = product.altTxt;
        title.innerHTML = `<h1>${product.name}</h1>`;
        price.innerText = `${product.price}`;
        description.innerText = `${product.description}`;

        console.log(product.colors)
        console.log(colors.options)
        
        // choix de la couleur

        for (number in product.colors) {
            colors.options[colors.options.length] = new Option(
              product.colors[number]
            );
          }
    })

// creation de la constante du boutton



addData.addEventListener('click', (event) => {
  event.preventDefault();



// récuperation des donnée du produit choisi

  let choiceProduct = {
    id: newId,
    image: imgSrc,
    alt: imgAlt,
    name: title.textContent,
    price: price.textContent,
    color: selectColors.value,
    quantity: selectQuantity.value,
  };
  console.log(choiceProduct);


let productInCart = JSON.parse(localStorage.getItem("product"));

const addProductInCart = () => {
  productInCart.push(choiceProduct);
  // ont converti au format JSON
  localStorage.setItem('product', JSON.stringify(productInCart));
  }
  
  let update = false;
  
  // s'il y a des produits enregistrés dans le localStorage
  if (productInCart) {
  // verifier que le produit choisi n'esrt pas deja dans le panier
   productInCart.forEach (function (product, key) {

    if (product.id == newId && product.color == selectColors.value) {
      productInCart[key].quantity = parseInt(product.quantity) + parseInt(selectQuantity.value);

      localStorage.setItem('product', JSON.stringify(productInCart));
      update = true;
    }
  });

  if (!update) {
    addProductInCart();
    }
  }

  // s'il n'y a aucun produit dans le panier
  else {
    // je crée un nouveay array avec les éléments choisi par l'utilisateur
    productInCart = [];
    addProductInCart();
  }
});





// function initCart(cart){
    
//     if(!cart){
//          localStorage.setItem([])
//     }
  
// }



// initCart(cart)

// // Ajouter un produit au localstorage (cart = panier)
// function addProductToCart(){


// // récuperation des donnée du produit choisi
// //     [
// //         {
// //     id: 123,
// //     name: 'Kanap 1',
// //     price: 1990,
// //     selectedColor: 'green',
// //     quantity: 2,
// //   },
// //         {
// //     id: 1235,
// //     name: 'Kanap 1',
// //     price: 1990,
// //     selectedColor: 'green',
// //     quantity: 2,
// //   },
// //        {
// //     id: 12388,
// //     name: 'Kanap 3',
// //     price: 1990,
// //     selectedColor: 'green',
// //     quantity: 2,
// //   }
// //     ]

//   let choiceProduct = {
//     id: newId,
//     name: title.textContent,
//     price: price.textContent,
//     color: selectColors.value,
//     quantity: selectQuantity.value,
//   };

    
//       if(cart.contain(choiceProduct)){
//         // update la quantity
//              // recuperer le produit grace a l'id et sa couleur
//                 const product = cart.find(id, selectedColor)
//             // update qty +1 ou +2
//                 product.quantity =  product.quantity+1
          
//             return localStorage.setItem("cart", JSON.stringify(cart))

      
//       }
    
//     // Ajout dans le tableau du panier
//     cart.push(choiceProduct)
    
    
    
//     // Enregister le panier dans le localstorage
//      localStorage.setItem("cart", JSON.stringify(cart))


// }

// // Modifier la quantity d'un produit du panier
// function updateQantityProduct(){}

// // Supprimer un produit du panier
// function deleteProductFromCart(){}