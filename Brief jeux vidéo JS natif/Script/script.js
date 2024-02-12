let array = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
];
let joueur = "1";
const boardElement = document.querySelector("#board");

function init_game() {
  printBoard();
}

function printBoard() {
  console.log(joueur);
  for (let i = 0; i < array.length; i++) {
    // je parcours TOUTES les lignes de ma matrice (tableau dans le tableau) 6 lignes !!!!! index i donc si i=0 alors c'est la premiere ligne !!!!
    for (let y = 0; y < array[i].length; y++) {
      // la pour CHAQUE LIGNE je parcours les COLONNES donc pour la ligne 0 je parcours les 7 colones existantes aves l'index Y donc si y =0 alors c'est la premiere COLONE

      console.log(array[i][y]);
      const divAjouter = document.createElement("div");
      divAjouter.classList = "emplacement";
      divAjouter.dataset.line = i; // dataset est un autre type pour définir un appel d'attribut
      divAjouter.dataset.column = y;
      boardElement.appendChild(divAjouter);
    }
  }
}

init_game();

const emplacements = document.querySelectorAll(".emplacement");

for (let i = 0; i < emplacements.length; i++) {
  emplacements[i].addEventListener("click", function () {
    let columnIndex = parseInt(this.getAttribute("data-column"), 10);

    // Trouver la ligne la plus basse non remplie
    let lowestEmptyRowIndex = -1;
    for (let y = array.length - 1; y >= 0; y--) {
      if (array[y][columnIndex] === 0) {
        lowestEmptyRowIndex = y;
        break;
      }
    }

    // Si on joue dans une colonne deja remplie, une alerte apparait
    if (lowestEmptyRowIndex === -1) {
      alert("La colonne est pleine");
      console.log("La colonne est pleine");
      return;
    }

    // Recuperer l'information de quelle ligne et quelle colonne
    const divToChange = document.querySelector(
      `[data-line="${lowestEmptyRowIndex}"][data-column="${columnIndex}"]`
    );

    // Placer le jeton sur la bonne ligne et colonne
    if (joueur == "1") {
      array[lowestEmptyRowIndex][columnIndex] = 1;
      divToChange.style.backgroundColor = "red";
      let gagnant = verifWin(joueur);
      verifWin(joueur);
      joueur = "2";
      if (gagnant) {
        joueur = "1";
      }
    } else {
      array[lowestEmptyRowIndex][columnIndex] = 2;
      divToChange.style.backgroundColor = "black";
      verifWin(joueur);
      joueur = "1";
    }
  });
}

function verifWin(joueur) {
  //Win conditions horizontale
  for (let i = 0; i < array.length; i++) {
    for (let y = 0; y < array[i].length - 3; y++) {
      let counter = 0;
      for (let w = 0; w < 4; w++) {
        if (array[i][y + w] == joueur) {
          counter++;
        } else {
          break;
        }
      }
      if (counter == 4) {
        console.log(joueur + " Gagne");
        alert(joueur + " Gagne");
        resetGame();
        return true;
      }
    }
  }

  //Win condition verticale
  for (let y = 0; y < array[0].length; y++) {
    for (let i = 0; i < array.length - 3; i++) {
      let counter = 0;
      for (let w = 0; w < 4; w++) {
        if (array[i + w][y] == joueur) {
          counter++;
        } else {
          break;
        }
      }
      if (counter == 4) {
        console.log(joueur + " Gagne");
        alert(joueur + " Gagne");
        resetGame();
        return true;
      }
    }
  }
  //
  //
  //
  // Win condition diagonale haut gauche vers bas droite
  for (let y = 0; y < array[0].length - 3; y++) {
    for (let i = 0; i < array.length - 3 && i < array[i].length; i++) {
      let counter = 0;

      for (let w = 0; w < 4; w++) {
        if (array[i + w][y + w] == joueur) {
          console.log(counter + " k " + array[i + w][y + w]);
          counter++;
        } else {
          break;
        }
      }
      if (counter == 4) {
        console.log(joueur + " Gagne");
        alert(joueur + " Gagne");
        resetGame();
        return true;
      }
    }
  }
  // Win condition diagonale bas gauche vers haut droite
  for (let y = 0; y < array[0].length - 3; y++) {
    for (let i = 0; i < array.length - 3 && i < array[i].length; i++) {
      let counter = 0;
      for (let w = 0; w < 4; w++) {
        if (array[i + w][y + w] == joueur) {
          console.log(counter + " k " + array[i + w][y - w]);
          counter++;
        } else {
          break;
        }
      }
      if (counter == 4) {
        console.log(joueur + " Gagne");
        alert(joueur + " Gagne");
        resetGame();
        return true;
      }
    }
  }
  return false; // Pas de victoire return false on continue le jeu
}

function resetGame() {
  for (let i = 0; i < array.length; i++) {
    for (let y = 0; y < array[i].length; y++) {
      array[i][y] = 0;
      const resetBoard = document.querySelector(
        `[data-line="${i}"][data-column="${y}"]`
      );
      resetBoard.style.backgroundColor = "wheat";
    }
  }
}
