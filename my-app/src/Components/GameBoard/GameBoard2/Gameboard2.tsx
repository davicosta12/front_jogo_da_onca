import { FunctionComponent, useContext, useEffect, useState } from 'react';
import './GameBoard2.scss';
import '../../../misc/gameFunctionalities/Jogo2.js';
import { useLocation } from 'react-router-dom';
import { ThemeContext } from '../../../App';
import VictoryLoseModal from '../../_commons/VictoryLoseModal/VictoryLoseModal';
import PetSematary from '../../_commons/PetSematary/PetSematary';

let dog_img, onca_img, fundo_img;

interface Props {
}

const Gameboard2: FunctionComponent<Props> = (props) => {

  const [variablesGame, setVariablesGame] = useState({ openModal: false, isDogVictory: false } as { openModal: boolean, isDogVictory: boolean });
  const [countDogsDeath, setCountDogsDeath] = useState(0);

  const { state, dispatch } = useContext(ThemeContext);
  const location = useLocation();

  const stateLocation = location.state;
  const playerData = stateLocation?.playerData;
  const activeSeason = stateLocation?.season;

  console.log(stateLocation)

  fundo_img = activeSeason.tabuleiro?.img_tabuleiro ? activeSeason.tabuleiro?.img_tabuleiro : require("../../../assets/fundo/fundo.png");
  dog_img = playerData?.img_skin ? playerData?.img_skin : require("../../../assets/pecas/cachorroBase.png");
  // onca_img = playerData?.img_skin ? playerData?.img_skin : require("../../../assets/pecas/oncaBase.png");
  onca_img = require("../../../assets/pecas/oncaBase.png");

  useEffect(() => {

    const checkVariablesGame = (ev: any) => {
      try {

        const _variablesGame = sessionStorage.getItem('variablesGame');
        const countDogsDeath = sessionStorage.getItem('countDogsDeath');

        if (_variablesGame) {
          setVariablesGame(JSON.parse(_variablesGame));
        }

        if (countDogsDeath) {
          setCountDogsDeath(parseInt(countDogsDeath) - 16);
        }

      }
      catch (err: any) {
        console.log(err);
      }
    }

    window.addEventListener("storage", checkVariablesGame);

    return () => {
      window.removeEventListener("storage", checkVariablesGame);
    };

  }, []);

  return (
    <div className='gameboard-container flex'>
      <section>
        <svg width="100%" height="100%" className='text-center'>
          <defs>
            <pattern className='pattern-div' id="dogSkin" height="50" width="50">
              <image className='image-peca' height="50" width="50" xlinkHref={dog_img}></image>
            </pattern>
          </defs>

          <defs>
            <pattern className='pattern-div' id="jaguarSkin" height="50" width="50">
              <image className='image-peca' height="50" width="50" xlinkHref={onca_img}></image>
            </pattern>
          </defs>

          <defs>
            <pattern className='pattern-div' id="targetjaguarSkin" height="50" width="50">
              <image className='image-peca' height="50" width="50" xlinkHref={onca_img}></image>
            </pattern>
          </defs>

          <defs>
            <pattern className='pattern-div' id="fundoTabuleiro" height="50" width="50">
              <img src={fundo_img} />
            </pattern>
          </defs>

          <rect width="100%" height="100%" fillOpacity="0" />
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

          <circle className='target_point' id="b00" cx="850" cy="200" r="25" stroke="white" stroke-width="2" fill="url(#targetjaguarSkin)" />

          <circle className='point' id="c00" cx="150" cy="750" r="25" />
          <circle className='point' id="c01" cx="150" cy="600" r="25" />
          <circle className='point' id="c02" cx="150" cy="450" r="25" />
          <circle className='point' id="c03" cx="150" cy="300" r="25" />
          <circle className='point' id="c04" cx="150" cy="150" r="25" />
          <circle className='point' id="c05" cx="300" cy="750" r="25" />
          <circle className='point' id="c06" cx="300" cy="600" r="25" />
          <circle className='point' id="c07" cx="300" cy="450" r="25" />
          <circle className='point' id="c08" cx="300" cy="300" r="25" />
          <circle className='point' id="c09" cx="300" cy="150" r="25" />
          <circle className='point' id="c10" cx="450" cy="750" r="25" />
          <circle className='point' id="c11" cx="450" cy="600" r="25" />
          <circle className='point' id="c12" cx="450" cy="450" r="25" />
          <circle className='point' id="c13" cx="450" cy="300" r="25" />
          <circle className='point' id="c14" cx="450" cy="150" r="25" />
          <circle className='point' id="c15" cx="600" cy="750" r="25" />
          <circle className='point' id="c16" cx="600" cy="600" r="25" />
          <circle className='point' id="c17" cx="600" cy="450" r="25" />
          <circle className='point' id="c18" cx="600" cy="300" r="25" />
          <circle className='point' id="c19" cx="600" cy="150" r="25" />
          <circle className='point' id="c20" cx="750" cy="750" r="25" />
          <circle className='point' id="c21" cx="750" cy="600" r="25" />
          <circle className='point' id="c22" cx="750" cy="450" r="25" />
          <circle className='point' id="c23" cx="750" cy="300" r="25" />
          <circle className='point' id="c24" cx="750" cy="150" r="25" />
          <circle className='point' id="c25" cx="900" cy="600" r="25" />
          <circle className='point' id="target" cx="900" cy="450" r="28" stroke="lime" stroke-width="4" />
          <circle className='point' id="c26" cx="900" cy="450" r="25" />
          <circle className='point' id="c27" cx="900" cy="300" r="25" />
          <circle className='point' id="c28" cx="1050" cy="750" r="25" />
          <circle className='point' id="c29" cx="1050" cy="450" r="25" />
          <circle className='point' id="c30" cx="1050" cy="150" r="25" />
        </svg>
      </section>

      <div className='userIcon-container'>
        <div className='mr-1 mt-1'>
          <img src={state.activeUser.icone} alt="userIcon" width="150" height="150" />
        </div>
        <div className='petSemataryContainer'>
          <PetSematary
            countDogsDeath={countDogsDeath}
            dog_img={dog_img}
          />
        </div>
      </div>

      <VictoryLoseModal
        variablesGame={variablesGame}
        openModal={variablesGame.openModal}
        isDog={variablesGame.isDogVictory}
        dogImg={dog_img}
        jaguarImg={onca_img}
        setOpenModal={setVariablesGame}
      />
    </div>
  );
};

export default Gameboard2;