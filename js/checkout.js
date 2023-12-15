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
  <td> </td>
    <td class="product-name">${product.name}</td>
     <td class="product-sezi">${product.size}</td>
     <td class="cart-item-right">
        <span class="product-price">
            ${formattedPrice}
        </span>
        </td>
        <td class="product-quantity"><span>${product.quantity}</span></td>
        
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

// cập nhật tổng tiến của sản phẩm
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
  document.querySelector(".pay-cart .total-price").textContent =
    formattedTotalPrice;
  document.querySelector(".pay-cart5 .total-price").textContent =
    formattedTotalPrice;
  document.querySelector(".quantity2-product").textContent = products.length;
  document.querySelector(".header-cart span").textContent = formattedTotalPrice;
  document.querySelector(".header-cart2 strong").textContent = products.length;
};
updateTotal();

// xóa sản phẩm
// const deleteProduct = (index) => {
//   const products = JSON.parse(localStorage.getItem("products")) || [];
//   if (index >= 0 && index < products.length) {
//     products.splice(index, 1);
//     localStorage.setItem("products", JSON.stringify(products));
//   }
// };
// const cartContainer = document.querySelector("#cart-form");
// cartContainer.addEventListener("click", function (event) {
//   const deleteIcon = event.target.closest("i.delete-product");
//   if (deleteIcon) {
//     const productRow = deleteIcon.closest(".cart-item");
//     const index = Array.from(cartContainer.children).indexOf(productRow);
//     if (confirm("Bạn có muốn xóa sản phẩm này?")) {
//       deleteProduct(index);
//       displayCart();
//       updateTotal();
//       location.reload();
//     }
//     const products = JSON.parse(localStorage.getItem("products")) || [];
//     if (products.length === 0) {
//       alert("giỏ hàng trống xin mời bạn tiếp tục mua sắm");
//       window.location.href = "./index.html";
//     }
//   }
// });

//  sự kiện người dùng ấn vào nút thanh toán
function deleteAllProducts() {
  localStorage.removeItem("products");
}
function displaySuccessMessage() {
  alert("Bạn đã thanh toán thành công! mời bạn tiếp tục mua sắm <3");
}
function redirectToHomepage() {
  window.location.href = "./index.html";
}
const pullRight = document.querySelector(".pull-right");
const checkoutForm = document.getElementById("checkout-form");

pullRight.addEventListener("click", function (event) {
  event.preventDefault();

  if (validateForm()) {
    deleteAllProducts();
    displaySuccessMessage();
    redirectToHomepage();
  } else {
    alert("Vui lòng điền đầy đủ thông tin trong form.");
  }
});
// sự kiện check dữ liệu form
function validateForm() {
  const formInputs = document.querySelectorAll("#checkout-form input");
  let isValid = true;

  formInputs.forEach((input) => {
    const parentDiv = input.parentElement;
    const requiredMessage = parentDiv.querySelector(".required-message");

    if (input.required && !input.value.trim()) {
      if (requiredMessage) {
        
        requiredMessage.style.display = "inline";
      }
      isValid = false;
    } else {
      if (requiredMessage) {
        requiredMessage.textContent = "";
        requiredMessage.style.display = "none";
      }
    }
    input.addEventListener('input', function () {
      if (requiredMessage) {
        requiredMessage.style.display = 'none';
      }
    });
  });
  return isValid;
}

// sự kiện focus vào ô input
document.addEventListener('DOMContentLoaded', function () {
  const radioInputs = document.querySelectorAll('.payments-option input[type="radio"]');
  radioInputs.forEach(function (input) {
    input.checked = true; 
  });
});
