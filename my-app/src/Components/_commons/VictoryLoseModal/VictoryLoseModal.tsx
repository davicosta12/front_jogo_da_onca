import { FunctionComponent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Modal } from 'semantic-ui-react';

interface Props {
  variablesGame: { openModal: boolean, isDogVictory: boolean },
  openModal: boolean;
  isDog: boolean;
  loading?: boolean;
  dogImg: string;
  jaguarImg: string;
  setOpenModal: any;
}

const VictoryLoseModal: FunctionComponent<Props> = (props) => {

  const navigate = useNavigate();
  var soundVictory = new Audio(require('../../../assets/sons/VictoryFanfare.mp3'));

  const {
    variablesGame,
    openModal,
    setOpenModal,
    dogImg,
    jaguarImg,
    isDog,
  } = props;

  useEffect(() => {
    if (openModal) {
      soundVictory.play();
    }
  }, [openModal]);

  const handleBackHome = () => {
    soundVictory.pause();
    setOpenModal({ ...variablesGame, openModal: false });
    navigate("/home");
  }

  const handlePlayAgain = () => {
    soundVictory.pause();
    setOpenModal({ ...variablesGame, openModal: false });
    document.location.reload();
  }

  return (
    <Modal
      onClose={handleBackHome}
      onOpen={() => setOpenModal({ ...variablesGame, openModal: true })}
      open={openModal}
    >
      <Modal.Header>{!isDog ? 'Derrota!' : 'Vitória!'}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <div className='flex-column justify-content-center align-items-center'>
            <img
              src={!isDog ? jaguarImg : dogImg}
              height="100"
              width="100"
              alt={!isDog ? 'imagem onca' : 'imagem cachorro'}
              style={{ borderRadius: '50%' }}
            />
            <p
              className='mt-2'
              style={{ fontSize: '1.5em', fontWeight: '600' }}
            >{!isDog ? 'Puxa, você perdeu!' : 'Parabéns, você venceu!!!'}
            </p>
          </div>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button
          content="Voltar para Home"
          color='black'
          onClick={handleBackHome}
        />
        <Button
          content="Jogar Novamente"
          labelPosition='right'
          icon='checkmark'
          onClick={handlePlayAgain}
          loading={props.loading}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
};

export default VictoryLoseModal;