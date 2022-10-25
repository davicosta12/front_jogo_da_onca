import { Peca } from "./Peca";
import { Posicao } from "./Posicao";

export class Tabuleiro {

  public linhas: number;
  public colunas: number;
  private pecas: Peca[][];

  constructor(_linhas: number, _colunas: number) {
    this.linhas = _linhas;
    this.colunas = _colunas;
    this.pecas = new Array(_linhas).fill(null).map(() => new Array(_colunas).fill(null));
  }

  public peca(_linha: number, _coluna: number) {
    return this.pecas[_linha][_coluna];
  }

  public pecaPos(pos: Posicao) {
    return this.pecas[pos.linha][pos.coluna];
  }

  public existePeca(pos: Posicao) {
    this.validarPosicao(pos);
    return this.pecaPos(pos) != null;
  }

  public colocaPeca(p: Peca, pos: Posicao) {
    if (this.existePeca(pos)) {
      throw new Error("Já existe uma peça nessa posição!");
    }
    this.pecas[pos.linha][pos.coluna] = p;
    p.posicao = pos;
  }

  public retirarPeca(pos: Posicao): Peca | null {
    if (this.pecaPos(pos) == null) {
      return null;
    }
    const aux = this.pecaPos(pos);
    aux.posicao = null;
    this.pecas[pos.linha][pos.coluna] = null as any;
    return aux;
  }

  public posicaoValida(pos: Posicao): boolean {
    if (pos.linha < 0 || pos.linha >= this.linhas || pos.coluna < 0 || pos.coluna >= this.colunas) {
      return false;
    }
    return true;
  }

  public validarPosicao(pos: Posicao): void {
    if (!this.posicaoValida(pos)) {
      throw new Error("Posição inválida!");
    }

  }
}