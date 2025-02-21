let displayPrice=document.getElementById("displayPrice");
let BitcoinPrice;
async function getBitcoinPrice() {
    try {
        const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd");
        if (!response.ok) {
            throw new Error(`error: ${response.status}`);
        }
        const data = await response.json();
        console.log("Bitcoin Price:",data.bitcoin.usd);
        BitcoinPrice =data.bitcoin.usd;
    } catch (error) {
        console.error("Error fetching Bitcoin price:", error);
    }
}

//getBitcoinPrice();
setInterval(function(){
    getBitcoinPrice();
    displayPrice.innerHTML=`${BitcoinPrice} $`;
},1000)