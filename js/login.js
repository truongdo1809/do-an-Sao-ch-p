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
