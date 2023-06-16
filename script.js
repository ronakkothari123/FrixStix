window.onload = function(){
    const bestSelling = [0, 1, 5];

    fetch(`${document.getElementById("prefix").textContent}products.json`).then(function (response) {
        return response.json();
    }).then(function (data) {
        for(let i = 0; i < bestSelling.length; i++){
            let newDiv = document.createElement("div");
            let newImage = document.createElement("img");
            let newHeader = document.createElement("h1");
            let newDesc = document.createElement("h2");
            let newPrice = document.createElement("h3");
            let newTagline = document.createElement("p");

            newImage.src = document.getElementById("prefix").textContent + data.products[bestSelling[i]].image

            newHeader.innerHTML = data.products[bestSelling[i]].name;
            newDesc.innerHTML = data.products[bestSelling[i]].description;
            newPrice.innerHTML = `$${data.products[bestSelling[i]].price}`;
            newTagline.innerHTML = data.products[bestSelling[i]].tagline;

            if(data.products[bestSelling[i]].description === undefined){
                newDiv.append(newImage, newHeader, newPrice, newTagline);
            } else{
                newDiv.append(newImage, newHeader, newDesc, newPrice, newTagline);
            }

            document.getElementById("best-selling-container").appendChild(newDiv);
        }
    }).catch(function (error) {
        console.log(`Error: ${error}`)
    })
}