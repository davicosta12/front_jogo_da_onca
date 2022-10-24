import { FunctionComponent, useEffect } from 'react';
import { MontarTabuleiro } from '../../misc/utils/utils/gameFunctionality';
import './JaguarBoard.scss';

interface Props {
}

const JaguarBoard: FunctionComponent<Props> = (props) => {

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
            {MontarTabuleiro()}
          </svg>
        </section>
      </div>
    </div>
  );
};

export default JaguarBoard;