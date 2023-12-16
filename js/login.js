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
const searchInput = document.querySelector("#search-inp")
const searchButton  = document.querySelector("#button-addon2")
searchButton.addEventListener("click",function(){
  localStorage.setItem("searching",searchInput.value)
  window.location.href = "/product.html";
})