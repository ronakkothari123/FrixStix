document.getElementById("navbar-cart").addEventListener("click", function(e){
   if(document.getElementById("cart-modal").classList.contains("inactive-modal")){
       document.getElementById("cart-modal").classList.remove("inactive-modal")
   } else {
       document.getElementById("cart-modal").classList.add("inactive-modal")
   }
});