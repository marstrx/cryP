const home =document.getElementById("homee");
const about =document.getElementById("aboutt");


homee.addEventListener("click",function(e){
    e.preventDefault();
    window.location.href="index.html";
})
about.addEventListener("click",function(e){
    e.preventDefault();
    window.location.href="about.html";
})

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const loader = document.getElementsByClassName("loader")[0];

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

document.addEventListener("click", (e) => {
  if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
    navLinks.classList.remove("active");
  }
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

const colors = [
  "#6c5ce7",
  "#a66efa",
  "#00ff88",
  "#ff6b6b",
  "#f0932b",
  "#ebcf34",
  "#4eb7f5",
];

async function fetchData() {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=1000&page=1&sparkline=false"
    );
    const data = await response.json();

    const cryptoGrid = document.getElementById("cryptoGrid");
    cryptoGrid.innerHTML = data
      .map(
        (coin) => `
                    <div class="crypto-card" style="border-color: ${
                      colors[Math.floor(Math.random() * colors.length)]
                    }">
                        <div class="crypto-header">
                            <img src="${coin.image}" class="crypto-icon" alt="${
          coin.name
        }">
                            <div>
                                <h3>${coin.name}</h3>
                                <span>${coin.symbol.toUpperCase()}</span>
                            </div>
                        </div>
                        <div class="price">$${coin.current_price.toLocaleString()}</div>
                        <div class="market-cap">$${(
                          coin.market_cap / 1000000000
                        ).toFixed(1)}B</div>
                    </div>
                `
      )
      .join("");
  } catch (error) {
    console.error("Error:", error);
    loader.style.display="flex";
  }
}

fetchData();
setInterval(fetchData, 120000);
