import jump from "./node_modules/jump.js/dist/jump.module.js";
// pobieranie headera
const header = document.querySelector("header");
//pobierani nav listy
const navList = [...document.querySelectorAll(".menu ul li")];
//pobieranie całej sekcji history
const history = document.querySelector(".history-wrap");
//pobieranie sekcji history
const historyContent = document.querySelector(".history-articles");
// pobieranie strzałki w headerze
const headerArrow = document.querySelector(".header-arrow");
//strzałka powrotu na górę strony
const arrowReturnUpPage = document.querySelector(".goToUp");
//pobieranie navi
const navigation = document.querySelector("nav");
//pobieranie linii sekcja history
const lineHistory = document.querySelector(".history-line");
//pobieranie tylko sekcji history
const historySection = document.querySelector(".history");
//pobieranie elementów do slideArticle
const articles = [...document.querySelectorAll(".year")];
//pobieranie zdjęć z sekcji history
const articlesImg = [...document.querySelectorAll(".history-photo")];
//pobieranie footera
const footer = document.querySelector(".about-wrap");
//loader
const loader = document.querySelector(".loader");

// loader
window.addEventListener("load", () => {
  loader.classList.add("loading");
  document.querySelector(".loader-img").classList.add("loading");
});

//przewijanie do sekcji
// function goToSection(e) {
//   const key = e.target.getAttribute("data-key")
//   const runSection = document.querySelector(`div[data-key="${key}"]`);
//   let scroll = scrollY;
//   let heightFooter = 0;
//   const runToSection = setInterval(() => {
//     let offset = window.innerHeight - runSection.offsetHeight;

//     if (Math.floor(window.scrollY) >= runSection.offsetTop) {
//       clearInterval(runToSection);
//     } else {
//       // console.log(key);
//       scroll += 30;
//       window.scrollTo(0, scroll);
//     }
//   }, 0.2);
// }

// navList.forEach((item) => {
//   item.addEventListener("click", goToSection)
// })

//funkcja przewijania strony na dół
const arrowDown = () => {
  let scroll = scrollY;
  let heightHeader = header.offsetHeight;
  const runToHeader = setInterval(() => {
    if (Math.floor(window.scrollY) >= heightHeader) {
      clearInterval(runToHeader);
    } else {
      scroll += 10;
      window.scrollTo(0, scroll);
    }
  }, 1);
};

//powrót do góry strony
const returnUpPage = () => {
  let scroll = scrollY;
  const runToHeader = setInterval(() => {
    if (Math.floor(scroll) <= 0) {
      clearInterval(runToHeader);
    } else {
      scroll -= 30;
      window.scrollTo(0, scroll);
    }
  }, 1);
};

//sprawdzenie poziomu scrolla i pokaż/ukryj strzałkę do góry
const checkScroll = () => {
  const arrowUp = document.querySelector(".goToUp");
  if (window.scrollY > 20) {
    arrowUp.classList.add("arrowActive");
  } else {
    arrowUp.classList.remove("arrowActive");
  }

  //sekcja historia, wjeżdzanie elementów po scrollu
  slideArticle();
};

const slideArticle = () => {
  paitingLine();
};

//rysowanie lini
const paitingLine = () => {
  const sizeHistory = historyContent.offsetHeight;
  const startPaint = header.offsetHeight / 2;
  const info = window.innerHeight / 2;
  const abc = Math.floor(window.scrollY) - header.offsetHeight + info;

  if (window.scrollY + info > startPaint) {
    lineHistory.style.height = `${abc}px`;
  } else if (window.scrollY < header.offsetHeight) {
    lineHistory.style.height = `0px`;
  }

  if (abc > sizeHistory) {
    lineHistory.style.height = `${sizeHistory}px`;
  }
  slideSection(abc);
};

//po scrolowaniu dodaj klasę active
const slideSection = line => {
  //wjazd artykułow
  const sizeArticle = historyContent.offsetHeight / 6;
  if (
    Math.floor(line / sizeArticle) >= 0 &&
    Math.floor(line / sizeArticle) <= articles.length - 1
  ) {
    articles[Math.floor(line / sizeArticle)].classList.add("active");
  }

  //wjazd obrazków
  const sizePictures = historyContent.offsetHeight / 5;
  if (
    Math.floor(line / sizePictures) >= 0 &&
    Math.floor(line / sizePictures) <= articlesImg.length - 1
  ) {
    articlesImg[Math.floor(line / sizePictures)].classList.add("activeImg");
  }
};

//funkcja jeśli odświeżymy stronę poza lub w miejscu sekcji history
const checkSlide = () => {
  const info = window.innerHeight / 2;
  const abc = Math.floor(window.scrollY) - header.offsetHeight + info;
  const sizeArticle = history.offsetHeight / 6;
  articles.forEach((article, index) => {
    if (index <= Math.floor(abc / sizeArticle)) {
      article.classList.add("active");
    }
  });
  const sizePictures = historyContent.offsetHeight / 5;
  articlesImg.forEach((articleImg, index) => {
    if (index <= Math.floor(abc / sizePictures)) {
      articleImg.classList.add("activeImg");
    }
  });
};
checkSlide();
headerArrow.addEventListener("click", arrowDown);
window.addEventListener("scroll", checkScroll);
arrowReturnUpPage.addEventListener("click", returnUpPage);

//slider z piwami

//button lewy
const btnLeft = document.querySelector(".prev");
//button prawy
const btnRight = document.querySelector(".next");
//główne okno z divami
const mainBeers = document.querySelector(".beers");
//okno ze wszystkimi kartami
const beers = document.querySelector(".beers-content");
//tablica z nazwami
const nameBeers = [
  "",
  "Porter Bałtycki",
  "potrójny złoty",
  "poczwórny bursztynowy",
  "belgian ipa",
  "porter malinowy",
  "porter płatki dębowe",
  "russian imperial stout",
  "barley wine",
  "Sherry Oloroso"
];
const beerItems = [...document.querySelectorAll(".beer")];
const paragraphNext = document.querySelector(".next p");
const paragraphPrev = document.querySelector(".prev p");

let counter = 0;
let size = beers.clientWidth;
let numberBeer = 1;

const next = () => {
  if (counter > beerItems.length - 2) return;
  beers.style.transition = "transform 0.4s ease-in-out";
  counter++;
  beers.style.transform = `translateX(${-size * counter}px)`;
  numberBeer++;
  paragraphNext.style.animation = "hide 0.2s both";
  paragraphPrev.style.animation = "hide 0.2s both";
  console.log(counter);
};

const changeName = () => {
  paragraphNext.style.animation = "show 0.2s both";
  paragraphPrev.style.animation = "show 0.2s both";
  let showBeer = numberBeer + 1;
  paragraphNext.textContent = nameBeers[numberBeer + 1];
  paragraphPrev.textContent = nameBeers[numberBeer - 1];
};

const back = () => {
  if (counter === 0) return;
  beers.style.transition = "transform 0.4s ease-in-out";
  counter--;
  beers.style.transform = `translateX(${-size * counter}px)`;
  numberBeer--;
  paragraphNext.style.animation = "hide 0.2s both";
  paragraphPrev.style.animation = "hide 0.2s both";
};
paragraphPrev.addEventListener("animationend", changeName);
paragraphNext.addEventListener("animationend", changeName);

btnLeft.addEventListener("click", back);
btnRight.addEventListener("click", next);

// lista piw
const listBtn = document.querySelector(".overlap");
const listBeers = document.querySelector(".listBeers");
const itemsBeer = [...document.querySelectorAll(".itemBeer")];

const choiseBeer = e => {
  const key = e.target.getAttribute("data-id");
  counter = key - 1;
  numberBeer = key;
  listBeers.classList.remove("listActive");
  beers.style.transition = "transform 0.4s ease-in-out";
  beers.style.transform = `translateX(${-size * (key - 1)}px)`;
  changeName();
};

//wybór z listy piw
itemsBeer.forEach(item => {
  item.addEventListener("click", choiseBeer);
});

const showList = () => {
  listBeers.classList.toggle("listActive");
};

window.addEventListener("click", e => {
  if (e.target.getAttribute("data-key") == 3) {
    listBeers.classList.remove("listActive");
  }

  // console.log(e.target);
});

listBtn.addEventListener("click", showList);

const resize = () => {
  mainBeers.offsetWidth;
  size = beers.clientWidth;
  beers.style.transform = `translateX(${-size * counter}px)`;
  console.log("działa");
};
window.addEventListener("resize", resize);

const nav = document.querySelector("nav");
window.addEventListener("scroll", () => {
  console.log("działa");
  if (scrollY > 50) {
    nav.classList.add("nav-active");
  } else {
    nav.classList.remove("nav-active");
  }
});

let list = document.querySelectorAll(".menu ul");

list.forEach(item => {
  item.addEventListener("click", e => {
    let dataId = e.target.getAttribute("id");
    console.log(dataId);
    if (dataId == "home") jump(".wrap");
    if (dataId == "brewery")
      jump(".history-wrap", {
        offset: -20
      });
    if (dataId == "ourBeers")
      jump(".beers-wrap", {
        offset: -30
      });
    if (dataId == "technology")
      jump(".open-fermentation-wrap", {
        offset: -30
      });
    if (dataId == "contact")
      jump(".about-wrap", {
        offset: -80
      });
  });
});
