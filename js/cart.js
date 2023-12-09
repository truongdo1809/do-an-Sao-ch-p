let totalPrice = 0;

const displayCart = () => {
  const cartContainer = document.querySelector("#cart-form");
  cartContainer.innerHTML = "";

  const products = JSON.parse(localStorage.getItem('products')) || [];

  products.forEach(product => {
    const productRow = document.createElement("tr");
    productRow.classList.add("cart-item");

    const formattedPrice = product.price.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND'
    });

    productRow.innerHTML += `
        <td class="product-name">${product.name}</td>
        <td class="product-sezi">${product.size}</td>
        <td class="cart-item-right">
            <span class="product-price">${formattedPrice}</span>
        </td>
        <td>
            <input class="quantity-product" type="number" value="${product.quantity}" min="1" max="61">
        </td>
        <td>
            <span class="total-price">${(product.price * product.quantity).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
        </td>
  <td> <i class="fa-solid fa-xmark delete-product"></i></td>

    `;
    cartContainer.appendChild(productRow);
    totalPrice += product.price * product.quantity;

    const quantityInput = productRow.querySelector(".quantity-product");
    quantityInput.addEventListener("input", function () {
      const newQuantity = parseInt(quantityInput.value);
      updateProductQuantity(product.id, newQuantity);
      displayCart();
    });
  });
};

const updateProductQuantity = (productId, newQuantity) => {
  const products = JSON.parse(localStorage.getItem('products')) || [];
  const productIndex = products.findIndex(product => product.id === productId);

  if (productIndex !== -1) {
    products[productIndex].quantity = newQuantity;
    localStorage.setItem('products', JSON.stringify(products));
  }
  updateTotal();
};

const updateTotal = () => {
  totalPrice = 0;
  const cartRows = document.querySelectorAll(".cart-item");
  cartRows.forEach((cartRow) => {
    const priceElement = cartRow.querySelector(".product-price");
    const quantityElement = cartRow.querySelector(".quantity-product");
    const price = parseFloat(priceElement.textContent);
    const quantity = parseInt(quantityElement.value);

    if (!isNaN(price) && !isNaN(quantity)) {
      totalPrice += price * quantity;
    }
  });

  const formattedTotalPrice = totalPrice.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  document.querySelector(".temporary-price").textContent = formattedTotalPrice;
  document.querySelector(".header-cart span").textContent = formattedTotalPrice;
};

displayCart();
updateTotal();