$(function () {
  let type = null;
  let sortBy = null;
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

  const products = (data) => {
    const productsList = document.querySelector("#products");
    let HTML = ``;

    data.forEach((product) => {
      HTML += /*html*/ `
        <div class="col-6 col-xl-3 col-md-3">
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
              <span class="price-sale">${product.priceSale
                .toLocaleString("vi-VN", { style: "currency", currency: "VND" })
                .replace("₫", "")}<sup>đ</sup></span>

              <span class="price-product">${product.price
                .toLocaleString("vi-VN", { style: "currency", currency: "VND" })
                .replace("₫", "")}<sup>đ</sup></span>

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

  const selectElement = document.querySelector(".navbar-option");
  if (selectElement) {
    selectElement.addEventListener("change", (event) => {
      const selectedOption = event.target.value.toLowerCase();
      let sortOrder;
      switch (selectedOption) {
        case "giá giảm dần":
          sortOrder = "desc";
          break;
        case "giá tăng dần":
          sortOrder = "asc";
          break;
        default:
          sortOrder = "null";
      }
      selectElement.value = selectedOption;
      const newURL = `https://api-products-tau.vercel.app/products?sort=price&_order=${sortOrder}`;
      getApi(newURL);
    });
  }
  //  code không báo lỗi nhưng không có gì xảy ra kèm theo đó value trong ô input không hiện ra mặc dù option còn đó

  updateNavbarTitle(type);
  getApi(URL_API);
});


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
