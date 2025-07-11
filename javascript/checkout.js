document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.querySelector("#cartTable tbody");
  const grandTotalElem = document.getElementById("grandTotal");
  

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let grandTotal = 0;

  cart.forEach(item => {
    const tr = document.createElement("tr");

    const nameTd = document.createElement("td");
    nameTd.textContent = item.name;

    const priceTd = document.createElement("td");
    priceTd.textContent = `${item.price.toFixed(2)} lei`;

    const quantityTd = document.createElement("td");
    quantityTd.textContent = item.quantity;

    const totalTd = document.createElement("td");
    const total = item.price * item.quantity;
    totalTd.textContent = `${total.toFixed(2)} lei`;

    tr.appendChild(nameTd);
    tr.appendChild(priceTd);
    tr.appendChild(quantityTd);
    tr.appendChild(totalTd);

    tableBody.appendChild(tr);

    grandTotal += total;
  });

  grandTotalElem.textContent = `${grandTotal.toFixed(2)} lei`;

  const checkoutBtn = document.getElementById("checkoutBtn");
  checkoutBtn.addEventListener("click", () => {
    alert("Comanda ta a fost trimisă!");
    localStorage.removeItem("cart");
    window.location.href = "/html/checkout.html";
  });
});