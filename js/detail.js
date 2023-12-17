const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const URL_DETAIL = `https://api-products-tau.vercel.app/products/${id}`;

const getApi = async (URL_API) => {
  const response = await axios.get(URL_API);
  products(response.data);
};

getApi(URL_DETAIL);

const products = (data) => {
  const detailImg = document.querySelector("#detail-img");
  const productsList = document.querySelector("#detail-product__info");

  detailImg.innerHTML = `
  <img src="${data.img}" alt="">
  `;
  productsList.innerHTML = /*html*/ `
  <div class="product-title2">
  <h1>${data.title}</h1>
</div>
<div class="product-price2">
<p>${data.price
    .toLocaleString("vi-VN", { style: "currency", currency: "VND" })
    .replace("₫", "")}<sup>đ</sup></p>
  <span>${data.priceSale
    .toLocaleString("vi-VN", { style: "currency", currency: "VND" })
    .replace("₫", "")}<sup>đ</sup></span>
</div>`;

  const productTitle = document.querySelector(".product-title");
  productTitle.innerHTML = data.title;
  const productType = document.querySelector(".product-type");
  productType.innerHTML = `<a href="./product.html"></a>${data.type} <i class="fa-solid fa-caret-right"></i>`;

  const addProductToLocalStorage = (data, quantity, size) => {
    const existingProducts = JSON.parse(localStorage.getItem("products")) || [];

    const existingProductIndex = existingProducts.findIndex(
      (product) => product.id === data.id
    );

    if (existingProductIndex !== -1) {
      existingProducts[existingProductIndex].size = size;

      existingProducts[existingProductIndex].quantity += quantity;
    } else {
      existingProducts.push({
        id: data.id,
        name: data.title,
        price: data.priceSale,
        quantity: quantity,
        size: size,
      });
    }
    localStorage.setItem("products", JSON.stringify(existingProducts));

    console.log("Product added to localStorage:", existingProducts);
  };

  //  update tổng tiền sản phẩm
  let totalPrice = 0;
 
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
    document.querySelector(".header-cart span").textContent =
      formattedTotalPrice;
    document.querySelector(".header-cart2 strong").textContent =
      products.length;
  };
  updateTotal();

  //  sự kiện khi người dùng chưa chọn sai thì hiện 1 dòng thông báo
  // khi người dùng đã chọn thì cho phép thêm sản phẩm
  const addCart = document.querySelector(".add-cart");
  const buyNow = document.querySelector(".buy-now");

  const notificationEl = document.querySelector(".Notification");
  const notificationEl2 = document.querySelector(".Notification2");

  buyNow.addEventListener("mouseenter", function () {
    if (!selectedSize) {
      notificationEl2.style.display = "inline-block";
    }
  });
  buyNow.addEventListener("mouseleave", function () {
    notificationEl2.style.display = "none";
  });

  buyNow.addEventListener("click", function () {
    if (!selectedSize) {
      notificationEl2.style.display = "inline-block";
    } else {
      addProductToLocalStorage(data, currentValue, selectedSize);
      window.location.href = "./cart.html";
    }
  });

  addCart.addEventListener("mouseenter", function () {
    if (!selectedSize) {
      notificationEl.style.display = "inline-block";
    }
  });
  addCart.addEventListener("mouseleave", function () {
    notificationEl.style.display = "none";
  });
  addCart.addEventListener("click", function () {
    if (!selectedSize) {
      notificationEl.style.display = "inline-block";
    } else {
      addProductToLocalStorage(data, currentValue, selectedSize);
      updateTotal();
    }
  });
};
//  lấy ra sezi sản phẩm
const sizeContainer = document.querySelector(".sezi-product2");
const sizeSpans = sizeContainer.querySelectorAll("span");

let selectedSize = null;

sizeSpans.forEach((span) => {
  span.addEventListener("click", function (event) {
    const clickedSize = event.target.textContent;
    console.log("Selected size:", clickedSize);

    selectedSize = clickedSize;
  });
});

// sự kiện tăng giảm số lượng sản phẩm
const increaseBtn = document.querySelector(".increase");
const decreaseBtn = document.querySelector(".decrease");
const valueSpan = document.querySelector(".amount-value");

let currentValue = 1;

function updateValue() {
  valueSpan.textContent = currentValue;
}

decreaseBtn.addEventListener("click", function () {
  currentValue++;
  updateValue();
});

increaseBtn.addEventListener("click", function () {
  if (currentValue > 1) {
    currentValue--;
    updateValue();
  }
});

//  call api chạy slide

const URL_SLIDER = `https://api-products-tau.vercel.app/products`;
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
const getApi2 = async (URL_API) => {
  try {
    const response = await axios.get(URL_API);
    const shuffledData = shuffleArray(response.data);
    const slicedData = shuffledData.slice(0, 10);
    products2(slicedData);
  } catch (error) {
    console.error("something wrong", error);
  }
};

getApi2(URL_SLIDER);

const products2 = (data) => {
  const productSlide = document.querySelector("#product-slide");
  let HTML = "";
  data.forEach((product) => {
    HTML += /*html*/ `
    <div class="item">
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
  productSlide.innerHTML = HTML;
  $("#product-slide").owlCarousel({
    autoplayTimeout: 4000,
    autoplaySpeed: 1000,
    dotsSpeed: 1000,
    loop: true,
    margin: 24,
    nav: false,
    autoplay: true,
    responsive: {
      0: {
        items: 2,
      },
      768: {
        items: 3,
      },
      992: {
        items: 4,
      },
      1200: {
        items: 5,
      },
    },
  });
};

//  hiệu ứng hover và focus của sezi sản phẩm
function toggleBorder(element) {
  const spanEl = document.querySelectorAll(".sezi-product2 span");
  spanEl.forEach(function (span) {
    span.classList.remove("active");
  });
  element.classList.add("active");
}
// search
$("form").on("submit", function (e) {
  e.preventDefault();
  window.location.href = "/product.html?search=" + $("input").val();
});