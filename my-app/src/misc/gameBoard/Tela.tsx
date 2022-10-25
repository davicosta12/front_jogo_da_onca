import { Partida } from "./Partida";
import { Peca } from "./Peca";
import { Posicao } from "./Posicao";
import $ from 'jquery';

let casa_origem: any = null;
let casa_destino: any = null;

export class Tela {

  public static CriarTabuleiro(_partida: Partida): any[] {

    const pecas: [] = [];

    for (let i = 0; i < _partida.tab?.linhas; i++) {

      for (let j = 0; j < _partida.tab?.colunas; j++) {

        if ((i === 0 && j === 5) || (i === 4 && j === 5) || (i === 1 && j === 6) || (i === 3 && j === 6)) {
          continue;
        }

        if (i === 2 && j === 5) {
          this.criarPeca(_partida, pecas, null, i, j, "T",);
          continue;
        }

        if (_partida.tab.peca(i, j) === null) {
          this.criarPeca(_partida, pecas, null, i, j, "-");
        }
        else {
          this.criarPeca(_partida, pecas, _partida.tab.peca(i, j), i, j);
        }

      }
    }

    return pecas;
  }

  public static criarPeca(_partida: Partida, pecas: any[], peca: any, linha: number, coluna: number, tipoPeca: string = 'DogOrJaguar'): void {

    const nome_casa = "casa_" + linha.toString() + "_" + coluna.toString();

    let cx = 0;
    let cy = 0;

    if (linha < 5 && coluna < 5) {
      switch (linha) {
        case 0: cy = 150; break;
        case 1: cy = 300; break;
        case 2: cy = 450; break;
        case 3: cy = 600; break;
        case 4: cy = 750; break;
        default: break;
      }

      switch (coluna) {
        case 0: cx = 150; break;
        case 1: cx = 300; break;
        case 2: cx = 450; break;
        case 3: cx = 600; break;
        case 4: cx = 750; break;
        default: break;
      }
    }
    else {
      if (linha === 1 && coluna === 5) {
        cx = 900;
        cy = 300;
      }

      if (linha === 0 && coluna === 6) {
        cx = 1050;
        cy = 150;
      }

      if (linha === 3 && coluna === 5) {
        cx = 900;
        cy = 600;
      }

      if (linha === 4 && coluna === 6) {
        cx = 1050;
        cy = 750;
      }

      if (linha === 2 && coluna === 5) {
        cx = 900;
        cy = 450;
      }

      if (linha === 2 && coluna === 6) {
        cx = 1050;
        cy = 450;
      }
    }

    switch (tipoPeca) {
      case '-': {
        pecas.push(<circle onClick={(ev: any) => handleClick(ev, linha, coluna)} className="point" id={nome_casa} cx={cx} cy={cy} r="20" />);
        break;
      }
      case 'T': {
        pecas.push(<circle className="point" id="target" cx="900" cy="450" r="28" stroke="lime" strokeWidth={4} />);
        pecas.push(<circle onClick={(ev: any) => handleClick(ev, linha, coluna)} className="point" id={nome_casa} cx={cx} cy={cy} r="20" />);
        break;
      }
      default: {
        peca.renderString() === 'D'
          ? pecas.push(<circle onClick={(ev: any) => handleClick(ev, linha, coluna, _partida, pecas, peca)} className="soldier" id={nome_casa} cx={cx} cy={cy} r="20" />)
          : pecas.push(<circle onClick={(ev: any) => handleClick(ev, linha, coluna, _partida, pecas, peca)} className="monster" id={nome_casa} cx={cx} cy={cy} r="20" />);
      }
    }

    const handleClick = (ev: any, linha: number, coluna: number, partida?: Partida, pecas?: any[], peca?: Peca) => {

      if (!casa_origem && peca) {

        if (peca) {
          $(`#casa_${peca.posicao?.linha}_${peca.posicao?.coluna}`).removeClass("soldier");
          $(`#casa_${peca.posicao?.linha}_${peca.posicao?.coluna}`).addClass("soldierSelect");
          casa_origem = new Posicao(peca.posicao?.linha || 0, peca.posicao?.coluna || 0);
        }
      }

      if (casa_origem && !casa_destino && !peca) {
        casa_destino = new Posicao(linha, coluna);
        partida?.executaMovimento(casa_origem, casa_destino);
        casa_origem = null;
        casa_destino = null;
      }
      console.log(ev)
      console.log(pecas)
      console.log(peca)
    }

  }
}
