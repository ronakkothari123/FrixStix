document.getElementById("navbar-cart").addEventListener("click", function(e){
   if(document.getElementById("cart-modal").classList.contains("inactive-modal")){
       document.getElementById("cart-modal").classList.remove("inactive-modal")
   } else {
       document.getElementById("cart-modal").classList.add("inactive-modal")
   }
});

document.getElementById("navbar-search").addEventListener("click", function (e) {
    if(document.getElementById("navbar-input").classList.contains("inactive-input")){
        document.getElementById("navbar-input").classList.remove("inactive-input");
        document.getElementById("navbar-input").focus();
    } else {
        document.getElementById("navbar-input").classList.add("inactive-input");
    }
});

function parseData(products) {
    let cartItems;

    try{
        cartItems = JSON.parse(localStorage.getItem("cart"));

        if(cartItems == null){
            localStorage.setItem("cart", JSON.stringify([]));
            cartItems = JSON.parse(localStorage.getItem("cart"));
        }
    } catch (e){
        localStorage.setItem("cart", JSON.stringify([]));
        cartItems = JSON.parse(localStorage.getItem("cart"));
    }

    console.log(cartItems);

    if(cartItems.length > 0){
        document.getElementById("cart-browse").classList.add("inactive-modal");
        document.getElementById("cart-place-order").classList.remove("inactive-modal");
    } else {
        document.getElementById("cart-place-order").classList.add("inactive-modal");
        document.getElementById("cart-browse").classList.remove("inactive-modal");

        let newDiv = document.createElement("div");
        let newPara = document.createElement("p");

        newPara.innerHTML = "No Products Selected";
        newDiv.appendChild(newPara);
        newDiv.id = "cart-no-products";
        document.getElementById("cart-products").appendChild(newDiv);
    }

    let newCartItems = [];

    for(let i = 0; i < cartItems.length; i++){
        let found = false;

        for(let j = 0; j < newCartItems.length; j++){
            if(newCartItems[j][0] == cartItems[i]){
                found = true;
                newCartItems[j][1]++;
            }
        }

        if(!found) newCartItems.push([cartItems[i], 1])
    }

    cartItems = newCartItems;

    products = products.products;

    console.log(products)
    console.log(cartItems);

    let totalPrice = 0;

    for(let i = 0; i < cartItems.length; i++){
        let newDiv = document.createElement("div");
        let leftDiv = document.createElement("div");
        let rightDiv = document.createElement("div");

        let trash = document.createElement("img");
        let price = document.createElement("p");

        trash.src = "icons/trash.svg";
        trash.addEventListener("click", function(e){
            let originalCartItems = JSON.parse(localStorage.getItem("cart"));
            originalCartItems.splice(originalCartItems.indexOf(cartItems[i][0]), 1)
            localStorage.setItem("cart", JSON.stringify(originalCartItems));

            initialize();
        })

        price.innerHTML = "$" + products[cartItems[i][0]].price * cartItems[i][1];
        totalPrice += products[cartItems[i][0]].price * cartItems[i][1];

        let pictureDiv = document.createElement("div");
        let headerDiv = document.createElement("div");

        let img = document.createElement("img");
        let quantity = document.createElement("p");

        img.src = products[cartItems[i][0]].image;
        quantity.innerHTML = cartItems[i][1];

        let name = document.createElement("h1");
        name.innerHTML = products[cartItems[i][0]].name;
        if(products[cartItems[i][0]].description != null){
            let desc = document.createElement("p");
            desc.innerHTML = products[cartItems[i][0]].description;
            headerDiv.append(name, desc);
        } else headerDiv.append(name);

        pictureDiv.append(img, quantity);

        leftDiv.append(pictureDiv, headerDiv);
        rightDiv.append(trash, price);

        newDiv.append(leftDiv, rightDiv);

        document.getElementById("cart-products").appendChild(newDiv);
    }

    document.getElementById("cart-subtotal").innerHTML = "$" + totalPrice;
    document.getElementById("cart-shipping").innerHTML = "$" + Math.ceil(totalPrice * 8)/100;
    document.getElementById("cart-total-price").innerHTML = "$" + Math.ceil(totalPrice * 108)/100;
}

function initialize(){
    fetch("./products.json").then(function (response) {
        return response.json();
    }).then(function (data) {
        parseData(data)
    }).catch(function (error) {
        console.log(`Error: ${error}`)
    })
}

initialize();