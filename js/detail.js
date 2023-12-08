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
<p>${(data.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace('₫', '')}<sup>đ</sup></p>
  <span>${(data.priceSale).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace('₫', '')}<sup>đ</sup></span>
</div>`;

  const productTitle = document.querySelector(".product-title");
  productTitle.innerHTML = data.title;
  const productType = document.querySelector(".product-type");
  productType.innerHTML = `<a href="./product.html"></a>${data.type} <i class="fa-solid fa-caret-right"></i>`;


  const addProductToLocalStorage = (data) => {
    const existingProducts = JSON.parse(localStorage.getItem('products')) || [];

    const existingProductIndex = existingProducts.findIndex(product => product.id === data.id);

    if (existingProductIndex !== -1) {
      existingProducts[existingProductIndex].quantity++;
    } else {
      existingProducts.push({
        id: data.id,
        name: data.title,
        price: data.priceSale,
        quantity: 1,
        size: "M",
      });
    }

    localStorage.setItem("products", JSON.stringify(existingProducts));

    console.log("Product added to localStorage:", existingProducts);
  };

  const addCart = document.querySelector(".add-cart");

  if (addCart) {
    addCart.addEventListener("click", function () {
      addProductToLocalStorage(data);
    });
  } else {
    console.error("some thing wrong");
  }
};


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
            <span class="price-sale">${(product.priceSale).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace('₫', '')}<sup>đ</sup></span>
            <span class="price-product">${(product.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace('₫', '')}<sup>đ</sup></span>
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

//  sự kiện người dùng nhập dữ liệu vào ô tìm kiếm
function searchProducts() {
  // Lấy giá trị từ ô tìm kiếm
  const searchTerm = document.querySelector("#search-input").value;

  // Kiểm tra xem ô tìm kiếm có dữ liệu hay không
  if (searchTerm.trim() !== "") {
    $(function () {
      const urlParams = new URLSearchParams(window.location.search);
      const title = urlParams.get("title");
      const titleParam = title ? `?title=${title}` : '';
      const URL_API = `https://api-products-tau.vercel.app/products${titleParam}`;
      axios
        .get(URL_API)
        .then(function (response) {
          // Lọc các sản phẩm có kí tự hoặc có tên trùng với dữ liệu người dùng nhập vào
          const filteredProducts = response.data.filter(function (products) {
            return products.title
              .toLowerCase()
              .includes(searchTerm.toLowerCase());
          });
          if (filteredProducts.length > 0) {
            window.location.href = "./product.html";
          } else {
            console.log("Không tìm thấy sản phẩm.");
          }
        })
        .catch(function (error) {
          console.error("something wrong:", error);
        });
    });
  }
}
$("#search-input").on("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    searchProducts();
  }
});


// search có hoạt động nhưng khi click thì lại render ra hết tất cả sản phẩm thay vì render ra sản phẩm có kí tự hoặc title trùng với dữ liệu người dùng đã nhập vào









//  hiệu ứng hover và focus của sezi sản phẩm
function toggleBorder(element) {
  const spanEl = document.querySelectorAll(".sezi-product2 span");
  spanEl.forEach(function (span) {
    span.classList.remove("active");
  });
  element.classList.add("active");
}
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
