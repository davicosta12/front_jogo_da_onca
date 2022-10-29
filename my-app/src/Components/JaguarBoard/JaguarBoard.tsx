import { FunctionComponent, useEffect } from 'react';
import $ from 'jquery';


import './JaguarBoard.scss';

import { Partida } from '../../misc/GameBoard/Partida';
import { Tela } from '../../misc/GameBoard/Tela';
import { Peca } from '../../misc/GameBoard/Peca';
import { Posicao } from '../../misc/GameBoard/Posicao';


interface Props {
}

let casa_origem: any = null;
let casa_destino: any = null;

const JaguarBoard: FunctionComponent<Props> = (props) => {

  let partida = new Partida();

  const printTabuleiro = () => {

    debugger

    const tabuleiro = Tela.CriarTabuleiro(partida);
    const pecas = [];

    for (let i = 0; i < partida.tab?.linhas; i++) {

      for (let j = 0; j < partida.tab?.colunas; j++) {
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

        switch (tabuleiro[i][j]) {
          case '-': {
            pecas.push(<circle onClick={(ev: any) => handleClick(ev, i, j)} className="point" id={nome_casa} cx={cx} cy={cy} r="20" />);
            break;
          }
          case 'T': {
            pecas.push(<circle className="point" id="target" cx="900" cy="450" r="28" stroke="lime" strokeWidth={4} />);
            pecas.push(<circle onClick={(ev: any) => handleClick(ev, i, j)} className="point" id={nome_casa} cx={cx} cy={cy} r="20" />);
            break;
          }
          default: {
            tabuleiro[i][j].renderString() === 'D'
              ? pecas.push(<circle onClick={(ev: any) => handleClick(ev, i, j, partida, partida.tab.peca(i, j))} className="soldier" id={nome_casa} cx={cx} cy={cy} r="20" />)
              : pecas.push(<circle onClick={(ev: any) => handleClick(ev, i, j, partida, partida.tab.peca(i, j))} className="monster" id={nome_casa} cx={cx} cy={cy} r="20" />);
          }
        }
      }

    }

    return pecas;
  }

  const handleClick = (ev: any, linha: number, coluna: number, partida?: Partida, peca?: Peca) => {

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
    console.log(peca)
  }

  return (
    <div className='w-full'>
      <div className='jaguarBoard-container'>

        <section className='jaguarBoard-section'>
          <svg id='svgTable' className='jaguarBoard-svg'>
            <rect x="150" y="150" id="gameTable" width="600" height="600" />
            <polygon id="gameTable" points="150,450 450,150 1050,750 1050,150 450,750 150,450" />
            <line id="tableline" x1="150" y1="300" x2="750" y2="300" />
            <line id="tableline" x1="150" y1="450" x2="1050" y2="450" />
            <line id="tableline" x1="150" y1="600" x2="750" y2="600" />
            <line id="tableline" x1="300" y1="150" x2="300" y2="750" />
            <line id="tableline" x1="450" y1="150" x2="450" y2="750" />
            <line id="tableline" x1="600" y1="150" x2="600" y2="750" />
            <line id="tableline" x1="150" y1="150" x2="750" y2="750" />
            <line id="tableline" x1="150" y1="750" x2="750" y2="150" />
            <line id="tableline" x1="900" y1="300" x2="900" y2="600" />
            {printTabuleiro()}
          </svg>
        </section>
      </div>
    </div>
  );
};

export default JaguarBoard;