document.addEventListener('DOMContentLoaded', () => {
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
        if (!input) return; // Protection si l'input n'existe pas
        if (input.value.trim() === '') {
          addError(input, "Ce champ est obligatoire !");
          isValid = false;
        } else if (!check(input.value.trim())) {
          addError(input, errorMessage);
          isValid = false;
        }
        input.style.color = "red"; // Change la couleur du texte en rouge
      });
  
      if (isValid && form) form.submit();
    }
  
    // Ajout de l'événement sur les boutons submit
    if (buttons.length > 0) {
      buttons.forEach(button => {
        button.addEventListener("click", checkForm);
      });
    }
  
    // Gestion upload photo
    const fileInput = document.getElementById("fileInput");
    const preview = document.getElementById("preview");
    const label = document.querySelector(".upload-label");
    const photoContainer = document.querySelector(".professional-photo");
  
    if (fileInput && preview && label && photoContainer) {
      fileInput.addEventListener("change", function (event) {
        const file = event.target.files[0];
  
        if (file) {
          const reader = new FileReader();
          reader.onload = function (e) {
            preview.src = e.target.result;
            preview.style.display = "block"; // Affiche l’image
            label.style.pointerEvents = "none"; // Désactive l'interaction
          };
          reader.readAsDataURL(file);
        }
      });
  
      photoContainer.addEventListener("mouseenter", function () {
        label.style.opacity = "1";
        if (!preview.src || preview.style.display === "none") {
          label.style.pointerEvents = "auto"; // Active l'interaction
        }
      });
  
      photoContainer.addEventListener("mouseleave", function () {
        if (preview.src && preview.style.display !== "none") {
          label.style.opacity = "0"; // Cache si une image est présente
          label.style.pointerEvents = "none"; // Désactive l'interaction
        }
      });
  
      photoContainer.addEventListener("click", function () {
        fileInput.click();
      });
    } else {
      console.log("Les éléments liés au téléchargement de photo ne sont pas présents sur cette page.");
    }
  
    // Redirection au Enter dans le formulaire de #section_1 (si formulaire existe)
    const formInSection1 = document.querySelector('#section_1 form');
    if (formInSection1) {
      formInSection1.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          e.preventDefault(); // bloque l'envoi classique
          window.location.href = 'description'; // redirige
        }
      });
    }
  });
  