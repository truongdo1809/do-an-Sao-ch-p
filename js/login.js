const tabLogin = () => {
  const btnLogin = document.querySelectorAll(".register-text");
  const formLogin = document.querySelectorAll(".login-form_item")

  btnLogin.forEach((button, index) => {
  

    button.addEventListener('click', () => {
      btnLogin.forEach((item) => {
        item.classList.remove('active');
      });

      formLogin.forEach((value) => {
        value.classList.remove('active');
      });

      button.classList.add('active');
      formLogin[index].classList.add('active')
    });

  });
}
tabLogin();

// search
$("form").on("submit", function (e) {
  e.preventDefault();
  window.location.href = "/product.html?search=" + $("input").val();
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