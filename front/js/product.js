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
.then((products) => {
    // Verification de l'extraction du tableau depuis l'API
    console.log(products);
    console.log (products.name)

    
    // ont prend les valeurs du tableau 'products' pour les assigné au html
        img[0].innerHTML = `<img src="${products.imageUrl}" alt="${products.altTxt}">`;
        title.innerHTML = `<h1>${products.name}</h1>`;
        price.innerText = `${products.price}`;
        description.innerText = `${products.description}`;
    
    })