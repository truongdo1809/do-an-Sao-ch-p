let totalPrice = 0;
const displayCart = () => {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  products.forEach((product) => {
    totalPrice += product.price * product.quantity;
    document.querySelector(".header-cart2 strong").textContent =
      products.length;
  });
};
displayCart();
//total
const updateTotal = () => {
  totalPrice = 0;
  const products = JSON.parse(localStorage.getItem("products")) || [];
  products.forEach((product) => {
    const price = product.price;
    const quantity = product.quantity;
    if (!isNaN(price) && !isNaN(quantity)) {
      totalPrice += price * quantity;
    }
  });
  const formattedTotalPrice = totalPrice.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  document.querySelector(".header-cart span").textContent = formattedTotalPrice;
};
updateTotal();
