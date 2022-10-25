import { Tabuleiro } from "./gameBoard/Tabuleiro";

export const renderGameBoard = (gameBoard: any, tab: Tabuleiro) => {

  const pecas = [];

  for (let i = 0; i < tab.linhas; i++) {

    for (let j = 0; j < tab.colunas; j++) {

      if (gameBoard[i][j] === null) {
        continue;
      }

      const nome_casa = "casa_" + i.toString() + "_" + j.toString();
      
      let cx = 0;
      let cy = 0;

      if (i < 5 && j < 5) {
        switch (i) {
          case 0: cy = 150; break;
          case 1: cy = 300; break;
          case 2: cy = 450; break;
          case 3: cy = 600; break;
          case 4: cy = 750; break;
          default: break;
        }

        switch (j) {
          case 0: cx = 150; break;
          case 1: cx = 300; break;
          case 2: cx = 450; break;
          case 3: cx = 600; break;
          case 4: cx = 750; break;
          default: break;
        }
      }
      else {
        if (i === 1 && j === 5) {
          cx = 900;
          cy = 300;
        }

        if (i === 0 && j === 6) {
          cx = 1050;
          cy = 150;
        }

        if (i === 3 && j === 5) {
          cx = 900;
          cy = 600;
        }

        if (i === 4 && j === 6) {
          cx = 1050;
          cy = 750;
        }

        if (i === 2 && j === 5) {
          cx = 900;
          cy = 450;
        }

        if (i === 2 && j === 6) {
          cx = 1050;
          cy = 450;
        }
      }

      if (gameBoard[i][j].tipo === 'D') {
        pecas.push(<circle onClick={handleClick} className="soldier" id={nome_casa} cx={cx} cy={cy} r="20" />);
      }
      else if (gameBoard[i][j].tipo === 'J') {
        pecas.push(<circle onClick={handleClick} className="monster" id={nome_casa} cx={cx} cy={cy} r="20" />);
      }
      else if (gameBoard[i][j] === 'T') {
        pecas.push(<circle className="point" id="target" cx="900" cy="450" r="28" stroke="lime" strokeWidth={4} />);
        pecas.push(<circle onClick={handleClick} className="point" id={nome_casa} cx={cx} cy={cy} r="20" />);
      }
      else {
        pecas.push(<circle onClick={handleClick} className="point" id={nome_casa} cx={cx} cy={cy} r="20" />);
      }
    }
  }

  return pecas;
}

const handleClick = (ev: any) => {
  console.log(ev.target.id)
}