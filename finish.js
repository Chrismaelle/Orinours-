// PARAMETRE DE REQUETE URL //

const str = window.location;
const url = new URL(str);
const idUrl = url.searchParams.get("orderId");

// CONSTANTES //

const teddiesAdded_json = localStorage.getItem("product");
const teddiesAdded = JSON.parse(teddiesAdded_json);

// CALCUL MONTANT TOTAL COMMANDE //

let priceTeddies = [];

for (let i = 0; i < teddiesAdded.length; i++) {
  priceTeddies.push([teddiesAdded[i].price].map((i) => i / 100));
}
let arrayPrice = priceTeddies.map(function (x) {
  return parseInt(x, 10);
});
const calculator = (accumulator, currentValue) => accumulator + currentValue;
let calculPrice = arrayPrice.reduce(calculator);

// FUNCTIONS  //

/*----------- Fonction pour gestion page Remerciement ----------*/
function orderPage(response, priceTeddies) {
  const thanksPage = document.getElementById("page_remerciements");
  const priceCart = document.getElementById("prix_achat");
  priceCart.innerHTML = calculPrice;
  const orderForId = document.getElementById("order_id");
  orderForId.innerHTML = idUrl;
}
// NAVIGATEUR //
let btn = document.querySelector(".toggle_btn");
let nav = document.querySelector(".nav");

btn.onclick = function () {
  nav.classList.toggle("nav__open");
  nav.style.zIndex = "1";
};
// APPEL DE LA FONCTION //

orderPage();
