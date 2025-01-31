//FORMULAIRE

//Elements du DOM - Récupération des champs
const first = document.getElementById("first");
const last = document.getElementById("last");
const email = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const quantity = document.getElementById("quantity");
const radios = document.getElementsByClassName("radio");
const cgu = document.getElementById("checkbox1");
const form = document.getElementById("form");

// Regex
const regexSupTwo = new RegExp("^[a-zA-Z-]{2,}$");
const regexEmail = new RegExp("^[a-z0-9.-_]{2,}@[a-z]{2,}\\.[a-z]{2,4}$");
// De 1900 à 2012
const regexBirthdate = new RegExp(
  "^((19[0-9]{2})|20((0[0-9])|1[0-2]))\\-(0([0-9])|(1[0-2]))\\-(([0-2][0-9])|3[0-1])"
);

// Vérification de chaque input

// Champ prénom
function firstnameValidate() {
  if (first.value != "" && regexSupTwo.test(first.value)) {
    deleteErrorMessage(first);
    deleteErrorInput(first);
    return true;
  } else {
    errorMessage(items.firstname, first);
    errorInput(first);
    return false;
  }
}

// Champ nom de famille
function lastnameValidate() {
  if (last.value != "" && regexSupTwo.test(last.value)) {
    deleteErrorMessage(last);
    deleteErrorInput(last);
    return true;
  } else {
    errorMessage(items.name, last);
    errorInput(last);
    return false;
  }
}

//Champ email
function emailValidate() {
  if (email.value != "" && regexEmail.test(email.value)) {
    deleteErrorMessage(email);
    deleteErrorInput(email);
    return true;
  } else {
    errorMessage(items.email, email);
    errorInput(email);
    return false;
  }
}

// Champ date d'anniversaire
function birthdateValidate() {
  if (birthdate.value != "" && regexBirthdate.test(birthdate.value)) {
    deleteErrorMessage(birthdate);
    deleteErrorInput(birthdate);
    return true;
  } else {
    errorMessage(items.birthdate, birthdate);
    errorInput(birthdate);
    return false;
  }
}

// Champ quantité de tournois effectuée
function quantityValidate() {
  if (quantity.value != "") {
    deleteErrorMessage(quantity);
    deleteErrorInput(quantity);
    return true;
  } else {
    errorMessage(items.quantity, quantity);
    errorInput(quantity);
    return false;
  }
}

// Champ des CGU
function cguValidate() {
  if (cgu.checked) {
    deleteErrorMessageCgu();
    deleteErrorCheckbox();
    return true;
  } else {
    errorMessageCgu(items.cgu);
    errorCheckbox();
    return false;
  }
}

// Champ du choix du tournois
function radiosValidate() {
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      return true;
    }
  }
  return false;
}

// Objets contenant les messages d'erreurs
const items = {
  firstname: "Veuillez entrer un prénom avec au moins 2 lettres",
  name: "Veuillez entrer un nom avec au moins 2 lettres",
  email: "Veuillez entrer une adresse mail valide",
  birthdate: "Veuillez entrer une date d'anniversaire",
  quantity: "Veuillez entrer un nombre compris entre 1 et 99",
  radios: "Veuillez choisir un tournoi",
  cgu: "Veuillez lire et accepter les conditions d'utilisation",
};

//Fonction créant un message d'erreur s'il n'y en a pas
function errorMessage(items, where) {
  if (!where.parentNode.querySelector(".red")) {
    const error = document.createElement("div");
    error.setAttribute("class", "red");
    error.innerHTML = items;
    where.parentNode.appendChild(error);
  }
}

// Fonction enlevant le message d'erreur
function deleteErrorMessage(where) {
  if (where.parentNode.querySelector(".red")) {
    const whereMessageParent = where.parentNode;
    const whereMessageChild = where.parentNode.querySelector(".red");
    whereMessageParent.removeChild(whereMessageChild);
  }
}

// Fonction créant un message d'erreur s'il n'y en a pas pour les cgu
function errorMessageCgu(items) {
  const cgu = document.querySelector(".checkbox2-label");
  if (!cgu.querySelector(".redCgu")) {
    const error = document.createElement("div");
    error.setAttribute("class", "redCgu");
    error.innerHTML = items;
    const cguCheckbox = document.querySelector("label.checkbox2-label");
    cguCheckbox.appendChild(error);
  }
}

// Fonction enlevant le message d'erreur pour les cgu
function deleteErrorMessageCgu() {
  const cgu = document.querySelector(".checkbox2-label");
  if (cgu.querySelector(".redCgu")) {
    const cguCheckboxChild = document.querySelector(".redCgu");
    const cguCheckboxParent = cguCheckboxChild.parentNode;
    cguCheckboxParent.removeChild(cguCheckboxChild);
  }
}

// Fonction créant une bordure rouge en cas d'erreur
function errorInput(where) {
  if (!where.querySelector(".borderRed")) {
    where.setAttribute("class", "text-control borderRed");
  }
}

// Fonction créant une bordure rouge en cas d'erreur pour les CGU
function errorCheckbox() {
  const cgu = document.querySelector(".checkbox2-label");
  if (!cgu.querySelector(".checkbox--borderRed"))
    cgu.setAttribute("class", "checkbox2-label checkbox--borderRed");
}

// Fonction retirant la bordure rouge
function deleteErrorInput(where) {
  where.setAttribute("class", "text-control");
}

// Fonction retirant la bordure rouge pour les CGU
function deleteErrorCheckbox() {
  const cgu = document.querySelector(".checkbox2-label");
  cgu.setAttribute("class", "checkbox2-label");
}

// Fonction pour afficher les erreurs
function errorApply() {
  firstnameValidate();
  lastnameValidate();
  emailValidate();
  birthdateValidate();
  quantityValidate();
  cguValidate();
  radiosValidate();
}

// Fonction pour valider tous les champs
function validateForm() {
  if (
    firstnameValidate() &&
    lastnameValidate() &&
    emailValidate() &&
    birthdateValidate() &&
    quantityValidate() &&
    cguValidate() &&
    radiosValidate()
  ) {
    return true;
  } else {
    return false;
  }
}

//VALIDATION DU FORMULAIRE

form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Tests de tous les champs
  if (validateForm()) {
    // Si tous les champs sont validés
    //Fermeture de la modale
    closeModal();
    // Affichage des remerciements
    thanks();
    return true;
  } else {
    // Afficher les erreurs
    errorApply();
  }
});

// REMERCIEMENTS

// Element du DOM
const thanksBtn = document.getElementById("thanksBtn");
const thanksContent = document.getElementById("thanks");
const closeThanksBtn = document.getElementById("closeThanks");

// Fonction de lancement du message de remerciement
function thanks() {
  thanksContent.setAttribute("class", "thanksbground display-block");
}

//Fermeture du message de remerciement avec le bouton fermer
thanksBtn.addEventListener("click", function () {
  thanksContent.setAttribute("class", "thanksbground display-none");
});

// Fermeture au click qui ferme les remerciements  avec la croix
closeThanksBtn.addEventListener("click", function () {
  thanksContent.setAttribute("class", "thanksbground display-none");
});
