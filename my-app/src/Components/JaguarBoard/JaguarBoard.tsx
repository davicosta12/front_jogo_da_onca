import { FunctionComponent, useEffect } from 'react';
import { Dog } from '../../misc/game/Dog';
import { Jaguar } from '../../misc/game/Jaguar';
import { Cor } from '../../misc/gameBoard/Cor';
import { Posicao } from '../../misc/gameBoard/Posicao';
import { Tabuleiro } from '../../misc/gameBoard/Tabuleiro';
import { Tela } from '../../misc/gameBoard/Tela';
import { renderGameBoard } from '../../misc/gameFunctionality';
import './JaguarBoard.scss';

interface Props {
}

const JaguarBoard: FunctionComponent<Props> = (props) => {

  const tab = new Tabuleiro(5, 7);
  tab.colocaPeca(new Dog(tab, Cor.Azul), new Posicao(0, 0));
  tab.colocaPeca(new Dog(tab, Cor.Azul), new Posicao(1, 0));
  tab.colocaPeca(new Dog(tab, Cor.Azul), new Posicao(2, 0));
  tab.colocaPeca(new Dog(tab, Cor.Azul), new Posicao(3, 0));
  tab.colocaPeca(new Dog(tab, Cor.Azul), new Posicao(4, 0));

  tab.colocaPeca(new Dog(tab, Cor.Azul), new Posicao(0, 1));
  tab.colocaPeca(new Dog(tab, Cor.Azul), new Posicao(1, 1));
  tab.colocaPeca(new Dog(tab, Cor.Azul), new Posicao(2, 1));
  tab.colocaPeca(new Dog(tab, Cor.Azul), new Posicao(3, 1));
  tab.colocaPeca(new Dog(tab, Cor.Azul), new Posicao(4, 1));

  tab.colocaPeca(new Dog(tab, Cor.Azul), new Posicao(0, 2));
  tab.colocaPeca(new Dog(tab, Cor.Azul), new Posicao(1, 2));
  tab.colocaPeca(new Jaguar(tab, Cor.Vermelha), new Posicao(2, 2));
  tab.colocaPeca(new Dog(tab, Cor.Azul), new Posicao(3, 2));
  tab.colocaPeca(new Dog(tab, Cor.Azul), new Posicao(4, 2));
  const gameBoard = Tela.CriarTabuleiro(tab);
  console.log(gameBoard)

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
            {renderGameBoard(gameBoard, tab)}
          </svg>
        </section>
      </div>
    </div>
  );
};

export default JaguarBoard;