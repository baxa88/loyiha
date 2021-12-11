let options = {
  strings: [
    "<i>Siz Agro-Olam saytiga hush </i> kelibsiz ",
    "&amp; Bundan hursandmiz",
  ],
  typeSpeed: 80,
};

let typed = new Typed(".element", options);

// reveal
window.addEventListener("scroll", () => {
  let reveals = document.querySelectorAll(".reveal");

  for (let i = 0; i < reveals.length; i++) {
    let windowHeight = window.innerHeight;
    let revealTop = reveals[i].getBoundingClientRect().top;
    let revealPoint = 50;

    if (revealTop < windowHeight - revealPoint) {
      reveals[i].classList.add("activeReveal");
    }
  }
});
// ! reveal
const faBars = document.querySelector(".fa-bars");
const navbar = document.querySelector(".navbar");
const navClose = document.querySelector(".nav-close");
faBars.addEventListener("click", () => {
  if (navbar.style.display === "none") {
    navbar.style.display = "block";
  } else {
    navbar.style.display = "none";
  }
});
navClose.addEventListener("click", function () {
  navbar.style.display = "none";
});
//  About-section
const navs = document.querySelectorAll(".nav");
navs.forEach((nav) => {
  nav.addEventListener("click", () => {
    removActive();

    nav.classList.add("nav-active");
  });
});
function removActive() {
  navs.forEach((nav) => {
    nav.classList.remove("nav-active");
  });
}

const tabs = document.querySelectorAll(".sidebar-item"),
  headerContent = document.querySelectorAll(".header-content"),
  headerParents = document.querySelector(".sidebar-items");

function hideContent() {
  headerContent.forEach((item) => {
    item.style.display = "none";
  });
  tabs.forEach((item) => {
    item.classList.remove("item-active");
  });
}
function showContent(i = 0) {
  headerContent[i].style.display = "block";
  tabs[i].classList.add("item-active");
}
hideContent();
showContent();

headerParents.addEventListener("click", (event) => {
  if (event.target && event.target.classList.contains("sidebar-item")) {
    tabs.forEach((item, i) => {
      if (event.target == item) {
        hideContent();
        showContent(i);
      }
    });
  }
});

// ! About-section
// Seeds-section

const seedsTab = document.querySelectorAll(".seedeses"),
  seedsContent = document.querySelectorAll(".seeds-item_img"),
  seedsParents = document.querySelector(".seeds-item");

function seedsHideContent() {
  seedsTab.forEach((tab) => {
    tab.classList.remove("seedeses-active");
  });
  seedsContent.forEach((tab) => {
    tab.style.display = "none";
  });
}
function seedsShowContent(i = 0) {
  seedsTab[i].classList.add("seedeses-active");
  seedsContent[i].style.display = "block";
}
seedsHideContent();
seedsShowContent();

seedsParents.addEventListener("click", (e) => {
  if (e.target && e.target.classList.contains("seedeses")) {
    seedsTab.forEach((tab, i) => {
      if (e.target == tab) {
        seedsHideContent();
        seedsShowContent(i);
      }
    });
  }
});

// timer
var countDownDate = new Date("Jan 5, 2022 15:37:25").getTime();

var x = setInterval(function () {
  var now = new Date().getTime();

  var distance = countDownDate - now;

  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("demo").innerHTML =
    days + "kun " + hours + "soat " + minutes + "minut " + seconds + "sekund ";

  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 1000);

// ! Seds-section
// Weather-section
const api = {
  key: "e71571d2dba689fd3b61395d0ecc870c",
  baseurl: "https://api.openweathermap.org/data/2.5/",
};

const input = document.querySelector(".search");
input.addEventListener("keypress", setQuery);

function setQuery(e) {
  if (e.keyCode == 13) {
    e.preventDefault();
    getResults(input.value);
  }
}
function getResults(query) {
  fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}

function displayResults(weather) {
  let city = document.querySelector(".city");
  city.innerHTML = `${weather.name},${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".days");
  date.innerHTML = dateBuilder(now);

  let norTemp = document.querySelector(".nor-temp");
  norTemp.innerHTML = `${Math.round(weather.main.temp)} °C`;

  let fog = document.querySelector(".fog");
  fog.innerHTML = weather.weather[0].main;

  let temp = document.querySelector(".temp");
  temp.innerHTML = `${Math.round(weather.main.temp_min)} °C /  ${Math.round(
    weather.main.temp_max
  )} °C `;
}
function dateBuilder(b) {
  let months = [
    "Yanvar",
    "Fevral",
    "Mart",
    "Aprel",
    "May",
    "Iyun",
    "Iyul",
    "Avgust",
    "Sentyabr",
    "Oktyabr",
    "Noyabr",
    "Dekabr",
  ];

  let days = [
    "Yakshanba",
    "Dushanba",
    "Seshanba",
    "Chorshanba",
    "Payshanba",
    "Juma",
    "Shanba",
  ];
  let day = days[b.getDay()];
  let date = b.getDate();
  let month = months[b.getMonth()];
  let year = b.getFullYear();
  return `${day} ${date} ${month} ${year}`;
}
// Slider
const slideImg = document.querySelector(".slide-img"),
  next = document.querySelector(".next"),
  prev = document.querySelector(".prev"),
  image = document.querySelectorAll(".slide-img img");

let count = 0;
function slideShow() {
  if (count > image.length - 1) {
    count = 0;
  } else if (count < 0) {
    count = image.length - 1;
  }
  slideImg.style.transform = `translateX(${-count * 25}%)`;
}
next.addEventListener("click", function change() {
  count++;
  slideShow();
  resetInterval();
});
prev.addEventListener("click", function change() {
  count--;
  slideShow();
  resetInterval();
});
let interval = setInterval(run, 3000);

function run() {
  count++;
  slideShow();
}
function resetInterval() {
  clearInterval(interval);
  interval = setInterval(run, 3000);
}
// ! Weather-section
// Melons - section;
// const melonsImg = document.querySelectorAll(".melons-images"),
//   melonsPrev = document.querySelector(".melon-prev"),
//   melonsNext = document.querySelectorAll(".melon-next"),
//   imgMelon = document.querySelectorAll(".melons-image"),
const heart = document.querySelectorAll(".fa-heart");

// melonsNext.forEach((item) => {
//   item.addEventListener("click", () => {
//     melonsImg.forEach((imags) => {
//       imags.style.transform = "translateX(-220px)";
//     });
//   });
// });

heart.forEach((item) => {
  item.addEventListener("click", () => {
    if (item.style.color == "red") {
      item.style.color = "black";
    } else {
      item.style.color = "red";
    }
  });
});

//Modal-section
const modal = document.querySelector(".modal-section"),
  btns = document.querySelectorAll(".btn-modal"),
  close = document.querySelector(".close");

btns.forEach((btn) => {
  btn.addEventListener("click", openModal);
});
function openModal() {
  modal.style.display = "block";
}
function closeModal() {
  modal.style.display = "none";
}
close.addEventListener("click", closeModal);
// ! Modal-section
// Accordion-section
const accBtn = document.querySelectorAll(".acc-btn");
accBtn.forEach((acc) => {
  acc.addEventListener("click", () => {
    acc.classList.add("active");
    const panel = acc.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
});
// ! Accordion-section
// Loader
const loader = document.querySelector(".loader");
setTimeout(function () {
  loader.style.opacity = "0";
  setTimeout(function () {
    loader.style.display = "none";
  }, 7000);
}, 7000);

//   ! Loader
