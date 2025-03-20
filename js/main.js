/// animer les li 
document.addEventListener("DOMContentLoaded", function () {
    const menuBurger = document.querySelector(".menu-burger");

    if (menuBurger) { // Vérifie que l'élément existe avant d'ajouter l'écouteur
        menuBurger.addEventListener("click", function () {
            this.classList.toggle("active");
        });
    }
});
/// animer la nav-menu
const menuHamburger = document.querySelector(".menu-burger")
const navLinks = document.querySelector(".navbar")

menuHamburger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-menu')
})

/////////// verif formulaire ///////////


// Sélection des éléments du formulaire
const form = document.querySelector('form');
const inputs = {
    nom: document.getElementById('nom'),
    prenom: document.getElementById('prénom'),
    email: document.getElementById('email'),
    password: document.getElementById('password'),
};
const buttons = document.querySelectorAll('button[type="submit"]');

// Fonction pour supprimer l'erreur d'un champ spécifique
function removeError(input) {
    const error = input.nextElementSibling; // Cherche l'erreur après l'input
    if (error && error.classList.contains("error-message")) {
        error.remove(); // Supprime l'erreur si elle existe
    }
}

// Fonction pour ajouter un message d'erreur sous l'input
function addError(input, message) {
    removeError(input); // Supprime l'erreur précédente
    const error = document.createElement('p');
    error.innerText = message;
    error.classList.add("error-message");

    input.insertAdjacentElement('afterend', error); // Insère l'erreur après l'input
}

// Vérifie si un nom ou prénom est valide
function isValidName(name) {
    const namePattern = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{2,}$/;
    return namePattern.test(name);
}

// Vérifie si l'email est valide
function isValidEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
}

// Vérifie si le mot de passe respecte les critères
function isValidPassword(password) {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return hasUpperCase && hasNumber && hasSpecialChar;
}

// Fonction de validation globale
function checkForm(e) {
    e.preventDefault();
    let isValid = true;

    const fields = [
        { input: inputs.nom, check: isValidName, errorMessage: "Veuillez entrer un nom valide !" },
        { input: inputs.prenom, check: isValidName, errorMessage: "Veuillez entrer un prénom valide !" },
        { input: inputs.email, check: isValidEmail, errorMessage: "Veuillez entrer un email valide !" },
        { input: inputs.password, check: isValidPassword, errorMessage: "Le mot de passe doit contenir :\n- Une majuscule\n- Un chiffre\n- Un caractère spécial" }
    ];

    // Vérification de chaque champ
    fields.forEach(({ input, check, errorMessage }) => {
        if (input.value.trim() === '') {
            addError(input, "Ce champ est obligatoire !");
            isValid = false;
        } else if (!check(input.value.trim())) {
            addError(input, errorMessage);
            isValid = false;
        }
    });

    if (isValid) form.submit();
}

// Ajout de l'événement sur les boutons
buttons.forEach(button => {
    button.addEventListener("click", checkForm);
});
