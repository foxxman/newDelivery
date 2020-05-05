const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

function toggleModal() {
  modal.classList.toggle("is-open");
}

//day-1 АВТОРИЗАЦИЯ

//console.log(document.querySelector(".button-auth")); //объект document, метод querySelector,ищем объект по классу .button-auth
//в консоль выводится этот объект
// . для классов, # для id

//let - переменная

const buttonAuth = document.querySelector(".button-auth"); //кнопка авторизации
const modalAuth = document.querySelector(".modal-auth"); //модальное окно авторизации
const closeAuth = document.querySelector(".close-auth"); //кнопка закрытия
const logInForm = document.querySelector("#logInForm"); //форма для авторизации
const loginInput = document.querySelector("#login"); //Логин
const userName = document.querySelector(".user-name");
const buttonOut = document.querySelector(".button-out"); //кнопка выхода

let login = localStorage.getItem("gloDelivery");
//console.log(modalAuth);
//console.dir(modalAuth); //выводит в виде объекта

//вывели свойства объекта, ListName->_proto_ его методы
// add добавить класс
//remave удалить класс
//contains проверить, есть ли класс
//toggle удалить или добавить класс, в зависимости от его наличия

function toogleModalAuth() {
  modalAuth.classList.toggle("is-open"); //снять или поставить класс
}

function logIn(event) {
  // console.log(event);
  //чтобы страница не перезагружалась
  event.preventDefault();
  // console.log("Логин");
  //console.log(loginInput.value);
  login = loginInput.value;

  if (login == "") {
    alert("Enter login, please");
  } else {
    //запоминаем логин при перезагрузке страницы
    localStorage.setItem("gloDelivery", login); //setItem добавляет свойство со значением в виде строки

    toogleModalAuth();
    //console.log(login);

    buttonAuth.removeEventListener("click", toogleModalAuth);
    //удаляем обработчик событий
    //buttonAuth.removeEventListener("click", toogleModalAuth);
    closeAuth.removeEventListener("click", toogleModalAuth);
    //submit - отправка
    logInForm.removeEventListener("submit", logIn);

    logInForm.reset(); //очистка полей ввода
    checkAuth();
  }
}

function logOut(event) {
  login = null;

  localStorage.removeItem("gloDelivery"); //удаляем логин из памяти при выходе

  buttonAuth.style.display = "";
  userName.style.display = "";
  buttonOut.style.display = "";

  buttonOut.removeEventListener("click", logOut);

  checkAuth();
}

function autorized() {
  console.log("Авторизован");

  userName.textContent = login; //имя в скрытом изначально блоке

  //обращаемся напрямую к свойству класса, чтобы кнопка исчезла
  buttonAuth.style.display = "none";
  userName.style.display = "inline"; //исп. inline, тк блок span
  buttonOut.style.display = "block";

  buttonOut.addEventListener("click", logOut);
}

function notAutorized() {
  console.log("Не авторизован");
  //"слушаем" buttonAut на предмет действия click, после выполняем toogleModalAuth
  //метод addEventListener
  buttonAuth.addEventListener("click", toogleModalAuth);
  //удаляем обработчик событий
  //buttonAuth.removeEventListener("click", toogleModalAuth);
  closeAuth.addEventListener("click", toogleModalAuth);
  //submit - отправка
  logInForm.addEventListener("submit", logIn);
}

//функция проверки авторизации
function checkAuth() {
  if (login) {
    autorized();
  } else {
    notAutorized();
  }
}

checkAuth(); //для первой загрузки
