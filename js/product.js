$(function () {
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

  // let searchInput = document.querySelector(".header-input input");

  // searchInput.addEventListener("input", function () {
  //   console.log(searchInput.value);
  //   let txtSearch = searchInput.value.trim().toLowerCase();
  //   let listProduct = document.querySelectorAll(".product");
  //   listProduct.forEach((item) => {
  //     console.log(item.innerText);
  //     if (item.innerText.toLowerCase().includes(txtSearch)) {
  //       item.classList.remove("hide");
  //     } else {
  //       item.classList.add("hide");
  //     }
  //   });
  // });

  // search
  async function getApi3() {
    const LIMIT = 8;
    const url = new URL(window.location.href);
    const search = url.searchParams.get("search");
    const page = url.searchParams.get("page") || 1;
    const skip = (page - 1) * LIMIT;
    try {
      const res = await fetch(
        `https://api-products-tau.vercel.app/products${
          search ? "/search?q=" + search + "&" : "?"
        }skip=${skip}&limit=${LIMIT}`
       
      );
    
      const json = await res.json();
      
      const filteredProducts = Array.isArray(json)
        ? json.filter((product) =>
            product.title.toLowerCase().includes(search.toLowerCase())
          )
        : [];
      products(filteredProducts);
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  }
  window.onload = function () {
    getApi3();
    console.log(getApi3());
  };
});

// search
// function checkSearching() {
//   const URL_API = `https://api-products-tau.vercel.app/products`;
//   fetch(URL_API)
//     .then((response) => response.json())
//     .then((products) => {
//       let searchingData = localStorage.getItem("searching");
//       if (searchingData) {
//         const container = document.querySelector("#products");
//         let HTML = ""; // Initialize HTML variable
//         const filteredProducts = products.filter(
//           (element) =>
//             element.title.toLowerCase().indexOf(searchingData.toLowerCase()) >= 0
//         );
//         filteredProducts.forEach((element) => {
//           if (element.status === "enabled") {
//             HTML += /*html*/ `
//               <div class="col-6 col-xl-3 col-md-3">
//                 <div class="product">
//                   <div class="product-img">
//                     <a href="./detail.html?id=${element.id}">
//                       <img class="default-img" src="${element.img}" alt="">
//                       <img class="hover-img" src="${element.imgHover}" alt="">
//                     </a>
//                   </div>
//                   <div class="product-info">
//                     <a href="#" class="name-product">
//                       <h2>${element.title}</h2>
//                     </a>
//                     <div class="price">
//                       <span class="price-sale">${element.priceSale
//                         .toLocaleString("vi-VN", { style: "currency", currency: "VND" })
//                         .replace("₫", "")}<sup>đ</sup></span>

//                       <span class="price-product">${element.price
//                         .toLocaleString("vi-VN", { style: "currency", currency: "VND" })
//                         .replace("₫", "")}<sup>đ</sup></span>
//                     </div>
//                     <a href="./detail.html" class="add-to_cart">Thêm vào giỏ hàng</a>
//                   </div>
//                 </div>
//               </div>
//             `;
//           }
//         });
//         container.innerHTML = HTML; // Set innerHTML after the loop
//         localStorage.removeItem("searching");
//       }
//     });
// }
