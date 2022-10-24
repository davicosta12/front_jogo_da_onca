import $ from 'jquery';

// let casa_selecionada = null;
// let peca_selecionada = null;

export const MontarTabuleiro = () => {

  for (let i = 0; i < 6; i++) {
    // $("#svgTable").append("<div id='linha_" + i.toString() + "' class='linha' >");

    for (let j = 0; j < 6; j++) {
      const nome_casa = "casa_" + i.toString() + "_" + j.toString();
      // var classe = (i % 2 == 0 ? (j % 2 == 0 ? "casa_branca" : "casa_preta") : (j % 2 != 0 ? "casa_branca" : "casa_preta"));

      let cx = "";
      let cy = "";

      switch (i) {
        case 0: cx = 150; break;
        case 1: cx = 300; break;
        case 2: cx = 450; break;
        case 3: cx = 600; break;
        case 4: cx = 750; break;
        case 5: cx = 750; break;
        default: break;
      }

      switch (j) {
        case 0: cy = 750; break;
        case 1: cy = 600; break;
        case 2: cy = 450; break;
        case 3: cy = 300; break;
        case 4: cy = 150; break;
        case 5: cy = 150; break;
        default: break;
      }

      $("#svgTable").append(`<circle class="point" id=${nome_casa} cx=${cx} cy=${cy} r="20" />`)

    }
  }
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
