/*------------ PAGE D ACCUEIL ------------*/

/*------------ FUNCTIONS ------------*/

let createCard = {
  insertImageUrl: function (section, imageTeddies) {
    let newFigure = document.createElement("figure");
    section.appendChild(newFigure);
    newFigure.className = "conteneurImg";
    let newImg = document.createElement("img");
    newFigure.appendChild(newImg);
    newImg.setAttribute("src", imageTeddies);
    newImg.className = "imgOurson";
  },
  insertName: function (div, nameTeddies) {
    const newH3 = document.createElement("h3");
    div.appendChild(newH3);
    newH3.innerHTML = nameTeddies;
  },
  insertId: function (div, idTeddies) {
    const newDiv2 = document.createElement("div");
    div.appendChild(newDiv2);
    newDiv2.className = "id_ourson";
    const newP1 = document.createElement("p");
    newDiv2.appendChild(newP1);
    const newSpan = document.createElement("span");
    newP1.appendChild(newSpan);
    newSpan.innerHTML = "Numéro d'Id : ";
    const newP2 = document.createElement("p");
    newDiv2.appendChild(newP2);
    newP2.id = "id_teddy";
    newP2.innerHTML = idTeddies;
  },
  insertColor: function (div) {
    const newP3 = document.createElement("p");
    div.appendChild(newP3);
    const newSpan2 = document.createElement("span");
    newP3.appendChild(newSpan2);
    newSpan2.innerHTML = "Couleur : Personnalisable";
  },
  insertDescription: function (div, descriptionTeddies) {
    const newP4 = document.createElement("p");
    div.appendChild(newP4);
    newP4.innerHTML = descriptionTeddies;
  },
  insertPrice: function (div3, priceTeddies) {
    const newDiv4 = document.createElement("div");
    div3.appendChild(newDiv4);
    newDiv4.className = "prix_ourson";
    const newP5 = document.createElement("p");
    newDiv4.appendChild(newP5);
    newP5.innerHTML = priceTeddies;
  },
  insertLienPerso: function (div3, idLienTeddies) {
    const newDiv5 = document.createElement("div");
    div3.appendChild(newDiv5);
    newDiv5.className = "ajout_panier";
    const newP6 = document.createElement("p");
    newDiv5.appendChild(newP6);
    const newA = document.createElement("a");
    newP6.appendChild(newA);
    newA.className = "lien_page_product";
    newA.setAttribute("href", "./page_produit.html?id=" + idLienTeddies);
    newA.innerHTML = "Personnaliser le !";
  },
  serverOut: function () {
    const myH1 = document.getElementById("my_title");
    myH1.style.display = "none";
    const myH2 = document.getElementById("my_second_title");
    myH2.style.display = "none";
    const myFooter = document.getElementById("footer");
    myFooter.style.display = "none";
    const divServerOut = eltDiv;
    catalogue.appendChild(divServerOut);
    divServerOut.id = "div_server_out";
    divServerOut.innerHTML = "Nous revenons très bientôt";
  },
};

function recupInfo() {
  return new Promise((resolve, reject) => {
    let recupHttp = new XMLHttpRequest();
    recupHttp.open("GET", "http://localhost:3000/api/teddies");
    recupHttp.send();
    recupHttp.onreadystatechange = function () {
      if (this.readyState === XMLHttpRequest.DONE) {
        if (this.status === 200) {
          resolve(JSON.parse(this.responseText));
        } else {
          reject(recupHttp);
        }
      }
    };
  });
}

function createProductCard(response) {
  const catalogue = document.getElementById("catalogue");
  for (let i = 0; i < response.length; i++) {
    const newSection = document.createElement("section");
    catalogue.appendChild(newSection);
    newSection.className = "PartieOurson";
    createCard.insertImageUrl(newSection, response[i].imageUrl);
    const newDiv1 = document.createElement("div");
    newSection.appendChild(newDiv1);
    newDiv1.className = "description_ourson";
    createCard.insertName(newDiv1, response[i].name);
    createCard.insertId(newDiv1, response[i]._id);
    createCard.insertColor(newDiv1);
    createCard.insertDescription(newDiv1, response[i].description);
    const newDiv3 = document.createElement("div");
    newSection.appendChild(newDiv3);
    newDiv3.className = "tarifs";
    createCard.insertPrice(
      newDiv3,
      [response[i].price].map((i) => i / 100) + " " + "€"
    );
    createCard.insertLienPerso(newDiv3, response[i]._id);
  }
}
