$(function () {
  // search sản phẩm
  $("form").on("submit", function (e) {
    e.preventDefault();
    window.location.href = "/product.html?search=" + $("input").val();
  });
  async function getApi3() {
    const LIMIT = 8;
    const url = new URL(window.location.href);
    const search = url.searchParams.get("search");
    const page = url.searchParams.get("page") || 1;
    const skip = (page - 1) * LIMIT;

    try {
      const res = await fetch(
        `https://api-products-tau.vercel.app/products${
          search ? "?title_like=" + search + "&" : "?"
        }skip=${skip}&limit=${LIMIT}`
      );
      const json = await res.json();
      const filteredProducts = Array.isArray(json)
        ? json.filter((product) =>
            product.title.toLowerCase().includes(search.toLowerCase())
          )
        : [];
        if (filteredProducts.length > 0) {
          updateNavbarTitle(search);
        } else {
          updateNavbarTitle("không có sản phẩm nào");
        }
      products(filteredProducts);

    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  }
  window.onload = function () {
    getApi3();
  };
 
  // lọc theo type
  let type = null;
  const urlParams = new URLSearchParams(window.location.search);
  type = urlParams.get("type");
  const URL_API = `https://api-products-tau.vercel.app/products${
    type ? `?type=${type}` : ""
  }`;
  const getApi = async (URL_API) => {
    try {
      const response = await axios.get(URL_API);
      products(response.data);
    } catch (error) {
      console.error("something wrong:", error);
    }
  };
  const getApi2 = async (newURL) => {
    try {
      const response = await axios.get(newURL);
      products(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("something wrong:", error);
    }
  };
  let products = (data) => {
    const productsList = document.querySelector("#products");
    let HTML = ``;
    data.forEach((product) => {
      const priceSale = product.priceSale
        ? product.priceSale
            .toLocaleString("vi-VN", { style: "currency", currency: "VND" })
            .replace("₫", "") + "<sup>đ</sup>"
        : "";
      const price = product.price
        ? product.price
            .toLocaleString("vi-VN", { style: "currency", currency: "VND" })
            .replace("₫", "") + "<sup>đ</sup>"
        : "";

      HTML += /*html*/ `
        <div class="col-6 col-xl-3 col-md-4">
          <div class="product">
            <div class="product-img">
              <a href="./detail.html?id=${product.id}">
                <img class="default-img" src="${product.img}" alt="">
                <img class="hover-img" src="${product.imgHover}" alt="">
              </a>
            </div>
            <div class="product-info">
              <a href="#" class="name-product">
                <h2>${product.title}</h2>
              </a>
              <div class="price">
              <span class="price-sale">${priceSale}</span>
            <span class="price-product">${price}</span>

              </div>
              <a href="./detail.html" class="add-to_cart">Thêm vào giỏ hàng</a>
            </div>
          </div>
        </div>
        
      `;
    });
    productsList.innerHTML = HTML;
  };

  const updateNavbarTitle = (type) => {
    const navbarTitle = document.querySelector(".navbar-title .text2");
    if (navbarTitle) {
      navbarTitle.textContent = type || "SẢN PHẨM";
    }
  };
  // lọc theo giá tiền
  const selectElement = document.querySelector(".navbar-option");
  if (selectElement) {
    selectElement.addEventListener("change", async (event) => {
      const selectedOption = event.target.value.toLowerCase();
      let sortOrder = selectedOption;
      selectElement.value = selectedOption;
      const newURL = `https://api-products-tau.vercel.app/products?_sort=priceSale&_order=${sortOrder}`;
      await getApi2(newURL);
    });
  }
  updateNavbarTitle(type);
  getApi(URL_API);
});
// menu mobile
$(document).ready(function () {

  $('.fa-chevron-right').click(function () {
      $(this).hide().siblings('.fa-chevron-down').show().closest('ul').find('.menu-child1-moble').slideUp();
  });


  $('.fa-chevron-down').click(function () {
      $(this).hide().siblings('.fa-chevron-right').show().closest('ul').find('.menu-child1-moble').slideDown();
  });
});

// ẩn hiện menu
document.addEventListener("DOMContentLoaded", function () {
  const menuMobile = document.querySelector(".menu-list-mobile");
  const hiddenIcon = document.querySelector(".hidden-icon");

  hiddenIcon.addEventListener("click", function () {
      menuMobile.style.display = (menuMobile.style.display === "block") ? "none" : "block";
  });

  document.addEventListener("click", function (event) {
      const isClickInsideMenu = menuMobile.contains(event.target);
      const isClickOnHiddenIcon = hiddenIcon.contains(event.target);

      if (!isClickInsideMenu && !isClickOnHiddenIcon) {
          menuMobile.style.display = "none";
      }
  });
});