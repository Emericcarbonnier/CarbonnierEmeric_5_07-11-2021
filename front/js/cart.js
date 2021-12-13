let productsInCart = getCartFromLocalStorage("product");

function getCartFromLocalStorage($key) {
  return JSON.parse(localStorage.getItem($key));
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
</article>`;
}

// Display all product from cart

function displayProductsFromCart() {
  let itemCartHtml = "";

  productsInCart.forEach((productItem) => {
    itemCartHtml = itemCartHtml + createHtmlForCart(productItem);
  });

  if (productsInCart.length > 0) {
    const $itemCart = document.getElementById("cart__items");
    $itemCart.innerHTML = itemCartHtml;
  }
}

function deleteProductFromCart() {
  let $deleteLinkProduct = document.querySelectorAll(".deleteItem");

  $deleteLinkProduct.forEach((deleteElement) => {
    deleteElement.addEventListener("click", (event) => {
      event.preventDefault();

      // Recuperer le parent node de l'element cliqué
      let element = deleteElement.closest(".cart__item");

      let productId = element.getAttribute("data-id");
      let productColor = element.getAttribute("data-color");

      let productIndexToDelete = productsInCart.findIndex(
        (product) => productColor === product.color && productId === product.id
      );

      // Delete to localstorage

      element.remove();

      productsInCart.splice(productIndexToDelete, 1);

      localStorage.setItem("product", JSON.stringify(productsInCart));

      alert("Votre article a bien été supprimé.");

      totalArticlesOfCart();
      TotalPriceOfCart();
    });
  });
}

function totalArticlesOfCart() {
  let totalItems = 0;
  productsInCart.forEach((product) => {
    const newQuantity = parseInt(product.quantity, 10);
    totalItems += newQuantity;

    const totalQuantity = document.getElementById("totalQuantity");
    totalQuantity.textContent = totalItems;
  });
}

function TotalPriceOfCart() {
  const calculPrice = [];
  productsInCart.forEach((product) => {
    const cartAmount = product.price * product.quantity;
    calculPrice.push(cartAmount);

    const reduce = (previousValue, currentValue) =>
      previousValue + currentValue;
    total = calculPrice.reduce(reduce);
  });
  const totalPrice = document.getElementById("totalPrice");
  totalPrice.textContent = total;
}

function changeQtt() {
  let $itemQuantity = document.querySelectorAll(".itemQuantity");

  $itemQuantity.forEach((itemQuantity) => {
    itemQuantity.addEventListener("change", (event) => {
      event.preventDefault();

      let element = itemQuantity.closest(".cart__item");
      let productId = element.getAttribute("data-id");
      let productColor = element.getAttribute("data-color");

      let productIndexToModifyQuantity = productsInCart.findIndex((product) => {
        return productColor === product.color && productId === product.id;
      });

      console.log(productIndexToModifyQuantity);

      productsInCart[productIndexToModifyQuantity].quantity =
        event.target.value;

      localStorage.setItem("product", JSON.stringify(productsInCart));

      alert("Votre panier est à jour.");
      totalArticlesOfCart();
      TotalPriceOfCart();
    });
  });
}

displayProductsFromCart();

deleteProductFromCart();

totalArticlesOfCart();

TotalPriceOfCart();

changeQtt();

function postForm() {
  const order = document.getElementById("order");
  order.addEventListener("click", (event) => {
    event.preventDefault();

    const regexEmail = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
   const regexAddress = /^[a-zA-Z0-9\s,.'-]{3,}$/;
   const regexLetter = /^[a-zA-Z-]+$/;
   
    const contact = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      address: document.getElementById("address").value,
      city: document.getElementById("city").value,
      email: document.getElementById("email").value,
    };

    function controlFirstName() {
      const validFirstName = contact.firstName;
      if (
        regexLetter.test(validFirstName)
      ) {
        return true;
      } else {
        let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
        firstNameErrorMsg.innerText = "Merci de vérifier le prénom";
      }
    }

    // contrôle nom
    function controlName() {
      const validName = contact.lastName;
      if (regexLetter.test(validName)) {
        return true;
      } else {
        let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
        lastNameErrorMsg.innerText = "Merci de vérifier le nom";
      }
    }

    // contrôle adresse
    function controlAddress() {
      const validAddress = contact.address;
      if (regexAddress.test(validAddress)) {
        return true;
      } else {
        let addressErrorMsg = document.getElementById("addressErrorMsg");
        addressErrorMsg.innerText = "Merci de vérifier l'adresse";
      }
    }

    // contrôle ville
    function controlCity() {
      const validAddress = contact.city;
      if (regexLetter.test(validAddress)) {
        return true;
      } else {
        let cityErrorMsg = document.getElementById("cityErrorMsg");
        cityErrorMsg.innerText = "Merci de vérifier le nom de la ville";
      }
    }

    // contrôle email
    function controlEmail() {
      const validEmail = contact.email;
      if (regexEmail.test(validEmail)) {
        return true;
      } else {
        let emailErrorMsg = document.getElementById("emailErrorMsg");
        emailErrorMsg.innerText = "Email non valide";
      }
    }

    function validControl() {
      if (
        controlFirstName() &&
        controlName() &&
        controlAddress() &&
        controlCity() &&
        controlEmail()
      ) {
        localStorage.setItem("contact", JSON.stringify(contact));
        return true;
      } else {
        alert("Merci de vérifier les données du formulaire");
      }
    }

    validControl();

    const sendOrder = {
      contact,
      productsInCart,
    };

    // // const options = {
    // //   method: 'POST',
    // //   body: JSON.stringify(sendOrder),
    // //   headers: { 
    // //     'Content-Type': 'application/json',
    // //   }
    // };
    fetch("http://localhost:3000/api/products/order", {
     
      method: "POST",
      body: JSON.stringify(sendOrder),
      headers: {
          "Content-type": "application/json; charset=UTF-8"
      }
  })
  .then(response => response.json())
  .then(data => 
    console.log(data)
    );
  }) 
  } 

postForm();
