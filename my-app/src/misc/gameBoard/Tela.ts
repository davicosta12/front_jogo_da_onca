import { Tabuleiro } from "./Tabuleiro";

export class Tela {

  public static CriarTabuleiro(_tab: Tabuleiro): any[][] {

    const createGameBoard: any[][] = new Array(_tab.linhas).fill(null).map(() => new Array(_tab.colunas).fill(null));;

    for (let i = 0; i < _tab.linhas; i++) {

      for (let j = 0; j < _tab.colunas; j++) {

        if ((i === 0 && j === 5) || (i === 4 && j === 5) || (i === 1 && j === 6) || (i === 3 && j === 6)) {
          createGameBoard[i][j] = null;
          continue;
        }

        if (i === 2 && j === 5) {
          createGameBoard[i][j] = "T";
          continue;
        }

        if (_tab.peca(i, j) === null) {
          createGameBoard[i][j] = "-";
        }
        else {
          createGameBoard[i][j] = _tab.peca(i, j);
        }

      }
    }

    return createGameBoard;
  }
}