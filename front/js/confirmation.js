// affichage du numero de commande fourni par l'API, puis ont efface toute les information client

function orderValidation(){
    const orderId = document.getElementById('orderId');
    orderId.innerHTML = localStorage.getItem('orderId');
    localStorage.clear();
}
orderValidation();