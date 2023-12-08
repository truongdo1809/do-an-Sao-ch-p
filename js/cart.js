const webButtonEL = document.querySelector(".web-button");
const webIconEl = document.querySelector(".web-icon");

function scrollFunction() {
  if (window.scrollY > 300) {
    webButtonEL.classList.add("appear");
    webButtonEL.style.display = "block";
  } else {
    webButtonEL.classList.remove("appear");
  }
}

function scrollFunction2() {
  if (window.scrollY > 300) {
    webIconEl.style.display = "block";
  } else {
    webIconEl.style.display = "none";
  }
}
setTimeout(() => {
  scrollFunction2();
}, 10000);

window.addEventListener("scroll", scrollFunction);

function scrollToTop() {
  document.documentElement.scrollTop = 0;
}
webButtonEL.addEventListener("click", scrollToTop);

let totalPrice = 0;
const displayCart = () => {
  const cartContainer = document.querySelector("#cart-form");
  cartContainer.innerHTML = "";
  const products = JSON.parse(localStorage.getItem("products")) || [];
  products.forEach((product) => {
    const productRow = document.createElement("tr");
    productRow.classList.add("cart-item");

    const formattedPrice = product.price.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });

    productRow.innerHTML += `
    <td class="product-name">${product.name}</td>
    <td class="product-sezi">${product.size}</td>
    <td class="cart-item-right">
    <span class="product-price">${formattedPrice}</span>
    </td>
    <td>
    <input class="quantity-product" type="number" value="${
      product.quantity
    }" min="1" max="61">
            </td>
            <td>
            <span class="total-price">${(
              product.price * product.quantity
            ).toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}</span>
              </td>
              <i class="fa-solid fa-xmark delete-product"></i>
      
    `;
    cartContainer.appendChild(productRow);
    totalPrice += product.price * product.quantity;
  });
};

displayCart();
//total
const updateTotal = () => {
  const cartRows = document.querySelectorAll(".cart-item");
  cartRows.forEach((cartRow) => {
    const priceElement = cartRow.querySelector(".product-price");
    const quantityElement = cartRow.querySelector(".quantity-product");
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

  document.querySelector(".header-cart2 strong").textContent = cartRows.length;

  document.querySelector(".temporary-price").textContent = formattedTotalPrice;
  document.querySelector(".header-cart span").textContent = formattedTotalPrice;
};
updateTotal();
