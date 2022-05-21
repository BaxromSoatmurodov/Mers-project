/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/accordion.js":
/*!*********************************!*\
  !*** ./js/modules/accordion.js ***!
  \*********************************/
/***/ ((module) => {

function accordion() {
  // ACCORDION

  const accordion = document.querySelectorAll(".accordion");

  accordion.forEach((acc) => {
    acc.addEventListener("click", () => {
      acc.classList.toggle("active");
      const panel = acc.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });
}
module.exports = accordion;


/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((module) => {

function cards() {
  // CLASS

  // const getResource = async (url) => {
  //   const res = await fetch(url);
  //   if (!res.ok) {
  //     throw new Error(`could not fetch ${url}  ${res.status}`);
  //   }
  //   return await res.json();
  // };
  // getResource("http://localhost:3000/menu").then((data) => {
  //   data.forEach(({ img, altimg, title, descr, price }) => {
  //     new CarCard(
  //       img,
  //       altimg,
  //       title,
  //       descr,
  //       price,
  //       ".menu .container"
  //     ).render();
  //   });
  // });
  axios.get("http://localhost:3000/menu").then((data) => {
    data.data.forEach(({ img, altimg, title, descr, price }) => {
      new CarCard(
        img,
        altimg,
        title,
        descr,
        price,
        ".menu .container"
      ).render();
    });
  });
  class CarCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classess) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classess = classess;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 10;
      this.changeToUSD();
    }

    changeToUSD() {
      this.price = this.price * this.transfer;
    }

    render() {
      const element = document.createElement("div");
      if (this.classess.length === 0) {
        this.classess = "menu__item";
        element.classList.add(this.classess);
      } else {
        this.classess.forEach((className) => element.classList.add(className));
      }
      element.innerHTML = `
        <div class="menu__item">
          <img src=${this.src} alt=${this.alt} />
          <h3 class="menu__item-subtitle">${this.title}</h3>
          <div class="menu__item-descr">${this.descr}</div>
          <div class="menu__item-divider"></div>
          <div class="menu__item-price">
            <div class="menu__item-cost">Price:</div>
            <div class="menu__item-total"><span>${this.price}</span> $</div>
          </div>
        </div>
      `;
      this.parent.append(element);
    }
  }
  // new CarCard(
  //   "img/tabs/1.jpg",
  //   "car",
  //   "2021 Mercedes-Benz C-Class",
  //   `The 2021 Mercedes-Benz C-Class finishes in the top half of our
  //   luxury small car rankings. It's powerful and upscale, but it has
  //   so-so handli...`,
  //   100,
  //   ".menu .container"
  //   // 'red',
  //   // 'black'
  // ).render();
  // new CarCard(
  //   "img/tabs/2.jpg",
  //   "car",
  //   "2021 Mercedes-Benz CLA-Class",
  //   `The 2021 Mercedes-Benz C-Class finishes in the top half of our
  //   luxury small car rankings. It's powerful and upscale, but it has
  //   so-so handli...`,
  //   100,
  //   ".menu .container"
  // ).render();
  // new CarCard(
  //   "img/tabs/3.jpg",
  //   "car",
  //   "2021 Mercedes-Benz SCLA",
  //   `The 2021 Mercedes-Benz C-Class finishes in the top half of our
  //   luxury small car rankings. It's powerful and upscale, but it has
  //   so-so handli...`,
  //   100,
  //   ".menu .container"
  // ).render();
}
module.exports = cards;


/***/ }),

/***/ "./js/modules/data.js":
/*!****************************!*\
  !*** ./js/modules/data.js ***!
  \****************************/
/***/ ((module) => {

function data() {
  // DATA
  const deadline = "2022-08-11";

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
}
module.exports = data;


/***/ }),

/***/ "./js/modules/form.js":
/*!****************************!*\
  !*** ./js/modules/form.js ***!
  \****************************/
/***/ ((module) => {

function form() {
  // Form
  const forms = document.querySelectorAll("form");
  forms.forEach((item) => {
    bindPostData(item);
  });
  const Massage = {
    loading: "img/form/spinner.svg",
    success: "success",
    failure: "error",
  };
  const postData = async (url, data) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: data,
    });
    return await res.json();
  };
  function bindPostData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const formMassage = document.createElement("img");
      formMassage.src = Massage.loading;
      formMassage.style.cssText = `
      display:block;
      margin:0 auto`;
      form.insertAdjacentElement("afterend", formMassage);
      // const request = new XMLHttpRequest();
      // request.open("POST", "server1.php");
      // request.setRequestHeader("Content-type", "application/json");
      const formData = new FormData(form);
      // const object = {};
      // formData.forEach(function (value, key) {
      //   object[key] = value;
      // });
      const json = JSON.stringify(Object.fromEntries(formData.entries()));
      // const json = JSON.stringify(object);

      // fetch("server1.php", {
      //   method: "POST",
      // headers: {
      //   "Content-type": "application/json",
      // },
      //   body: formData,
      // })
      // .then((data) => {
      //   return data.text();
      // })
      postData("http://localhost:3000/request", json)
        .then((data) => {
          console.log(data);
          showThinksModal(Massage.success);
          formMassage.remove();
        })
        .catch(() => {
          showThinksModal(Massage.failure);
        })
        .finally(() => {
          form.reset();
        });

      // request.send(json);
      // request.addEventListener("load", () => {
      //   if (request.status === 200) {
      //     console.log(request.response);
      //     showThinksModal(Massage.success);
      //     form.reset();
      //     formMassage.remove();
      //   } else {
      //     showThinksModal(Massage.failure);
      //   }
      // });
    });
  }
  function showThinksModal(Massage) {
    const prevdialogModal = document.querySelector(".modal__dialog");

    prevdialogModal.classList.add("hide");
    openModal();

    const ThinksModal = document.createElement("div");
    ThinksModal.classList.add("modal__dialog");
    ThinksModal.innerHTML = `
    <div class="modal__content">
      <div class="modal__close" data-close>x</div>
      <div class="modal__title">${Massage}</div>
    </div>`;
    document.querySelector(".modal").append(ThinksModal);
    setTimeout(() => {
      ThinksModal.remove();
      prevdialogModal.classList.add("show");
      prevdialogModal.classList.remove("hide");
      closeModal();
    }, 4000);
  }
}
module.exports = form;


/***/ }),

/***/ "./js/modules/loader.js":
/*!******************************!*\
  !*** ./js/modules/loader.js ***!
  \******************************/
/***/ ((module) => {

function loader() {
  // LOADER
  const loader = document.querySelector(".loader");
  setTimeout(function () {
    loader.style.opacity = 0;
    setTimeout(function () {
      loader.style.display = "none";
    }, 1500);
  }, 2000);
}
module.exports = loader;


/***/ }),

/***/ "./js/modules/modals.js":
/*!******************************!*\
  !*** ./js/modules/modals.js ***!
  \******************************/
/***/ ((module) => {

function modals() {
  // MODAL
  const allModalBtn = document.querySelectorAll("[data-modal]"),
    modal = document.querySelector(".modal");

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

  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.getAttribute("data-close") === "") {
      closeModal();
    }
  });

  const modalTimer = setTimeout(openModal, 50000);

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
}
module.exports = modals;


/***/ }),

/***/ "./js/modules/sliders.js":
/*!*******************************!*\
  !*** ./js/modules/sliders.js ***!
  \*******************************/
/***/ ((module) => {

function sliders() {
  // SLIDER FIRST WAY (EASY)
  // const slides = document.querySelectorAll('.offer__slide'),
  //   prev = document.querySelector('.offer__slider-prev'),
  //   next = document.querySelector('.offer__slider-next'),
  //   current = document.querySelector('#current'),
  //   total = document.querySelector('#total');

  // let slideIndex = 1;
  // show(slideIndex)
  // function show(s) {
  //   if(s > slides.length){
  //     slideIndex = 1
  //   }
  //   if(s < 1) {
  //     slideIndex = slides.length
  //   }
  //   slides.forEach(item => item.style.cssText = 'display: none')
  //   slides[slideIndex - 1].style.display = 'block'
  //   if(slides.length < 10) {
  //     current.textContent = `0${slideIndex}`
  //   }else{
  //     current.textContent = slideIndex
  //   }
  // }
  // function sliderPlus(s) {
  //   show(slideIndex += 1)
  // }
  // prev.addEventListener('click', () => {
  //   sliderPlus(-1)
  // })
  // next.addEventListener('click', () => {
  //   sliderPlus(1)
  // })

  const slides = document.querySelectorAll(".offer__slide"),
    slider = document.querySelector(".offer__slider"),
    prev = document.querySelector(".offer__slider-prev"),
    next = document.querySelector(".offer__slider-next"),
    current = document.querySelector("#current"),
    total = document.querySelector("#total"),
    slidesWrapper = document.querySelector(".offer__slider-wrapper"),
    width = window.getComputedStyle(slidesWrapper).width,
    slidesField = document.querySelector(".offer__slider-inner");

  let slideIndex = 1,
    offset = 0;

  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
  } else {
    total.textContent = slides.length;
    current.textContent = slideIndex;
  }

  slidesField.style.width = 100 * slides.length + "%";

  slidesField.style.display = "flex";
  slidesField.style.transition = "0.5s all";
  slidesWrapper.style.overflow = "hidden";

  slides.forEach((slide) => {
    slide.style.width = width;
  });

  slider.style.position = "relative";
  let indicator = document.createElement("ol"),
    dots = [];

  indicator.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none
  `;

  slider.append(indicator);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("li");
    dot.setAttribute("data-slide-to", i + 1);
    dot.style.cssText = `
      box-sizing: content-box;
      flex: 0 1 auto;
      width: 30px;
      height: 6px;
      margin: 0 3px;
      cursor: pointer;
      background-color: #fff;
      background-clip: padding-box;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      opacity: .5;
      transform: opacity .6s ease;
    `;
    if (i == 0) {
      dot.style.opacity = 1;
    }
    indicator.append(dot);
    dots.push(dot);
  }
  function deleteNotDigits(str) {
    return +str.replace(/\D/g, "");
  }
  next.addEventListener("click", () => {
    if (offset == deleteNotDigits(width) * (slides.length - 1)) {
      // 650
      offset = 0;
    } else {
      offset += deleteNotDigits(width);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }

    dots.forEach((dot) => (dot.style.opacity = ".5"));
    dots[slideIndex - 1].style.opacity = 1;
  });

  prev.addEventListener("click", () => {
    if (offset == 0) {
      offset = deleteNotDigits(width) * (slides.length - 1);
    } else {
      offset -= deleteNotDigits(width);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }

    dots.forEach((dot) => (dot.style.opacity = ".5"));
    dots[slideIndex - 1].style.opacity = 1;
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      const slideTo = e.target.getAttribute("data-slide-to");

      slideIndex = slideTo;
      offset = deleteNotDigits(width) * (slideTo - 1);
      slidesField.style.transform = `translateX(-${offset}px)`;

      if (slides.length < 10) {
        current.textContent = `0${slideIndex}`;
      } else {
        current.textContent = slideIndex;
      }

      dots.forEach((dot) => (dot.style.opacity = ".5"));
      dots[slideIndex - 1].style.opacity = 1;
    });
  });
}
module.exports = sliders;


/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

function tabs() {
  // TABS
  const tabs = document.querySelectorAll(".tabheader__item"),
    tabContent = document.querySelectorAll(".tabcontent"),
    headerParents = document.querySelector(".tabheader__items");

  function hideTabContent() {
    tabContent.forEach((item) => {
      item.style.display = "none";
    });
    tabs.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
  }

  function showTabContent(i = 0) {
    tabContent[i].style.display = "block";
    tabs[i].classList.add("tabheader__item_active");
  }

  hideTabContent();
  showTabContent();

  headerParents.addEventListener("click", (event) => {
    console.log(event);
    const target = event.target;
    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
}
module.exports = tabs;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
window.addEventListener("DOMContentLoaded", () => {
  const tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
    modals = __webpack_require__(/*! ./modules/modals */ "./js/modules/modals.js"),
    loader = __webpack_require__(/*! ./modules/loader */ "./js/modules/loader.js"),
    data = __webpack_require__(/*! ./modules/data */ "./js/modules/data.js"),
    accordion = __webpack_require__(/*! ./modules/accordion */ "./js/modules/accordion.js"),
    cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js"),
    sliders = __webpack_require__(/*! ./modules/sliders */ "./js/modules/sliders.js"),
    form = __webpack_require__(/*! ./modules/form */ "./js/modules/form.js");
  tabs();
  modals();
  loader();
  data();
  accordion();
  cards();
  sliders();
  form();
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map