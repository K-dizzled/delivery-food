const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

if(cartButton != null)
{
cartButton.addEventListener('click', function () {
    modal.classList.add("is-open");
});
close.addEventListener('click', function () {
    modal.classList.remove("is-open");
});
}
new WOW().init();