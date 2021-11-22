let params = new URL(window.location.href).searchParams;
console.log (params)

let newId = params.get('id');
console.log (newId)

// création des constante que l'ont va utilisé dans le html

const img = document.getElementsByClassName ('item__img')
const title = document.getElementById ('title')
const price = document.getElementById ('price')
const desciption = document.getElementById ('description')
const colors = document.getElementById ('colors')



fetch('http://localhost:3300/api/products/' + newId)
.then(response => response.json())
.then((product) => {
    // Verification de l'extraction du tableau depuis l'API
    console.log(product);
    console.log (product.name)

    
    // ont prend les valeurs du tableau 'products' pour les assigné au html
    console.log(img)

        img[0].innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
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

const addData = document.getElementById('addToCart');

addData.addEventListener('click', (event) => {
  event.preventDefault();

  const selectQuantity = document.getElementById('quantity');
  const selectColors = document.getElementById('colors');

// récuperation des donnée du produit choisi

  let choiceProduct = {
    id: newId,
    name: title.textContent,
    price: price.textContent,
    color: selectColors.value,
    quantity: selectQuantity.value,
  };
  console.log(choiceProduct);

// const selectQuantity = document.getElementById('quantity');

  // console.log (selectQuantity.value)

  // const selectColors = document.getElementById('colors');

  // console.log (selectColors.value)

  // function setData(){
  //   let selectQuantity = document.getElementById('quantity').value;
  //    localStorage.setItem('quantity', selectQuantity)   
  //    let selectColors = document.getElementById('colors').value;
  //    localStorage.setItem('quantity', selectColors) 
  // }
let productInLocalStorage = JSON.parse(localStorage.getItem("product"));

// console.log (productInLocalStorage)

if(productInLocalStorage){
  productInLocalStorage.push(choiceProduct);
  localStorage.setItem("product", JSON.stringify(productInLocalStorage))
  console.log (productInLocalStorage)
}
else{
  
  // on creer le array de choix de produit
  productInLocalStorage = [];
  
  // on push "choiceProduct"
  productInLocalStorage.push(choiceProduct);

  // on envoie le choix dans le local storage
  localStorage.setItem("product", JSON.stringify(productInLocalStorage))
}
});