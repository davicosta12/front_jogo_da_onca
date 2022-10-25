import { Cor } from "../gameBoard/Cor";
import { Peca } from "../gameBoard/Peca";
import { Tabuleiro } from "../gameBoard/Tabuleiro";

export class Dog extends Peca {

  tipo: string;

  constructor(_tab: Tabuleiro, _cor: Cor) {
    super(_tab, _cor);
    this.tipo = "D";
  }

  public ToString(): string {
    return `D`;
  }
}