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
