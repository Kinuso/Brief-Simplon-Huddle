document.addEventListener("DOMContentLoaded", function () {
  const mainBloc1Elements = document.querySelectorAll(".mainbloc1");
  const mainBloc2Element = document.querySelector(".mainbloc2");
  const boutonCentralElement = document.getElementById("boutonCentral");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("slide-in");
        }
      });
    },
    { threshold: 0.5 }
  );

  mainBloc1Elements.forEach((element) => {
    observer.observe(element);
  });

  observer.observe(mainBloc2Element);
  observer.observe(boutonCentralElement);
});

// Fonction pour interpoler entre deux couleurs en fonction d'un pourcentage
function interpolateColor(color1, color2, percentage) {
  const color1HSL = color1.match(/\d+/g).map(Number);
  const color2HSL = color2.match(/\d+/g).map(Number);

  const resultHSL = color1HSL.map((value, index) => {
    return value + (color2HSL[index] - value) * percentage;
  });

  return `hsl(${resultHSL[0]}, ${resultHSL[1]}%, ${resultHSL[2]}%)`;
}

window.addEventListener("scroll", function () {
  const scrollPercentage =
    window.scrollY /
    (document.documentElement.scrollHeight - window.innerHeight);

  // Set the width of the scroll line based on the scroll percentage
  document.getElementById("ligneScroll").style.width =
    scrollPercentage * 100 + "%";

  // Définir les couleurs de départ et d'arrêt
  const endColor = "hsl(193, 100%, 96%)";
  const startColor = "hsl(192, 100%, 9%)";
  const middleColor = "hsl(208, 11%, 55%)";

  // Interpoler entre les couleurs en fonction du pourcentage de défilement
  let color;
  if (scrollPercentage < 0.5) {
    color = interpolateColor(startColor, middleColor, scrollPercentage * 2);
  } else {
    color = interpolateColor(
      middleColor,
      endColor,
      (scrollPercentage - 0.5) * 2
    );
  }

  // Sélectionne l'élément avec l'ID "ligneScroll"
  const ligneScroll = document.getElementById("ligneScroll");

  // Met à jour la couleur de fond de l'élément avec l'ID "ligneScroll"
  if (ligneScroll) {
    ligneScroll.style.backgroundColor = color;
  }
});

// Texte H1 Qui se genere

const resolver = {
  resolve: function resolve(options, callback) {
    // The string to resolve
    const resolveString =
      options.resolveString ||
      options.element.getAttribute("data-target-resolver");
    const combinedOptions = Object.assign({}, options, {
      resolveString: resolveString,
    });

    function getRandomInteger(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function randomCharacter(characters) {
      return characters[getRandomInteger(0, characters.length - 1)];
    }

    function doRandomiserEffect(options, callback) {
      const characters = options.characters;
      const timeout = options.timeout;
      const element = options.element;
      const partialString = options.partialString;

      let iterations = options.iterations;

      setTimeout(() => {
        if (iterations >= 0) {
          const nextOptions = Object.assign({}, options, {
            iterations: iterations - 1,
          });

          // Ensures partialString without the random character as the final state.
          if (iterations === 0) {
            element.textContent = partialString;
          } else {
            // Replaces the last character of partialString with a random character
            element.textContent =
              partialString.substring(0, partialString.length - 1) +
              randomCharacter(characters);
          }

          doRandomiserEffect(nextOptions, callback);
        } else if (typeof callback === "function") {
          callback();
        }
      }, options.timeout);
    }

    function doResolverEffect(options, callback) {
      const resolveString = options.resolveString;
      const characters = options.characters;
      const offset = options.offset;
      const partialString = resolveString.substring(0, offset);
      const combinedOptions = Object.assign({}, options, {
        partialString: partialString,
      });

      doRandomiserEffect(combinedOptions, () => {
        const nextOptions = Object.assign({}, options, { offset: offset + 1 });

        if (offset <= resolveString.length) {
          doResolverEffect(nextOptions, callback);
        } else if (typeof callback === "function") {
          callback();
        }
      });
    }

    doResolverEffect(combinedOptions, callback);
  },
};

/* Some GLaDOS quotes from Portal 2 chapter 9: The Part Where He Kills You
 * Source: http://theportalwiki.com/wiki/GLaDOS_voice_lines#Chapter_9:_The_Part_Where_He_Kills_You
 */
const strings = ["Build The Community Your Fans Will Love"];
let counter = 0;

const options = {
  // Initial position
  offset: 0,
  // Timeout between each random character
  timeout: 5,
  // Number of random characters to show
  iterations: 10,
  // Random characters to pick from
  characters: [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "x",
    "y",
    "x",
    "#",
    "%",
    "&",
    "-",
    "+",
    "_",
    "?",
    "/",
    "\\",
    "=",
  ],
  // String to resolve
  resolveString: strings[counter],
  // The element
  element: document.querySelector("[data-target-resolver]"),
};

// Callback function when resolve completes
function callback() {
  setTimeout(() => {
    counter++;

    if (counter >= strings.length) {
      counter = 0;
    }

    let nextOptions = Object.assign({}, options, {
      resolveString: strings[counter],
    });
    resolver.resolve(nextOptions, callback);
  }, 1000);
}

resolver.resolve(options, callback);

// Ecouteur d'évenement
document.addEventListener("DOMContentLoaded", function () {
  let scrollToTopBtn = document.getElementById("upButton");

  // Seuil de défilement pour montrer le bouton
  let scrollThreshold = 650;

  // Afficher ou masquer le bouton en fonction du défilement
  window.addEventListener("scroll", function () {
    if (document.documentElement.scrollTop > scrollThreshold) {
      scrollToTopBtn.style.display = "block";
    } else {
      scrollToTopBtn.style.display = "none";
    }
  });

  // Remonter en haut lors du clic sur le bouton et défilement
  scrollToTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Utiliser le défilement fluide
    });
  });
});

// Pop up affichant le formulaire d'inscription
function afficherPopup() {
  let popup = document.getElementById("popup");
  popup.style.display = "block";
  // let test = document.querySelector('.testFlou');
  // test.classList.add('popupOpen');
}
function fermerPopup() {
  let popup = document.getElementById("popup");
  popup.style.display = "none";
  // let test = document.querySelector('.testFlou');
  // test.classList.remove('popupOpen');
}

function bloquerScroll() {
  document.body.classList.add("no-scroll");
}

function debloquerScroll() {
  document.body.classList.remove("no-scroll");
}
