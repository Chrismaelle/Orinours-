////////////////////// PARAMETRE DE REQUETE URL //////////////////////

const str = window.location;
const url = new URL(str);
const idUrl = url.searchParams.get("id");

////////////////////// FUNCTIONS //////////////////////
let recupCard = {
  recupInfo: function () {
    return new Promise((resolve, reject) => {
      let recoverHttp = new XMLHttpRequest();
      recoverHttp.open("GET", "http://localhost:3000/api/teddies/" + idUrl);
      recoverHttp.send();
      recoverHttp.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE) {
          if (this.status === 200) {
            resolve(JSON.parse(this.responseText));
          } else {
            reject(XMLHttpRequest);
          }
        }
      };
    });
  },
  insertPicture: function (section, teddy) {
    const newFigure = document.createElement("figure");
    section.appendChild(newFigure);
    const newPic = document.createElement("img");
    newFigure.appendChild(newPic);
    newPic.setAttribute("src", teddy.imageUrl);
  },
  insertName: function (description, teddy) {
    const nameTeddy = document.createElement("h3");
    description.appendChild(nameTeddy);
    nameTeddy.innerHTML = teddy.name;
  },
  insertId: function (description, teddy) {
    const divId = document.createElement("div");
    description.appendChild(divId);
    divId.className = "id_ourson";
    const paragraphNumId = document.createElement("p");
    divId.appendChild(paragraphNumId);
    const newSpan = document.createElement("span");
    paragraphNumId.appendChild(newSpan);
    newSpan.innerHTML = "Numéro d'Id : ";
    const paragraphId = document.createElement("p");
    divId.appendChild(paragraphId);
    paragraphId.innerHTML = teddy._id;
  },
  insertColor: function (description, teddyColors) {
    const divColor = document.createElement("div");
    description.appendChild(divColor);
    divColor.className = "labelForColor";
    const labelColor = document.createElement("label");
    divColor.appendChild(labelColor);
    labelColor.innerHTML = "Sélectionner votre Couleur préférée : ";
    const selectColor = document.createElement("select");
    labelColor.appendChild(selectColor);
    selectColor.id = "choose_color";

    for (let i = 0; i < teddyColors.length; i += 1) {
      const secondOption = document.createElement("option");
      selectColor.appendChild(secondOption);
      secondOption.setAttribute("value", teddyColors[i]);
      secondOption.setAttribute("required", "");
      secondOption.innerHTML = teddyColors[i];
    }
  },
  insertDescription: function (description, teddy) {
    const paragraphDescription = document.createElement("p");
    description.appendChild(paragraphDescription);
    paragraphDescription.className = "divDescript";
    paragraphDescription.innerHTML = teddy.description;
  },
  insertButtonCart: function (section, teddy) {
    const divRate = document.createElement("div");
    section.appendChild(divRate);
    divRate.className = "divTarifs";
    const divPrice = document.createElement("div");
    divRate.appendChild(divPrice);
    divPrice.className = "prixTeddy";
    const paragraphPrice = document.createElement("p");
    divPrice.appendChild(paragraphPrice);
    paragraphPrice.innerHTML =
      [teddy.price].map((price) => price / 100) + " " + "€";
    const buttonValid = document.createElement("button");
    divRate.appendChild(buttonValid);
    buttonValid.className = "boutonPanier";
    buttonValid.setAttribute("type", "submit");
    buttonValid.innerHTML = "Ajouter au Panier";
  },
};

recupCard
  .recupInfo()
  .then(function (response) {
    const pageProduct = document.getElementById("page_product");
    const mainSection = document.createElement("section");
    pageProduct.appendChild(mainSection);
    mainSection.className = "onlyTeddy";
    recupCard.insertPicture(mainSection, response);
    const teddyDescription = document.createElement("div");
    mainSection.appendChild(teddyDescription);
    teddyDescription.className = "description_Teddy";
    recupCard.insertName(teddyDescription, response);
    recupCard.insertId(teddyDescription, response);
    recupCard.insertColor(teddyDescription, response.colors);
    const chooseColor = document.querySelector("select");
    chooseColor.addEventListener("change", function (e) {
      //evenement pour voir la couloir choisi
    });
    recupCard.insertDescription(teddyDescription, response);
    recupCard.insertButtonCart(mainSection, response);

    // EVENEMENTS //

    const addCart = document.querySelector("button");
    addCart.addEventListener("click", function (e) {
      //evenement 'click' pour l'envoi au local storage
      let teddiesChoosen = {
        picture: response.imageUrl,
        firstName: response.name,
        theId: response._id,
        color: chooseColor.value,
        price: response.price,
      };
      const teddiesAdded = localStorage.getItem("product");
      if (teddiesAdded) {
        teddiesInCArt = JSON.parse(teddiesAdded);
        teddiesInCArt.push(teddiesChoosen);
        localStorage.setItem("product", JSON.stringify(teddiesInCArt));
        alert("N'ours in da Box !");
      } else {
        teddiesInCArt = [];
        teddiesInCArt.push(teddiesChoosen);
        localStorage.setItem("product", JSON.stringify(teddiesInCArt));
        alert("N'ours in da Box !");
      }
    });
  })
  .catch(function (error) {
    console.log(error);
  });
