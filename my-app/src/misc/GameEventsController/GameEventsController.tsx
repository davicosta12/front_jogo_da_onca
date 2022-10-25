import { Partida } from "../GameBoard/Partida";
import { Peca } from "../GameBoard/Peca";
import $ from 'jquery';
import { Posicao } from "../GameBoard/Posicao";

let casa_origem: any = null;
let casa_destino: any = null;

export const renderPecas = (
  partida: Partida,
  pecas: any[],
  peca: any,
  linha: number,
  coluna: number,
  tipoPeca: string,
  nome_casa: string,
  cx: number,
  cy: number
) => {

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
        ? pecas.push(<circle onClick={(ev: any) => handleClick(ev, linha, coluna, partida, pecas, peca)} className="soldier" id={nome_casa} cx={cx} cy={cy} r="20" />)
        : pecas.push(<circle onClick={(ev: any) => handleClick(ev, linha, coluna, partida, pecas, peca)} className="monster" id={nome_casa} cx={cx} cy={cy} r="20" />);
    }
  }
}

const handleClick = (ev: any, linha: number, coluna: number, partida?: Partida, pecas?: any[], peca?: Peca) => {
debugger
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