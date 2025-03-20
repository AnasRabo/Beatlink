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


// Récupère les éléments du formulaire
const form = document.querySelector('form');
const email = document.getElementById('email');
const password = document.getElementById('password');
const buttons = document.querySelectorAll('button[type="submit"]');

// Fonction pour créer un message d'erreur
function createError(message) {
    const error = document.createElement('p'); // Crée un élément <p>
    error.innerText = message; // Ajoute le texte de l'erreur
    error.classList.add("error-message"); // Ajoute une classe pour pouvoir le supprimer après
    return error; // Retourne l'erreur
}

// Fonction pour supprimer les anciens messages d'erreur
function removeErrors() {
    document.querySelectorAll(".error-message").forEach(error => error.remove());
}

// Vérifie si l'email est valide (contient "@" et ".")
function isValidEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
}

// Vérifie si le mot de passe respecte les règles
function isValidPassword(password) {
    const hasUpperCase = /[A-Z]/.test(password); // Vérifie une majuscule
    const hasNumber = /[0-9]/.test(password); // Vérifie un chiffre
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password); // Vérifie un caractère spécial
    return hasUpperCase && hasNumber && hasSpecialChar;
}

// Fonction pour vérifier les champs
function checkForm(e) {
    e.preventDefault(); // Empêche l'envoi du formulaire

    removeErrors(); // Supprime les anciens messages d'erreur

    let isValid = true; // On suppose que le formulaire est valide

    // Vérifie si l'email est vide ou invalide
    if (email.value.trim() === '') {
        document.querySelector(".email").appendChild(createError("Ce champ est obligatoire !"));
        isValid = false;
    } else if (!isValidEmail(email.value.trim())) {
        document.querySelector(".email").appendChild(createError("Veuillez entrer un email valide !"));
        isValid = false;
    }

    // Vérifie si le mot de passe est vide ou ne respecte pas les règles
    if (password.value.trim() === '') {
        document.querySelector(".password").appendChild(createError("Ce champ est obligatoire !"));
        isValid = false;
    } else if (!isValidPassword(password.value.trim())) {
        document.querySelector(".password").appendChild(createError("Le mot de passe doit contenir :\n- Une majuscule\n- Un chiffre\n- Un caractère spécial"));
        isValid = false;
    }

    // Si tout est bon, on envoie le formulaire
    if (isValid) {
        form.submit();
    }
}

// Ajoute l'événement sur les boutons
buttons.forEach(button => {
    button.addEventListener("click", checkForm);
});
