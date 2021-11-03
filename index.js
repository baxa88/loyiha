window.addEventListener("DOMContentLoaded", () => {
  let options = {
    strings: [
      "<i>Siz Agro-olam saytiga xush </i>kelibsiz. ",
      "&amp; Bundan xursandmiz",
    ],
    typeSpeed: 80,
  };

  let typed = new Typed(".element", options);

  // Api-section

  const api = {
    key: "e71571d2dba689fd3b61395d0ecc870c",
    baseurl: "https://api.openweathermap.org/data/2.5/",
  };

  const searchBox = document.querySelector(".search-box");
  searchBox.addEventListener("keypress", setQuery);

  function setQuery(e) {
    if (e.keyCode == 13) {
      getResults(searchBox.value);
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
    let city = document.querySelector(" .city");
    city.innerHTML = `${weather.name},${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector(" .data-app");
    date.innerHTML = dateBuilder(now);

    let temp = document.querySelector(".temp");
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C </span>`;

    let weatherEl = document.querySelector(".weather");
    weatherEl.innerHTML = weather.weather[0].main;

    let hilow = document.querySelector(".hi-low");
    hilow.innerHTML = `${Math.round(weather.main.temp_min)}°C / ${Math.round(
      weather.main.temp_max
    )}°C  `;
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
  // !Api-section
  // slide-section
  const slides = document.querySelector(".slides"),
    slideImg = document.querySelectorAll(".slides img"),
    prev = document.querySelector(".prev"),
    next = document.querySelector(".next");

  let slideIndex = 0;

  function slideShow() {
    if (slideIndex > slideImg.length - 1) {
      slideIndex = 0;
    } else if (slideIndex < 0) {
      slideIndex = slideImg.length - 1;
    }
    slides.style.transform = `translateX(${slideIndex * -800}px)`;
  }
  next.addEventListener("click", function change() {
    slideIndex++;
    resetInterval();
    slideShow();
  });
  prev.addEventListener("click", function change() {
    slideIndex--;
    resetInterval();
    slideShow();
  });
  let interval = setInterval(run, 6000);

  function run() {
    slideIndex++;
    slideShow();
  }
  function resetInterval() {
    clearInterval(interval);
    interval = setInterval(run, 6000);
  }
  // ! slide-section
  // Loader
  const loader = document.querySelector(".loader");
  setTimeout(function () {
    loader.style.opacity = "0";
    setTimeout(function () {
      loader.style.display = "none";
    }, 8000);
  }, 8000);

  //   ! Loader

  //Tabs;
  const tabs = document.querySelectorAll(".header-item"),
    tabContent = document.querySelectorAll(".tabcontent"),
    headerParents = document.querySelector(".header-items");

  function hideContent() {
    tabContent.forEach((item) => {
      item.style.display = "none";
    });
    tabs.forEach((item) => {
      item.classList.remove("item-active");
    });
  }

  function showContent(i = 0) {
    tabContent[i].style.display = "block";
    tabs[i].classList.add("item-active");
  }
  hideContent();
  showContent();

  headerParents.addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains("header-item")) {
      tabs.forEach((item, i) => {
        if (e.target == item) {
          hideContent();
          showContent(i);
        }
      });
    }
  });

  //   ! Tabs

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
  // !  Accordion-section
  // Modal

  const allModalBtn = document.querySelectorAll("[data-modal]"),
    modal = document.querySelector(".modal"),
    modalClose = document.querySelector(".modal-close");

  allModalBtn.forEach((btn) => {
    btn.addEventListener("click", openModal);
  });

  function openModal() {
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
    clearInterval(modalTimer);
  }
  function closeModal() {
    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = "";
  }

  modalClose.addEventListener("click", closeModal);

  const modalTimer = setTimeout(openModal, 12000);

  modal.addEventListener("click", (e) => {
    if (e.target == modal) {
      closeModal();
    }
  });

  function showMyModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      openModal();
      window.removeEventListener("scroll", showMyModalByScroll);
    }
  }
  window.addEventListener("scroll", showMyModalByScroll);
  // !  Modal
  // Timer

  let deadline = "2022-01-01";

  function getTime(endtime) {
    const total = Date.parse(endtime) - Date.parse(new Date()),
      days = Math.floor(total / (1000 * 60 * 60 * 24)),
      seconds = Math.floor((total / 1000) % 60),
      minutes = Math.floor((total / 1000 / 60) % 60),
      hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    return {
      total: total,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }
  function getZero(num) {
    if (num >= 0 && num < 10) {
      return "0" + num;
    } else {
      return num;
    }
  }
  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const time = getTime(endtime);
      days.innerHTML = getZero(time.days);
      hours.innerHTML = getZero(time.hours);
      minutes.innerHTML = getZero(time.minutes);
      seconds.innerHTML = getZero(time.seconds);
      if (time.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }
  setClock(".timer", deadline);
  // ! Timer
  const promotionTab = document.querySelectorAll(".promotion-item"),
    promotionContent = document.querySelectorAll(".promotion-descr_content"),
    promotionParents = document.querySelector(".promotion-items");

  function proContent() {
    promotionContent.forEach((item) => {
      item.style.display = "none";
    });
    promotionTab.forEach((tab) => {
      tab.classList.remove("item-active");
    });
  }

  function showProContent(i = 0) {
    promotionContent[i].style.display = "block";
    promotionTab[i].classList.add("item-active");
  }

  proContent();
  showProContent();

  promotionParents.addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains("promotion-item")) {
      promotionTab.forEach((tab, i) => {
        if (e.target == tab) {
          proContent();
          showProContent(i);
        }
      });
    }
  });
});
