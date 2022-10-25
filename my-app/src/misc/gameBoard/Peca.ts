import { Cor } from "./Cor";
import { Posicao } from "./Posicao";
import { Tabuleiro } from "./Tabuleiro";

export class Peca {
  public posicao: Posicao | null; 
  public cor: Cor;
  public qtdeMovimentos: number;
  public tab: Tabuleiro;

  constructor(_tab: Tabuleiro, _cor: Cor) {
    this.posicao = null;
    this.cor = _cor;
    this.tab = _tab;
    this.qtdeMovimentos = 0;
  }
}