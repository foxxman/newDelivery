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
const modalBody = document.querySelector(".modal-body");
const modalPrice = document.querySelector(".modal-pricetag");
const buttonClearCart = document.querySelector(".clear-cart");

let login = localStorage.getItem("gloDelivery");

//console.log(modalAuth);
//console.dir(modalAuth); //выводит в виде объекта
//вывели свойства объекта, ListName->_proto_ его методы
// add добавить класс
//remave удалить класс
//contains проверить, есть ли класс
//toggle удалить или добавить класс, в зависимости от его наличия

//массив для корзины и функции его сохранения
const cart = JSON.parse(localStorage.getItem("gloDeliveryCart")) || [];
console.log(cart);
const saveCart = function () {
  localStorage.setItem("gloDeliveryCart", JSON.stringify(cart));
};

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
getData("./db/partners.json");

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
  cartButton.style.display = "";
  buttonOut.removeEventListener("click", logOut);

  checkAuth();
}

function autorized() {
  console.log("Авторизован");

  userName.textContent = login; //имя в скрытом изначально блоке

  //обращаемся напрямую к свойству класса, чтобы кнопка исчезла
  buttonAuth.style.display = "none";
  userName.style.display = "inline"; //исп. inline, тк блок span
  buttonOut.style.display = "flex";
  cartButton.style.display = "flex"; //отображение корзины
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

function createCardGood({ description, id, image, name, price }) {
  //деструктурируем
  //console.log(goods);
  //const { description, id, image, name, price } = goods;

  //в карточки добавляем элемент div
  const card = document.createElement("div");
  //навешиваем класс
  card.className = "card";
  //card.id=id;
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
								<button class="button button-primary button-add-cart" id="${id}">
									<span class="button-card-text">В корзину</span>
									<span class="button-cart-svg"></span>
								</button>
								<strong class="card-price card-price-bold">${price} ₽</strong>
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

function addToCart(event) {
  const target = event.target;
  //метод closests
  const buttonAddToCart = target.closest(".button-add-cart");
  if (buttonAddToCart) {
    const card = target.closest(".card");
    //textContent - доступ к тексту блока
    const title = card.querySelector(".card-title-reg").textContent;
    const cost = card.querySelector(".card-price").textContent;
    const id = buttonAddToCart.id;
    // console.log(title, cost, id);

    // find - ищет в массиве элемент по какому-то совпадению
    const food = cart.find(function (item) {
      return item.id === id;
    });

    //счетчик еды, сколько добавили
    if (food) {
      //если уже лежит в корзине
      food.count += 1;
    } else {
      //если кликнули в первый раз
      cart.push({
        //id: id, если совпадают, можно просто через запятую
        id,
        title,
        cost,
        count: 1, //количество
      });
      saveCart();
    }

    console.log(food);
    //пушим(добавляяем) внутрь cart(объявлен в начале) объект {}

    //  console.log(cart);
  }
}
//
function renderCart() {
  modalBody.textContent = ""; //очистка корзины

  cart.forEach(function ({ id, title, cost, count }) {
    const itemCart = `<div class="food-row">
    <span class="food-name">${title}</span>
    <strong class="food-price">${cost}</strong>
    <div class="food-counter">
      <button class="counter-button counter-minus"  data-id=${id}>-</button>
      <span class="counter">${count}</span>
      <button class="counter-button counter-plus"  data-id=${id}>+</button>
    </div>
  </div>`;

    modalBody.insertAdjacentHTML("afterbegin", itemCart);
  });

  const totalPrice = cart.reduce(function (result, item) {
    //parseFloat выцепляет первое число из строки
    return result + parseFloat(item.cost) * item.count;
  }, 0);

  modalPrice.textContent = totalPrice + "₽";
}

function changeCount(event) {
  const target = event.target;

  if (target.classList.contains("counter-button")) {
    const food = cart.find(function (item) {
      return item.id === target.dataset.id;
    });
    if (target.classList.contains("counter-minus")) {
      food.count--;
      if (food.count === 0) {
        //splice(индекс удаляемого элемента, сколько элементов удалить)
        //indexOf определяет индекс элемента
        cart.splice(cart.indexOf(food), 1);
      }
    }
    if (target.classList.contains("counter-plus")) food.count++;
    renderCart();
  }
  saveCart;
}

function init() {
  //обработка данных с помощью метода then
  //после того, как вернутся данные из getData, они попадут в function(data)
  //(array)
  getData("./db/partners.json").then(function (data) {
    //console.log(data);

    //метод forEach запускает цикл на количество элементов в массиве
    //каждый объект передан в createCardRestaurant
    data.forEach(createCardRestaurant);
  });

  //очистка корзины
  buttonClearCart.addEventListener("click", function () {
    cart.length = 0;
    renderCart();
  });
  //СОБЫТИЯ
  cartButton.addEventListener("click", function () {
    renderCart();
    toggleModal();
  });

  modalBody.addEventListener("click", changeCount);

  cardsMenu.addEventListener("click", addToCart);
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
