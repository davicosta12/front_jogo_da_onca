import { Cor } from "../GameBoard/Cor";
import { Peca } from "../GameBoard/Peca";
import { Tabuleiro } from "../GameBoard/Tabuleiro";

export class Jaguar extends Peca {

  constructor(_tab: Tabuleiro, _cor: Cor) {
    super(_tab, _cor);
  }

  public renderString(): string {
    return `J`;
  }
}