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

