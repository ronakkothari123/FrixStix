const products = function (name, img, desc, price, calorieCount) {
    this.name = name;
    this.img = img;
    this.desc = desc;
    this.price = price;
    this.calCount = calorieCount;
}

document.getElementById("navbar-search").addEventListener("click", function (e) {
    if(document.getElementById("navbar-input").classList.contains("inactive-input")){
        document.getElementById("navbar-input").classList.remove("inactive-input");
        document.getElementById("navbar-input").focus();
    } else {
        document.getElementById("navbar-input").classList.add("inactive-input");
    }
});

function parseData(products) {
    console.log(products);
}

function initialize() {
    fetch("./products.json").then(function (response) {
        return response.json();
    }).then(function (data) {
        parseData(data)
    }).catch(function (error) {
        console.log(`Error: ${error}`)
    })
}

initialize();