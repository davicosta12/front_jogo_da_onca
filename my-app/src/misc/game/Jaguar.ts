import { Cor } from "../gameBoard/Cor";
import { Peca } from "../gameBoard/Peca";
import { Tabuleiro } from "../gameBoard/Tabuleiro";

export class Jaguar extends Peca {

  tipo: string;

  constructor(_tab: Tabuleiro, _cor: Cor) {
    super(_tab, _cor);
    this.tipo = "J";
  }

  public ToString(): string {
    return `J`;
  }
}