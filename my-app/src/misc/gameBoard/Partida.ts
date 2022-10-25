import { Dog } from "../Game/Dog";
import { Jaguar } from "../Game/Jaguar";
import { Cor } from "./Cor";
import { Posicao } from "./Posicao";
import { Tabuleiro } from "./Tabuleiro";

export class Partida {
  public tab: Tabuleiro;
  private turno: number;
  private jogadorAtual: Cor;
  public terminada: boolean;

  constructor() {
    this.tab = new Tabuleiro(5, 7);
    this.turno = 1;
    this.jogadorAtual = Cor.Branca;
    this.terminada = false;
    this.colocarPecas();
  }

  public executaMovimento(origem: Posicao, destino: Posicao): void {
    const p: any = this.tab.retirarPeca(origem);
    p.incrementarQteMovimentos();
    const pecaCapturada: any = this.tab.retirarPeca(destino);
    this.tab.colocaPeca(p, destino);
  }

  private colocarPecas(): void {
    this.tab.colocaPeca(new Dog(this.tab, Cor.Azul), new Posicao(0, 0));
    this.tab.colocaPeca(new Dog(this.tab, Cor.Azul), new Posicao(1, 0));
    this.tab.colocaPeca(new Dog(this.tab, Cor.Azul), new Posicao(2, 0));
    this.tab.colocaPeca(new Dog(this.tab, Cor.Azul), new Posicao(3, 0));
    this.tab.colocaPeca(new Dog(this.tab, Cor.Azul), new Posicao(4, 0));

    this.tab.colocaPeca(new Dog(this.tab, Cor.Azul), new Posicao(0, 1));
    this.tab.colocaPeca(new Dog(this.tab, Cor.Azul), new Posicao(1, 1));
    this.tab.colocaPeca(new Dog(this.tab, Cor.Azul), new Posicao(2, 1));
    this.tab.colocaPeca(new Dog(this.tab, Cor.Azul), new Posicao(3, 1));
    this.tab.colocaPeca(new Dog(this.tab, Cor.Azul), new Posicao(4, 1));

    this.tab.colocaPeca(new Dog(this.tab, Cor.Azul), new Posicao(0, 2));
    this.tab.colocaPeca(new Dog(this.tab, Cor.Azul), new Posicao(1, 2));
    this.tab.colocaPeca(new Jaguar(this.tab, Cor.Vermelha), new Posicao(2, 2));
    this.tab.colocaPeca(new Dog(this.tab, Cor.Azul), new Posicao(3, 2));
    this.tab.colocaPeca(new Dog(this.tab, Cor.Azul), new Posicao(4, 2));
  }
}