// Création de la fonction editNav
function editNav() {
    //Création d'une variable x
    //qui correspond à l'id myTopnav soit la barre haute de l'entête
    var x = document.getElementById("myTopnav");

    //Si la propriété className de cet élément
    //correspond en valeur et en nature à topnav
    if (x.className === "topnav") {

        //alors ajouter responsive au nom de la classe
        x.className += " responsive";

        //sinon,
    } else {
        x.className = "topnav";
    }
}
// DOM Elements

// Création d'une constante modalbg correspond à bground la div qui contient le formulaire d'inscription
const modalbg = document.querySelector(".bground");

// Création d'une constante modalBody correspond à la div avec classe modal-body contenu dans bground
const modalBody = document.querySelector(".modal-body");

// Création d'une constante formulaire correspond au form
const formulaire = document.querySelector("#reserve");

//Création d'une variable ayant pour id confirmation-message
var confirmationMessage = document.querySelector("#confirmation-message");

//Création d'une constante querySelector correspond au bouton je m'inscris
const querySelector = document.querySelector(".modal-btn");

//Ouverture de la modale 

//Ajout de de la méthode forEach sur le bouton je m'inscris, pour chaque click sur le btn, on lance la fonction launchModal
querySelector.addEventListener("click", launchModal);

//Fonction launchModal display du div contenant le form à block
function launchModal() {
    modalbg.style.display = "block";
}
//Fermeture de la modale 

//Création d'une constante closeButton correspond à la croix dessinée dans le css
const closequerySelector = document.querySelector(".close");

//Ajout de la méthode forEach sur l'élément closequerySelector pour chaque click sur le close, on lance la fonction anonyme : closeModal passe à false
closequerySelector.addEventListener("click", function () {
    closeModal(false) // on ne ferme pas le formulaire car il n' a pas été validé
});

//Création variable closeButton : sélectionne le bouton fermer après la validation du form
var closeButton = document.querySelector(".close-button");

// Retire le bouton fermer du formulaire
closeButton.remove();

//Fonction closeModal avec le paramètre reset
function closeModal(reset) {
    //passage du display block à none
    modalbg.style.display = "none";

    //On vide le modal body
    modalBody.innerHTML = "";

    
    // on ne vide le formulaire que s'il est valide
    if (reset) {
        formulaire.reset();
    }

    //On ajoute à la modalBody le formulaire
    modalBody.appendChild(formulaire);

    //On donne une marginTop de 0 à la modalBody
    modalBody.style.marginTop = "0";
}

//Fonction validate appelée lors du clic du bouton je m'inscris dans le form
function validate() {
    var first = formulaire.elements.first.value;
    var last = formulaire.elements.last.value;
    var email = formulaire.elements.email.value;
    var birthdate = formulaire.elements.birthdate.value;
    var quantity = formulaire.elements.quantity.value;
    var location = formulaire.elements.location;
    var conditions = formulaire.elements.conditions.checked;


    // 1/ Vérification de la longueur minimale du nom entré de l'input first / prénom
    const firstName = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/;
    if (!firstName.test(first)) {
        document.getElementById("first-error-message").innerHTML = "Veuillez entrer un prénom valide.";
        return false;
    } else if (first.trim() === "") {
        document.getElementById("first-error-message").innerHTML = "Ce champ ne peut pas être vide.";
        return false;
    } else if (first.length < 2) {
        document.getElementById("first-error-message").innerHTML = "Veuillez entrer 2 caractères ou plus pour le champ du prénom.";
        return false;
    } else {
        document.getElementById("first-error-message").innerHTML = "";
    }

    // 2/ Vérification de la longueur minimale du nom entré de l'input last / prénom
    const lastName = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/;
    if (!lastName.test(last)) {
        document.getElementById("last-error-message").innerHTML = "Veuillez entrer un nom valide.";
        return false;
    } else if (last.trim() === "") {
        document.getElementById("last-error-message").innerHTML = "Ce champ ne peut pas être vide.";
        return false;
    } else if (last.length < 2) {
        document.getElementById("last-error-message").innerHTML = "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
        return false;
    } else {
        document.getElementById("last-error-message").innerHTML = "";
    }

    // 3/ Vérification de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById("email-error-message").innerHTML = "Veuillez entrer un email valide.";
        return false;
    } else {
        document.getElementById("email-error-message").innerHTML = "";
    }

    // 4/ Vérification du champs birthdate
    if (isNaN(Date.parse(birthdate))) {
        document.getElementById("birthdate-error-message").innerHTML = "Vous devez entrer votre date de naissance.";
        return false;
    } else {
        document.getElementById("birthdate-error-message").innerHTML = "";
    }

    // 5/ Vérification de la quantité de tournois joués
    if (quantity === '') {
        document.getElementById("quantity-error-message").innerHTML = "Vous devez saisir une valeur numérique.";
        return false;
    } else {
        document.getElementById("quantity-error-message").innerHTML = "";

    }

    // 6/ Vérification du nombre de case cochée minimum pour la location
    var locationChecked = false;
    for (var i = 0; i < location.length; i++) {
        if (location[i].checked) {
            locationChecked = true;
            break;
        }
    }
    if (!locationChecked) {
        document.getElementById("location-error-message").innerHTML = "Vous devez choisir une option.";
        return false;
    } else {
        document.getElementById("location-error-message").innerHTML = "";
    }

    // 7/ Vérification que la case conditions est checkée
    if (!conditions) {
        document.getElementById("conditions-error-message").innerHTML = "Vous devez vérifier que vous acceptez les termes et conditions.";
        return false;
    } else {
        document.getElementById("conditions-error-message").innerHTML = "";
    }

    // Le formulaire est valide
    //Création du message de confirmation

    // On vide modalBody
    modalBody.innerHTML = "";

    //On lui ajoute un margin-top de 200px
    modalBody.style.marginTop = "200px";

    //On ajoute au modalBody le message de confirmation
    modalBody.appendChild(confirmationMessage);

    //On modifie le contenu de conformationMessage
    confirmationMessage.innerText = "Merci pour \n votre inscription";

    //On ajoute au modalBody le bouton fermer
    modalBody.appendChild(closeButton);

    // Lorsqu'on clique sur ce bouton, on fait passer closeModal à true, ce qui videra le formulaire
    closeButton.addEventListener("click", function () {
        closeModal(true)
    });

    //On ajoute au bouton fermer une marginTop de 200px
    closeButton.style.marginTop = "200px";

    //On retourne true pour le formulaire
    return true;

}
