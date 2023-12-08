
let totalPrice = 0;
const displayCart = () => {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  products.forEach((product) => {
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
  document.querySelector(".header-cart span").textContent = formattedTotalPrice;
  document.querySelector(".header-cart2 strong").textContent = cartRows.length;
};
updateTotal();
