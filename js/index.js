const URL_API = `https://api-products-tau.vercel.app/products`;
// random ngẫu nhiên sản phẩm
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const getApi = async (URL_API) => {
  const response = await axios.get(URL_API);
  const shuffledData = shuffleArray(response.data);
  products(shuffledData);
};
getApi(URL_API);
const products = (data) => {
  const productsList = document.querySelector("#option-product");
  const productsList2 = document.querySelector("#option2-product");

  let HTML1 = ``;
  let HTML2 = ``;
  // silce để tránh 2 mảng lấy sản phẩm giống nhau
  const shuffledData1 = shuffleArray(data.slice(0, 9));
  const shuffledData2 = shuffleArray(data.slice(11, 24));

  shuffledData1.forEach((product) => {
    const HTML = /*html*/ `
    <div class="custom-col col-6 col-xl-2 col-md-4">
        <div class="product">
            <div class=" product-img">
               <a href="./detail.html?id=${product.id}">
                <img class="default-img " src="${product.img}" alt="">
                <img class="hover-img " src="${product.imgHover}" alt="">
               </a>
            </div>
            <div class="product-info">
                <a href="#" class="name-product">
                    <h2>${product.title}</h2>
             </a>
             <div class="price">
             <span class="price-sale">${product.priceSale
               .toLocaleString("vi-VN", {
                 style: "currency",
                 currency: "VND",
               })
               .replace("₫","")}<sup>đ</sup></span>

                 <span class="price-product">${product.price
                   .toLocaleString("vi-VN", {
                     style: "currency",
                     currency: "VND",
                   })
                   .replace("₫", "")}<sup>đ</sup></span>

             </div>
                <a href="./detail.html" class="add-to_cart">Thêm vào giỏ hàng</a>
            </div>
        </div>
  </div>
    `;
    HTML1 += HTML;
  });
  shuffledData2.forEach((product) => {
    const HTML = /*html*/ `
    <div class="custom-col col-6 col-xl-2 col-md-4">
        <div class="product">
            <div class=" product-img">
               <a href="./detail.html?id=${product.id}">
                <img class="default-img " src="${product.img}" alt="">
                <img class="hover-img " src="${product.imgHover}" alt="">
               </a>
            </div>
            <div class="product-info">
                <a href="#" class="name-product">
                    <h2>${product.title}</h2>
             </a>
                <div class="price">
                <span class="price-sale">${product.priceSale
                  .toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })
                  .replace("₫", "")}<sup>đ</sup></span>

                    <span class="price-product">${product.price
                      .toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })
                      .replace("₫", "")}<sup>đ</sup></span>

                </div>
                <a href="./detail.html" class="add-to_cart">Thêm vào giỏ hàng</a>
            </div>
        </div>
  </div>
    `;
    HTML2 += HTML;
  });
  productsList.innerHTML = HTML1;
  productsList2.innerHTML = HTML2;
};
$(document).ready(function () {
  $(".owl-carousel").owlCarousel();
});
$(".owl-carousel").owlCarousel({
  autoplayTimeout: 4000,
  autoplaySpeed: 1000,
  dotsSpeed: 1000,

  loop: true,
  margin: 100,
  nav: false,
  autoplay: true,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 1,
    },
    1000: {
      items: 1,
    },
  },
});

// search
$("form").on("submit",function(e){
 e.preventDefault();
 window.location.href = "/product.html?search=" + $("input").val();
})