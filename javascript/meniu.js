const productsData = [
  {
    name: "Omletă",
    category: "Mic dejun",
    price: 10,
    description: "Omletă pufoasă cu legume.",
    vegan: false,
    rapid: true,
    ieftin: true,
    image: "/Assets/omleta.jpg"
  },
  {
    name: "Salată vegană",
    category: "Prânz",
    price: 15,
    description: "Salată proaspătă",
    vegan: true,
    rapid: true,
    ieftin: true,
    image: "/Assets/salata.jpg"
  },
  {
    name: "Tort ciocolată",
    category: "Desert",
    price: 20,
    description: "Tort cu ciocolată.",
    vegan: false,
    rapid: false,
    ieftin: false,
    image: "/Assets/tort.jpg"
  }
];

const productsContainer = document.getElementById("products");

document.getElementById("search").addEventListener("input", renderProducts);
document.getElementById("vegan").addEventListener("change", renderProducts);
document.getElementById("rapid").addEventListener("change", renderProducts);
document.getElementById("ieftin").addEventListener("change", renderProducts);

function renderProducts() {
  const searchValue = document.getElementById("search").value.toLowerCase();
  const vegan = document.getElementById("vegan").checked;
  const rapid = document.getElementById("rapid").checked;
  const ieftin = document.getElementById("ieftin").checked;

  let filtered = productsData.filter(p => {
    if (vegan && !p.vegan) return false;
    if (rapid && !p.rapid) return false;
    if (ieftin && !p.ieftin) return false;
    if (!p.name.toLowerCase().includes(searchValue)) return false;
    return true;
  });

  productsContainer.textContent = "";

  filtered.forEach(prod => {
    const card = document.createElement("div");
    card.className = "card";

    const img = document.createElement("img");
    img.setAttribute("src", prod.image);
    img.setAttribute("alt", prod.name);
    card.appendChild(img);

    const h3 = document.createElement("h3");
    h3.textContent = prod.name;
    card.appendChild(h3);

    const pDesc = document.createElement("p");
    pDesc.textContent = prod.description;
    card.appendChild(pDesc);

    const pPrice = document.createElement("p");
    pPrice.textContent = `${prod.price} lei`;
    card.appendChild(pPrice);

    const btn = document.createElement("button");
    btn.textContent = "Adaugă în coș";
    btn.addEventListener("click", () => addToCart(prod));
    card.appendChild(btn);

    productsContainer.appendChild(card);
  });
}
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  console.log("Cart after:", JSON.parse(localStorage.getItem("cart")));

  const existing = cart.find(item => item.name === product.name);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      name: product.name,
      price: product.price,
      quantity: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${product.name} a fost adăugat în coș!`);
}

document.getElementById("cartBtn").addEventListener("click", goToCheckout);

function goToCheckout() {
  window.location.href = "/html/checkout.html";
}

renderProducts();