export default class ChoixNomJoueur {
  Joueur1;
  Joueur2;
  constructor(Joueur1, Joueur2) {
    this.Joueur1 = Joueur1;
    this.Joueur2 = Joueur2;
  }

  PremierJoueurEnCours() {
    let HTML = `<p class'joueur> A toi joueur ${this.Joueur1}</p>`;
    document.querySelector(".joueur").innerHTML = HTML;
  }
  SecondJoueurEnCours() {
    let HTML = `<p class'joueur> A toi joueur ${this.Joueur2}</p>`;
    document.querySelector(".joueur").innerHTML = HTML;
  }
  get joueur1() {
    return this.joueur1;
  }

  set joueur1(joueur1) {
    this.joueur1 = joueur1;
  }
}
