const products = function(name, img, desc, price, calorieCount){
    this.name = name;
    this.img = img;
    this.desc = desc;
    this.price = price;
    this.calCount = calorieCount;
}

function parseData(products){
    console.log(products);
}

function initialize(){
    fetch("./products.json").then(function(response){return response.json();}).then(function(data){parseData(data)}).catch(function(error){console.log(`Error: ${error}`)})
}

initialize();