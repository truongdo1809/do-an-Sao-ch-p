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
            }" min="1" max="61" oninput="restrictAndDefault(this)">
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

// sự  kiện không cho phép xóa hết dữ liệu ô input
function restrictAndDefault(inputElement) {
  // Nếu ô input trống rỗng, đặt giá trị mặc định là 1
  if (inputElement.value.trim() === "") {
    inputElement.value = "1";
  }
}

// search
$(".header-input").on("submit", function (e) {
  e.preventDefault();
  window.location.href = "/product.html?search=" + $(".header-input input").val();
});
  // search ở menu mobile
  $(".input-hidden").on("submit", function (e) {
    e.preventDefault();
    window.location.href = "/product.html?search=" + $(".input-hidden input").val();
  });
// menu mobile
$(document).ready(function () {

  $('.icon-right').click(function () {
      $(this).hide().siblings('.icon-down').show().closest('ul').find('.menu-child1-mobile').slideUp();
  });


  $('.icon-down').click(function () {
      $(this).hide().siblings('.icon-right').show().closest('ul').find('.menu-child1-mobile').slideDown();
  });

  $('.icon2-right').click(function () {
    $(this).hide().siblings('.icon2-down').show().closest('ul').find('.menu-child3-mobile').slideUp();
});


$('.icon2-down').click(function () {
    $(this).hide().siblings('.icon2-right').show().closest('ul').find('.menu-child3-mobile').slideDown();
});
});


// ẩn hiện menu
document.addEventListener("DOMContentLoaded", function () {
  const menuMobile = document.querySelector(".menu-list-mobile");
  const hiddenIcon = document.querySelector(".hidden-icon");
  const body = document.querySelector("body");
  const iconHiddenMenu = document.querySelector(".icon-hidden-menu i")
  iconHiddenMenu.addEventListener("click",function(){
    if(menuMobile.style.display === "block"){
      menuMobile.style.display = "none"
      document.querySelector(".body-cart").style.marginLeft = "0";
      body.style.overflow = "";
    }else{
      menuMobile.style.display = "block"
      document.querySelector(".body-cart").style.marginLeft = "300px";
      body.style.overflow = "hidden";
    }
  })
  hiddenIcon.addEventListener("click", function () {
      
      if(menuMobile.style.display === "block"){
        menuMobile.style.display = "none"
        document.querySelector(".body-cart").style.marginLeft = "0";
        body.style.overflow = "";
      }else{
        menuMobile.style.display = "block"
        document.querySelector(".body-cart").style.marginLeft = "300px";
        body.style.overflow = "hidden";
   
      }
  });

  document.addEventListener("click", function (event) {
      const isClickInsideMenu = menuMobile.contains(event.target);
      const isClickOnHiddenIcon = hiddenIcon.contains(event.target);

      if (!isClickInsideMenu && !isClickOnHiddenIcon) {
          menuMobile.style.display = "none";
        document.querySelector(".body-cart").style.marginLeft = "0";
        body.style.overflow = "";
          
      }
  });
  
});