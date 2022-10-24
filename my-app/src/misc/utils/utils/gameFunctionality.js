export const MontarTabuleiro = () => {

  const gameTable = [];

  for (let i = 0; i < 5; i++) {

    for (let j = 0; j < 7; j++) {

      if ((i === 0 && j === 5) || (i === 4 && j === 5) || (i === 1 && j === 6) || (i === 3 && j === 6)) {
        continue
      }

      const nome_casa = "casa_" + i.toString() + "_" + j.toString();

      let cx = "";
      let cy = "";

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

      if (isTargetCircle(i, j)) {
        gameTable.push(<circle className="point" id="target" cx="900" cy="450" r="28" stroke="lime" stroke-width="4" />);
      }

      if (j < 3 && !isPecaMonster(i, j)) {
        gameTable.push(<circle onClick={handleClick} class="soldier" id={nome_casa} cx={cx} cy={cy} r="20" />);
      }

      if (j >= 3 && !isPecaMonster(i, j)) {
        gameTable.push(<circle onClick={handleClick} class="point" id={nome_casa} cx={cx} cy={cy} r="20" />);
      }

      if (isPecaMonster(i, j)) {
        gameTable.push(<circle onClick={handleClick} class="monster" id={nome_casa} cx={cx} cy={cy} r="20" />);
      }

    }
  }

  return gameTable;
}

const handleClick = (ev) => {
  console.log(ev.target.id)
}

const isPecaMonster = (i, j) => {
  return (i === 2 && j === 2);
}

const isTargetCircle = (i, j) => {
  return (i === 2 && j === 5);
}