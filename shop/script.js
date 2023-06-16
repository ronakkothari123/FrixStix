function parseData2(products){
    products = products.products;

    for(let i = 0; i < products.length; i++){
        let newDiv = document.createElement("div");
        let imageDiv = document.createElement("div");
        let image = document.createElement("img");

        image.src = document.getElementById("prefix").textContent + products[i].image;
        imageDiv.appendChild(image);
        imageDiv.style.background = `linear-gradient(135deg, ${products[i].color1} 0%, ${products[i].color2} 100%)`;

        if(!products[i].stock){
            imageDiv.style.filter = "grayscale(1)";
        }

        let priceDiv = document.createElement("div");
        let price = document.createElement("h1");
        let add2CartBtn = document.createElement("button");
        let add2CartImg = document.createElement("img");

        price.innerHTML = "$" + products[i].price;

        if(products[i].stock){
            add2CartImg.src = document.getElementById("prefix").textContent + "icons/add_cart.svg";

            add2CartBtn.appendChild(add2CartImg);
            add2CartBtn.id = `cartbtn-${i}`
            add2CartBtn.addEventListener("click", function(e){
                addToCart(parseInt(this.id.split("-")[1]))
            });
        } else {
            add2CartImg.src = document.getElementById("prefix").textContent + "icons/sob.svg";
            add2CartBtn.appendChild(add2CartImg);
        }

        priceDiv.append(price, add2CartBtn);

        let newHeader = document.createElement("h1");
        newHeader.innerHTML = products[i].name;

        if(!products[i].description){
            if(products[i].stock){
                newDiv.append(imageDiv, newHeader, priceDiv);
            } else {
                let outOfStock = document.createElement("p");
                outOfStock.style.fontWeight = "700";
                outOfStock.innerHTML = "Out of Stock"
                newDiv.append(imageDiv, newHeader, outOfStock, priceDiv);
            }
        } else {
            let newDesc = document.createElement("p");
            newDesc.innerHTML = products[i].description;

            if(products[i].stock){
                newDiv.append(imageDiv, newHeader, newDesc, priceDiv);
            } else {
                let outOfStock = document.createElement("p");
                outOfStock.style.fontWeight = "700";
                outOfStock.innerHTML = "Out of Stock"
                newDiv.append(imageDiv, newHeader, newDesc, outOfStock, priceDiv);
            }
        }

        document.getElementById("products-main").appendChild(newDiv);
    }
}

function addToCart(num){
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.push(num);
    localStorage.setItem("cart", JSON.stringify(cart));
    initialize();

    if(document.getElementById("cart-modal").classList.contains("inactive-modal")){
        document.getElementById("cart-modal").classList.remove("inactive-modal")
    }
}

function initialize2(){
    fetch(`${document.getElementById("prefix").textContent}products.json`).then(function (response) {
        return response.json();
    }).then(function (data) {
        parseData2(data)
    }).catch(function (error) {
        console.log(`Error: ${error}`)
    })
}

initialize2();