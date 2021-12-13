fetch('http://localhost:3000/api/products')
.then(response => response.json())
.then((products) => {
    // Verification de l'extraction du tableau depuis l'API
    console.log(products);

    // Pour chaque objet du tableau 'products' ont execute la fonction 'product'
    products.forEach(function(product) {

    // Creer la constante 'itemCard' qui correspond a '.items' dans le html
    const itemCard = document.getElementById('items')

    // Ont assigne a '.items' parle biai de la constante 'itemCard' le html correspondant
    itemCard.innerHTML+=
    `<a href="./product.html?id=${product._id}">
    <article>
      <img src="${product.imageUrl}" alt="${product.altTxt}">
      <h3 class="productName">${product.name}</h3>
      <p class="productDescription">${product.description}</p>
    </article>
    </a>`
})

})