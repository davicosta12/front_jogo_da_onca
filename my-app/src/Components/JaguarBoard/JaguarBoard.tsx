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
            {/* <circle classname="target_point" id="b00" cx="850" cy="200" r="15" stroke="white" stroke-width="2" fill="red" /> */}

            {MontarTabuleiro()}

            {/* <circle className="point" id="c00" cx="150" cy="750" r="20" />
            <circle className="point" id="c01" cx="150" cy="600" r="20" />
            <circle className="point" id="c02" cx="150" cy="450" r="20" />
            <circle className="point" id="c03" cx="150" cy="300" r="20" />
            <circle className="point" id="c04" cx="150" cy="150" r="20" />
            <circle className="point" id="c05" cx="300" cy="750" r="20" />
            <circle className="point" id="c06" cx="300" cy="600" r="20" />
            <circle className="point" id="c07" cx="300" cy="450" r="20" />
            <circle className="point" id="c08" cx="300" cy="300" r="20" />
            <circle className="point" id="c09" cx="300" cy="150" r="20" />
            <circle className="point" id="c10" cx="450" cy="750" r="20" />
            <circle className="point" id="c11" cx="450" cy="600" r="20" />
            <circle className="point" id="c12" cx="450" cy="450" r="20" />
            <circle className="point" id="c13" cx="450" cy="300" r="20" />
            <circle className="point" id="c14" cx="450" cy="150" r="20" />
            <circle className="point" id="c15" cx="600" cy="750" r="20" />
            <circle className="point" id="c16" cx="600" cy="600" r="20" />
            <circle className="point" id="c17" cx="600" cy="450" r="20" />
            <circle className="point" id="c18" cx="600" cy="300" r="20" />
            <circle className="point" id="c19" cx="600" cy="150" r="20" />
            <circle className="point" id="c20" cx="750" cy="750" r="20" />
            <circle className="point" id="c21" cx="750" cy="600" r="20" />
            <circle className="point" id="c22" cx="750" cy="450" r="20" />
            <circle className="point" id="c23" cx="750" cy="300" r="20" />
            <circle className="point" id="c24" cx="750" cy="150" r="20" />
            <circle className="point" id="c25" cx="900" cy="600" r="20" />
            <circle className="point" id="target" cx="900" cy="450" r="28" stroke="lime" stroke-width="4" />
            <circle className="point" id="c26" cx="900" cy="450" r="20" />
            <circle className="point" id="c27" cx="900" cy="300" r="20" />
            <circle className="point" id="c28" cx="1050" cy="750" r="20" />
            <circle className="point" id="c29" cx="1050" cy="450" r="20" />
            <circle className="point" id="c30" cx="1050" cy="150" r="20" /> */}
          </svg>
        </section>
      </div>
    </div>
  );
};

export default JaguarBoard;