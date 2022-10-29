import { Partida } from "./Partida";


export class Tela {

  public static CriarTabuleiro(_partida: Partida): any[][] {

    const tabuleiro: any[][] = [];

    for (let i = 0; i < _partida.tab?.linhas; i++) {

      for (let j = 0; j < _partida.tab?.colunas; j++) {

        if ((i === 0 && j === 5) || (i === 4 && j === 5) || (i === 1 && j === 6) || (i === 3 && j === 6)) {
          tabuleiro[i][j] = null;
          continue;
        }

        if (i === 2 && j === 5) {
          tabuleiro[i][j] = 'T';
          continue;
        }

        if (_partida.tab.peca(i, j) === null) {
          tabuleiro[i][j] = '-';
        }
        else {
          tabuleiro[i][j] = _partida.tab.peca(i, j);
        }

      }
    }

    return tabuleiro;
  }
}


