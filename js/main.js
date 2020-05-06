"use strict";

//day-1 АВТОРИЗАЦИЯ

//console.log(document.querySelector(".button-auth")); //объект document, метод querySelector,ищем объект по классу .button-auth
//в консоль выводится этот объект
// . для классов, # для id

//let - переменная

const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

const buttonAuth = document.querySelector(".button-auth"); //кнопка авторизации
const modalAuth = document.querySelector(".modal-auth"); //модальное окно авторизации
const closeAuth = document.querySelector(".close-auth"); //кнопка закрытия
const logInForm = document.querySelector("#logInForm"); //форма для авторизации
const loginInput = document.querySelector("#login"); //Логин
const userName = document.querySelector(".user-name");
const buttonOut = document.querySelector(".button-out"); //кнопка выхода
const cardsRestaurants = document.querySelector(".cards-restaurants"); //карточка товара
const containerPromo = document.querySelector(".container-promo"); //блок с рекламмой
const restaurants = document.querySelector(".restaurants"); //блок ресторанов, полностью
const menu = document.querySelector(".menu"); //меню?
const logo = document.querySelector(".logo");
const cardsMenu = document.querySelector(".cards-menu");

let login = localStorage.getItem("gloDelivery");
//console.log(modalAuth);
//console.dir(modalAuth); //выводит в виде объекта

//вывели свойства объекта, ListName->_proto_ его методы
// add добавить класс
//remave удалить класс
//contains проверить, есть ли класс
//toggle удалить или добавить класс, в зависимости от его наличия

function toggleModal() {
  modal.classList.toggle("is-open");
}

//вызов окна авторизации
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

//day2

//ф-я создания карточки
function createCardRestaurant() {
  //обратные ковычки
  //копируем код карточки начиная с ссылки, href убираем, тк не будем переходить на др. страницу
  const card = `
  <a  class="card card-restaurant">
  <img src="img/tanuki/preview.jpg" alt="image" class="card-image"/>
  <div class="card-text">
    <div class="card-heading">
      <h3 class="card-title">Тануки</h3>
      <span class="card-tag tag">60 мин</span>
    </div>
    <div class="card-info">
      <div class="rating">
        4.5
      </div>
      <div class="price">От 1 200 ₽</div>
      <div class="category">Суши, роллы</div>
    </div>
  </div>
</a>
 `;

  //вставка вёрстки на страницу
  //метод insertAdjacentHTML, применяем к "обёртке" карточек
  //аргументы - *как вставлять* и *что вставлять*
  //afterbegin с самого начала
  //afterend после блока
  //afterbegin
  //beforeend
  cardsRestaurants.insertAdjacentHTML("beforeend", card);
}

function createCardGood() {
  //в карточки добавляем элемент div
  const card = document.createElement("div");
  //навешиваем класс
  card.className = "card";
  //вставляем код HTML в карточку (insertAdjacent....)
  card.insertAdjacentHTML(
    "beforeend",
    `
  <img src="img/pizza-plus/pizza-classic.jpg" alt="image" class="card-image"/>
						<div class="card-text">
							<div class="card-heading">
								<h3 class="card-title card-title-reg">Пицца Классика</h3>
							</div>
							<div class="card-info">
								<div class="ingredients">Соус томатный, сыр «Моцарелла», сыр «Пармезан», ветчина, салями,
									грибы.
								</div>
							</div>
							<div class="card-buttons">
								<button class="button button-primary button-add-cart">
									<span class="button-card-text">В корзину</span>
									<span class="button-cart-svg"></span>
								</button>
								<strong class="card-price-bold">510 ₽</strong>
							</div>
						</div>
  `
  );
  //вставляем элемент (insertAdjacent....)
  cardsMenu.insertAdjacentElement("beforeend", card);
}

//event - событие, в данном случае клик
function openGoods(event) {
  //определяем, куда был клик
  const target = event.target;
  //console.log(target);

  //метод closest находит первый из родительских классов с таким селектором
  const restaurant = target.closest(".card-restaurant");

  //если попали мимо карточки, то restaurant = null
  if (restaurant) {
    if (login == null) {
      toogleModalAuth();
    } else {
      //скрываем рестораны и промо, отображаем меню
      //с помощью добавления или удаления класса hide
      containerPromo.classList.add("hide");
      restaurants.classList.add("hide");
      menu.classList.remove("hide");

      //"очищаем" поле контента, чтобы не было 30 пицц
      cardsMenu.textContent = "";

      createCardGood();
      createCardGood();
      createCardGood();
    }
  }
}

//СОБЫТИЯ
cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

// "прослушки" на карточки и логотип наверху, обработчик событий
cardsRestaurants.addEventListener("click", openGoods);
//действия, обратные openGoods, возвращаем все обратно
logo.addEventListener("click", function () {
  containerPromo.classList.remove("hide");
  restaurants.classList.remove("hide");
  menu.classList.add("hide");
});

//ВЫЗОВЫ ФУНКЦИЙ
checkAuth(); //для первой загрузки

createCardRestaurant();
createCardRestaurant();
createCardRestaurant();
