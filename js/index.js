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
             <span class="price-sale">${priceSale}</span>
            <span class="price-product">${price}</span>

             </div>
                <a href="./detail.html?id=${product.id}" class="add-to_cart">Thêm vào giỏ hàng</a>
            </div>
        </div>
  </div>
    `;
    HTML1 += HTML;
  });
  shuffledData2.forEach((product) => {
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
                <span class="price-sale">${priceSale}</span>
            <span class="price-product">${price}</span>

                </div>
                <a href="./detail.html?id=${product.id}" class="add-to_cart">Thêm vào giỏ hàng</a>
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
      document.querySelector(".body-index").style.marginLeft = "0";
      body.style.overflow = "";
    }else{
      menuMobile.style.display = "block"
      document.querySelector(".body-index").style.marginLeft = "300px";
      body.style.overflow = "hidden";
    }
  })
  hiddenIcon.addEventListener("click", function () {
      
      if(menuMobile.style.display === "block"){
        menuMobile.style.display = "none"
        document.querySelector(".body-index").style.marginLeft = "0";
        body.style.overflow = "";
      }else{
        menuMobile.style.display = "block"
        document.querySelector(".body-index").style.marginLeft = "300px";
        body.style.overflow = "hidden";
   
      }
  });

  document.addEventListener("click", function (event) {
      const isClickInsideMenu = menuMobile.contains(event.target);
      const isClickOnHiddenIcon = hiddenIcon.contains(event.target);

      if (!isClickInsideMenu && !isClickOnHiddenIcon) {
          menuMobile.style.display = "none";
          document.querySelector(".body-index").style.marginLeft = "0"
        body.style.overflow = "";
          
      }
  });
  
});

