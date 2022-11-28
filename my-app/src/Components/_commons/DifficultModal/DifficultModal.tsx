import { FunctionComponent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Accordion, Button, Form, Header, Icon, Modal, Radio } from 'semantic-ui-react';
import GetSeasonDto from '../../../Services/Season/dto/GetSeasonDto';

interface Props {
  activeSeason: GetSeasonDto;
  playerChoiced: any;
  openModal: boolean;
  loading?: boolean;
  setOpenModal: any;
}

const DifficultModal: FunctionComponent<Props> = (props) => {

  const [difficult, setDifficult] = useState('normal');
  const [activeIndex, setActiveIndex] = useState(0);

  const {
    activeSeason,
    playerChoiced,
    openModal,
    setOpenModal,
  } = props;

  const navigate = useNavigate();

  const handleGamePlay = () => {

    sessionStorage.setItem("difficult", difficult);

    navigate("/jaguarboard", {
      state: {
        season: activeSeason,
        playerData: { ...playerChoiced },
        vetorTabuleiro: null,
        turnoPeca: 1,
        corPecaCachorro: 'yellow',
        corPecaOnca: 'green',
        corPreview: 'yellow',
        preview: false,
        corTematica: '#ccc',
        difficult
      }
    });

    document.location.reload();
  }

  const handleChange = (e: any, { value }: any) => setDifficult(value);

  const handleClick = (e: any, titleProps: any) => {
    const { index } = titleProps
    const newIndex = activeIndex === index ? -1 : index
    setActiveIndex(newIndex);
  }

  return (
    <Modal
      onClose={() => setOpenModal(false)}
      onOpen={() => setOpenModal(true)}
      open={openModal}
      size='tiny'
    >
      <Modal.Header className='flex justify-content-center'>Jogo da Onça</Modal.Header>
      <Modal.Content>
        <Modal.Description>

          <Header>Escolha a Dificuldade</Header>
          <Form>
            <Form.Field>
              <Radio
                label='Normal'
                name='normalGame'
                value='normal'
                checked={difficult === 'normal'}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <Radio
                label='Difícil'
                name='hardGame'
                value='hard'
                checked={difficult === 'hard'}
                onChange={handleChange}
              />
            </Form.Field>
          </Form>

          <Header>Como Jogar?</Header>
          <Accordion fluid styled>
            <Accordion.Title
              active={activeIndex === 0}
              index={0}
              onClick={handleClick}
            >
              <Icon name='dropdown' />
              Objetivo do jogo ?
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 0}>
              <p>
                A onça capturar cinco cachorros ou os cachorros imobilizarem a onça.
              </p>
            </Accordion.Content>

            <Accordion.Title
              active={activeIndex === 1}
              index={1}
              onClick={handleClick}
            >
              <Icon name='dropdown' />
              Regras
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 1}>
              <p>
              A onça é quem dá início a partida. Tanto ela como os cães podem andar para uma casa vizinha por vez, em qualquer direção. A onça tentará capturar 5 cachorros da mesma forma que ocorre em um jogo de dama, ou seja, pulando o cachorro e se dirigindo à próxima casa vazia.E, como ocorre no jogo de damas também é permitido capturar os cães em sequência. Já os cachorros não podem capturar a onça, mas sim cercá-la por todos os lados. Dessa maneira, a onça ficará imobilizada e os cachorros vencem a partida.
              </p>
            </Accordion.Content>

            <Accordion.Title
              active={activeIndex === 2}
              index={2}
              onClick={handleClick}
            >
              <Icon name='dropdown' />
              Como iniciar o jogo ?
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 2}>
              <p>
                Para iniciar o jogo clique na peça da onça!
              </p>
            </Accordion.Content>
          </Accordion>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button
          content="Voltar para Home"
          color='black'
          onClick={() => setOpenModal(false)}
        />
        <Button
          content="Jogar"
          labelPosition='right'
          icon='checkmark'
          onClick={handleGamePlay}
          loading={props.loading}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
};

export default DifficultModal;
