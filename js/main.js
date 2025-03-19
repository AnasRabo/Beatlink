document.addEventListener("DOMContentLoaded", function () {
    const menuBurger = document.querySelector(".menu-burger");

    menuBurger.addEventListener("click", function () {
        this.classList.toggle("active");
    });
});