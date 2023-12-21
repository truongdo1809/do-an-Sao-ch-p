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
  // search ở menu mobile
  $("form").on("submit", function (e) {
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
      document.querySelector(".body-login").style.marginLeft = "0";
      body.style.overflow = "";

    }else{
      menuMobile.style.display = "block"
      document.querySelector(".body-login").style.marginLeft = "300px";
      body.style.overflow = "hidden";
 
    }
  })
  hiddenIcon.addEventListener("click", function () {
      
      if(menuMobile.style.display === "block"){
        menuMobile.style.display = "none"
        document.querySelector(".body-login").style.marginLeft = "0";
        body.style.overflow = "";

      }else{
        menuMobile.style.display = "block"
        document.querySelector(".body-login").style.marginLeft = "300px";
        body.style.overflow = "hidden";
   
      }
  });

  document.addEventListener("click", function (event) {
      const isClickInsideMenu = menuMobile.contains(event.target);
      const isClickOnHiddenIcon = hiddenIcon.contains(event.target);

      if (!isClickInsideMenu && !isClickOnHiddenIcon) {
          menuMobile.style.display = "none";
        
        document.querySelector(".body-login").style.marginLeft = "0";
          
      }
  });
  
});

