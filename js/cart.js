$(document).ready(function () {
  checkCartEmpty();
  function checkCartEmpty() {
    if ($("#cart-form").is(":empty")) {
      $(".cart-product").hide();
      // $(".cart-sidebar").hide();
      $(".cart-product").after(
        '<p class="cart-message">Chưa có sản phẩm nào trong giỏ hàng!</p>'
      );
    }
  }
});
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
  <td> <i class="fa-solid fa-xmark delete-product"></i></td>
    `;
    cartContainer.appendChild(productRow);
    totalPrice += product.price * product.quantity;
    //  cập nhật lại giá tiền và tổng tiền khi người dùng tăng giảm số lượng
    const quantityInput = productRow.querySelector(".quantity-product");
    quantityInput.addEventListener("input", function () {
      const newQuantity = parseInt(quantityInput.value);
      updateProductQuantity(product.id, newQuantity);
      displayCart();
    });
  });
};
const updateProductQuantity = (productId, newQuantity) => {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const productIndex = products.findIndex(
    (product) => product.id === productId
  );
  if (productIndex !== -1) {
    products[productIndex].quantity = newQuantity;
    localStorage.setItem("products", JSON.stringify(products));
  }
  updateTotal();
};
//   cập nhật tổng tiền sản phẩm
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
  document.querySelector(".temporary-price").textContent = formattedTotalPrice;
  document.querySelector(".header-cart span").textContent = formattedTotalPrice;
  document.querySelector(".header-cart2 strong").textContent = products.length;

};
displayCart();
updateTotal();

// xóa sản phẩm
const deleteProduct = (index) => {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  if (index >= 0 && index < products.length) {
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
  }
};
const cartContainer = document.querySelector("#cart-form");
cartContainer.addEventListener("click", function (event) {
  const deleteIcon = event.target.closest("i.delete-product");
  if (deleteIcon) {
    const productRow = deleteIcon.closest(".cart-item");
    const index = Array.from(cartContainer.children).indexOf(productRow);
    if (confirm("Bạn có muốn xóa sản phẩm này?")) {
      deleteProduct(index);
      displayCart();
      updateTotal();
      location.reload();
    }
  }
});


