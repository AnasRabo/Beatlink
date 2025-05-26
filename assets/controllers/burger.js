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