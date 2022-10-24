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
          case 0: cx = 150; break;
          case 1: cx = 300; break;
          case 2: cx = 450; break;
          case 3: cx = 600; break;
          case 4: cx = 750; break;
          default: break;
        }

        switch (j) {
          case 0: cy = 750; break;
          case 1: cy = 600; break;
          case 2: cy = 450; break;
          case 3: cy = 300; break;
          case 4: cy = 150; break;
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

      if (cx && cy) {

        if (i === 2 && j === 5) {
          gameTable.push(<circle className="point" id="target" cx="900" cy="450" r="28" stroke="lime" stroke-width="4" />);
        }

        if (i === 2 && j === 2) {
          gameTable.push(<circle onClick={handleClick} class="monster" id={nome_casa} cx={cx} cy={cy} r="20" />);
        }

        if (i < 3 && !(i === 2 && j === 2)) {
          gameTable.push(<circle onClick={handleClick} class="soldier" id={nome_casa} cx={cx} cy={cy} r="20" />);
        }
        else {
          gameTable.push(<circle onClick={handleClick} class="point" id={nome_casa} cx={cx} cy={cy} r="20" />);
        }
      }

    }
  }

  return gameTable;
}

const handleClick = (ev) => {
  console.log(ev.target.id)
}

  // $(".casa").click(function () {
  //   $("#" + casa_selecionada).removeClass("casa_selecionada");
  //   casa_selecionada = $(this).attr("id");
  //   $("#" + casa_selecionada).addClass("casa_selecionada");
  //   $("#info_casa_selecionada").text(casa_selecionada);

  //   peca_selecionada = $("#" + casa_selecionada).children("img:first").attr("id");
  //   if (peca_selecionada == null) {
  //     peca_selecionada = "NENHUMA PECA SELECIONADA";
  //   }
  //   $("#info_peca_selecionada").text(peca_selecionada.toString());
  // });
