
document.addEventListener( "click", someListener );
var cartCounter = document.querySelector("#cart-counter");
var cartCounter1 = document.querySelector("#cart-counter1");

function someListener(event){
    
    var element = event.target;
    
   if(element.className == "button button-primary button-addToCart" || element.className == "button-card-text button-addToCart" || element.className == "button-card-image button-addToCart"){
    
    if(sessionStorage['amountDishes'] != null){
       sessionStorage.setItem('amountDishes', parseInt(sessionStorage['amountDishes'])+1);
       }
       else{
        sessionStorage.setItem('amountDishes', 1);
       }   

       if(sessionStorage['counterCart'] != null){
        sessionStorage.setItem('counterCart', parseInt(sessionStorage['counterCart'])+1);
        cartCounter.innerText = sessionStorage['counterCart'];
        cartCounter1.innerText = sessionStorage['counterCart'];
        }
        else{
         sessionStorage.setItem('counterCart', 1);
         cartCounter.innerText = sessionStorage['counterCart'];
         cartCounter1.innerText = sessionStorage['counterCart'];
        }  

    sessionStorage.setItem(sessionStorage['amountDishes'], element.id);
    element.closest("button[title]").classList.add('animateaddtoCart');

    console.log(element.closest("button[title]"));

   setTimeout(removeAnim, 100, element.closest("button[title]"));
   }

   if(element.className == "counter-button delete") {
    delete sessionStorage[element.id];
    cartList.innerHTML = "";
    renewCart();
    sessionStorage.setItem('counterCart', parseInt(sessionStorage['counterCart'])-1);
    cartCounter.innerText = sessionStorage['counterCart'];
    cartCounter1.innerText = sessionStorage['counterCart'];
   }
   
}

function removeAnim(element){
    element.classList.remove('animateaddtoCart');
}

if(sessionStorage['counterCart'] != null){
    cartCounter.innerText = sessionStorage['counterCart'];
    cartCounter1.innerText = sessionStorage['counterCart'];
    }

var totalprice = document.querySelector("#total-price");
var totalPrice = Number(0);
function renewCart() {
    totalPrice = Number(0);
    for(let i = 1; i < parseInt(sessionStorage['amountDishes'] + 1); i++){
        if(sessionStorage[i] != null){
        var str = sessionStorage[i];
        var newProduct = "";
        var newPrice = "";
        for(let j=0; j < str.indexOf('*'); j++){
            if(str[j] != '-'){
                newProduct = newProduct + str.charAt(j);
            }
            else{
                newProduct = newProduct + ' ';
            }
        }
        newPrice += str.slice(str.indexOf('*') + 1);

        console.log(newProduct);
        console.log(newPrice);

        cartList.innerHTML += "<div class='food-row'><span class='food-name'>" + newProduct + "</span><strong class='food-price'>" + newPrice + "</strong><div class='food-counter'><button class='counter-button delete' id = " + i + ">-</button></div>"
        totalPrice += parseInt(newPrice);
    }
    }
    console.log(totalPrice);
    totalprice.innerText = totalPrice + " €";
}

const buttonCart = document.querySelector("#cart-button");
const modalOffer = document.querySelector(".modalOffer");

const cart = document.querySelector(".modal");
const close1 = document.querySelector(".close");
const cancel = document.querySelector(".cancel");
const cartList = document.querySelector("#cart-list");

if(buttonCart != null)
{
buttonCart.addEventListener('click', function () {
    cart.classList.add("is-open");
    renewCart();
});
close1.addEventListener('click', function () {
    cart.classList.remove("is-open");
    cartList.innerHTML = "";
});
cancel.addEventListener('click', function () {
    cart.classList.remove("is-open");
    cartList.innerHTML = "";
});
}

