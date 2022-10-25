export class Posicao {
  public linha: number;
  public coluna: number;

  constructor(_linha: number, _coluna: number) {
    this.linha = _linha;
    this.coluna = _coluna;
  }

  public DefinirValores(_linha: number, _coluna: number): void {
    this.linha = _linha;
    this.coluna = _coluna;
  }

  public ToString(): string {
    return `${this.linha}, ${this.coluna}`;
  }
}