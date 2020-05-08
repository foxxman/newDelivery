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
const sectionHeadingRes = document.querySelector(".section-heading-res");

let login = localStorage.getItem("gloDelivery");
//console.log(modalAuth);
//console.dir(modalAuth); //выводит в виде объекта
//вывели свойства объекта, ListName->_proto_ его методы
// add добавить класс
//remave удалить класс
//contains проверить, есть ли класс
//toggle удалить или добавить класс, в зависимости от его наличия

//асинхронная функция для запроса на сервер
const getData = async function (url) {
  const response = await fetch(url);
  //проверка полученного(пришло или нет)
  if (!response.ok) {
    throw new Error(
      `Ошибка по адресу ${url}, статус ошибка ${response.status}!`
    );
  }

  //возврат данных из функции
  return await response.json();

  //console.log(response);
};

//обращаемся к файлу партнеров db/partners
getData("./db/partners.jSon");

//список из ресторанов
//console.log(getData("./db/partners.jSon"));

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
function createCardRestaurant(restaurant) {
  // console.log(restaurant.name);
  //  console.log(restaurant.price);
  //ДЕСТРУКТИРИЗАЦИЯ
  const {
    image,
    kitchen,
    name,
    price,
    stars,
    products,
    time_of_delivery: timeOfDelivery, //заменили имя
  } = restaurant; //создали отдельные переменные для каждого объекта

  // console.log(image);
  // console.log(kitchen);
  // console.log(name);
  // console.log(price);
  // console.log(stars);
  // console.log(products);
  // console.log(time_of_delivery);

  //обратные ковычки
  //копируем код карточки начиная с ссылки, href убираем, тк не будем переходить на др. страницу
  // ${...} - подгрузка переменной из базы данных

  //data-products="${...}" - сохранение данных
  const card = `
  <a  class="card card-restaurant" data-products="${products}" data-name="${name}" data-stars="${stars}" data-price="${price}" data-kitchen="${kitchen}" >
  <img src="${image}" alt="image" class="card-image"/> 
  <div class="card-text">
    <div class="card-heading">
      <h3 class="card-title">${name}</h3>
      <span class="card-tag tag">${timeOfDelivery} мин</span>
    </div>
    <div class="card-info">
      <div class="rating">
      ${stars}
      </div>
      <div class="price">От ${price} ₽</div>
      <div class="category">${kitchen}</div>
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

function createHeadingRes(name, price, kitchen, stars) {
  //console.log(price, kitchen, stars);

  const head = `<h2 class="section-title restaurant-title">${name}</h2>
  <div class="card-info">
    <div class="rating">
    ${stars}
    </div>
    <div class="price">От ${price} ₽</div>
    <div class="category">${kitchen}</div>
  </div>`;

  sectionHeadingRes.insertAdjacentHTML("afterbegin", head);
}

function createCardGood(goods) {
  //деструктурируем
  //console.log(goods);
  const { description, id, image, name, price } = goods;

  //в карточки добавляем элемент div
  const card = document.createElement("div");
  //навешиваем класс
  card.className = "card";
  //вставляем код HTML в карточку (insertAdjacent....)
  card.insertAdjacentHTML(
    "beforeend",
    `
  <img src="${image}" alt="image" class="card-image"/>
						<div class="card-text">
							<div class="card-heading">
								<h3 class="card-title card-title-reg">${name}</h3>
							</div>
							<div class="card-info">
								<div class="ingredients">${description}
								</div>
							</div>
							<div class="card-buttons">
								<button class="button button-primary button-add-cart">
									<span class="button-card-text">В корзину</span>
									<span class="button-cart-svg"></span>
								</button>
								<strong class="card-price-bold">${price} ₽</strong>
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
    //если не авторизован, то вызываем окно авторизации
    if (login == null) {
      toogleModalAuth();
    } else {
      //dataset содержит все атрибуты, products - то что хотим получить
      //хранит всегда в кэмлкейсе
      //console.log(restaurant.dataset.products);

      //скрываем рестораны и промо, отображаем меню  createCardGood();
      //с помощью добавления или удаления класса hide
      containerPromo.classList.add("hide");
      restaurants.classList.add("hide");
      menu.classList.remove("hide");

      //"очищаем" поле контента, чтобы не было 30 пицц
      sectionHeadingRes.textContent = "";
      cardsMenu.textContent = "";
      //создаем карточки
      createHeadingRes(
        `${restaurant.dataset.name}`,
        `${restaurant.dataset.price}`,
        `${restaurant.dataset.kitchen}`,
        `${restaurant.dataset.stars}`
      );
      //console.log(`${restaurant.dataset.name}, ${restaurant.dataset.price}`);
      // createHeadingRes(data)
      getData(`./db/${restaurant.dataset.products}`).then(function (data) {
        data.forEach(createCardGood);
      });
    }
  }
}

//createCardRestaurant();
//createCardRestaurant();
//createCardRestaurant();

function init() {
  //обработка данных с помощью метода then
  //после того, как вернутся данные из getData, они попадут в function(data)
  //(array)
  getData("./db/partners.json").then(function (data) {
    console.log(data);

    //метод forEach запускает цикл на количество элементов в массиве
    //каждый объект передан в createCardRestaurant
    data.forEach(createCardRestaurant);
  });

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
}

//функция для вызова всех событий и "прослушек"
init();
