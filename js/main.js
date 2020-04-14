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

const logo = document.querySelector("#logo");

logo.addEventListener('click', function () {
    delete localStorage.test;
    window.location="index.html";
});

// Your web app's Firebase configuration
var config = {
    apiKey: "AIzaSyB4sDpAnhz1qXxXgEbEatOQAEdoqLRjTYU",
    authDomain: "delivery-food-a6709.firebaseapp.com",
    databaseURL: "https://delivery-food-a6709.firebaseio.com",
    projectId: "delivery-food-a6709",
    storageBucket: "delivery-food-a6709.appspot.com",
    messagingSenderId: "504782829316",
    appId: "1:504782829316:web:70ff10eb033f6f394c4251",
    measurementId: "G-XT96DLH52D"
  };
  // Initialize Firebase
  firebase.initializeApp(config);

  var firestore = firebase.firestore();
  var storage = firebase.storage();
  var imageSrc;

  const restaurantList = document.querySelector("#restaurnt-list");


 firestore.collection("restaurants").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {

        const gsReference = firebase.storage().ref(doc.data().image);
        gsReference.getDownloadURL().then(function(url) {

         restaurantList.innerHTML += "<div class='card wow fadeInUp' id=" + doc.data().name + "> <img src=" + url + " alt='image' class='card-image' id=" + doc.data().name + "> <div class='card-text' id=" + doc.data().name + "><div class='card-heading' id=" + doc.data().name + "><h3 class='card-title' id=" + doc.data().name + ">" + doc.data().name + "</h3><span class='card-tag tag' id=" + doc.data().name + ">" + doc.data().time + "</span></div><div class='card-info' id=" + doc.data().name + "><div class='rating' id=" + doc.data().name + "><img src='img/rating.svg' alt='rating' id=" + doc.data().name + ">" + doc.data().rating + "</div><div class='price' id=" + doc.data().name + ">" + doc.data().price + "</div><div class='category' id=" + doc.data().name + ">" + doc.data().category + "</div></div></div></div>"
         
         }).catch(function(error) {
            // Handle any errors
          });
         
    });
});

const dishList = document.querySelector("#dish-list");

document.addEventListener( "click", someListener );

function someListener(event){
    
    var element = event.target;
    
    checkRest(element.id);

}

function checkRest(RestName) {
    const restaurantRef = firestore.collection("restaurants");
    restaurantRef.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            if(doc.data().name == RestName){
                localStorage.test = RestName;
                window.location="restaurant.html";
            }
        });
    });
    
}

const head = document.querySelector("#heading");
console.log(localStorage.test);

if(localStorage.test != null)
{
    loadDishes(localStorage.test)
}
else{
    if((window.location.pathname != "/index.html") && (head == null))
    {
        window.location="index.html";
    }
}
function loadDishes(restName) {

    const restaurantRef = firestore.collection("restaurants").doc(restName);

    const restaurantName = document.querySelector("#restaurant-name");
    const restaurantCategory = document.querySelector("#restaurant-category");
    const restaurantPrice = document.querySelector("#restaurant-price");
    const restaurantRating = document.querySelector("#restaurant-rating");
    const docRef = firestore.collection("restaurants").doc(restName);
    docRef.onSnapshot(function (doc) {
       if(doc && doc.exists){
          const myData = doc.data();
          restaurantPrice.innerText = myData.price;
          restaurantCategory.innerText = myData.category;
          restaurantRating.innerText = myData.rating;
          restaurantName.innerText = myData.name;
    }
    });
            
    restaurantRef.collection("food").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {

        const gsReference = firebase.storage().ref(doc.data().image);
        gsReference.getDownloadURL().then(function(url) {

         dishList.innerHTML += "<div class='card wow fadeInUp'><img src=" + url + " alt='image' class='card-image'><div class='card-text'><div class='card-heading'><h3 class='card-title card-title-reg'>" + doc.data().name + "</h3></div><div class='card-info'><div class='ingredients'>" + doc.data().ingredients + "</div></div><div class='card-buttons'><button class='button button-primary button-addToCart' id=" + doc.data().id + "><span class='button-card-text button-addToCart' id=" + doc.data().id + ">В корзину</span><img src='img/cart-white.svg' alt='Add to cart' class='button-card-image button-addToCart' id=" + doc.data().id + "></button><strong class='card-price-bold'>" + doc.data().price + "</strong></div></div></div>"
         
         }).catch(function(error) {
            // Handle any errors
          });
         
        });
    });
}


const placeOrder = document.querySelector("#place-order");
var lastPrice = document.querySelector("#last-price");
const close2 = document.querySelector("#close1");
var callMeMaybe = document.querySelector("#callMeMaybe");

if(placeOrder != null){
    placeOrder.addEventListener('click', function () {
        cart.classList.remove("is-open");
        cartList.innerHTML = "";
        modalOffer.classList.add("is-open");
        lastPrice.innerText = totalPrice + " ₽";
    });
    close2.addEventListener('click', function () {
        modalOffer.classList.remove("is-open");
    });
    callMeMaybe.addEventListener('click', function () {
        modalOffer.classList.remove("is-open");
        alert("Оператор перезвонит вам в течение 5 минут!");
        var inputVal = document.getElementById("input-phone").value;
        firestore.collection("orders").doc(inputVal).set({
            phone: inputVal,
            total: totalPrice + " ₽"

        }).then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });

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
    
            firestore.collection("orders").doc(inputVal).collection("dishes").doc(newProduct).set({
               product: newProduct,
               price: newPrice

        }).then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
        }
        }
    });
}


