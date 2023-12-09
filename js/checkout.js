
let totalPrice = 0;
const displayCart = () => {
  const cartContainer = document.querySelector("#cart-form");
  HTML = ``;

  const products = JSON.parse(localStorage.getItem("products")) || [];

  products.forEach((product) => {
    const formattedPrice = product.price.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });

    HTML += `
    <tr class="cart-item">
  <td> <i class="fa-solid fa-xmark delete-product"></i></td>
    <td class="product-name">${product.name}</td>
     <td class="product-sezi">${product.size}</td>
     <td class="cart-item-right">
        <span class="product-price">
            ${formattedPrice}
        </span>
        </td>
        <td class="product-quantity"><input type="number" value="${
          product.quantity
        }" min="1" max="100"></td>
        
        <td class="total-price">${(
          product.price * product.quantity
        ).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</td>
        </tr>
        `;
    cartContainer.innerHTML = HTML;
    totalPrice += product.price * product.quantity;
  });
};
displayCart();
const updateTotal = () => {
  const cartRows = document.querySelectorAll(".cart-item");
  cartRows.forEach((cartRow) => {
    const priceElement = cartRow.querySelector(".product-price");
    const quantityElement = cartRow.querySelector(".product-quantity");
    const price = parseFloat(priceElement.textContent);
    const quantity = parseInt(quantityElement.value);

    if (!isNaN(price) && !isNaN(quantity)) {
      totalPrice += price;
    }
  });
  const formattedTotalPrice = totalPrice.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  document.querySelector(".pay-cart .total-price").textContent =
    formattedTotalPrice;
  document.querySelector(".pay-cart5 .total-price").textContent =
    formattedTotalPrice;
  document.querySelector(".quantity2-product").textContent = cartRows.length;
  document.querySelector(".header-cart span").textContent = formattedTotalPrice;
  document.querySelector(".header-cart2 strong").textContent = cartRows.length;
};
updateTotal();
