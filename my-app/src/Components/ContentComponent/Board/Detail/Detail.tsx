import { FunctionComponent, useEffect, useState } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import GetBoardDto from '../../../../Services/Board/dto/GetBoardDto';

interface Props {
  board: GetBoardDto;
  openModal: boolean;
  createMode: boolean;
  onCreate: (values: GetBoardDto) => void;
  onUpdate: (values: GetBoardDto) => void;
  loading?: boolean;
  setOpenModal: any;
}

const INITIAL_FORM_VALUES = {
  id: 0,
  name_tabuleiro: '',
  img_tabuleiro: ''
} as GetBoardDto;

const BoardDetail: FunctionComponent<Props> = (props) => {

  const [formValues, setFormValues] = useState(INITIAL_FORM_VALUES);

  const {
    board,
    openModal,
    createMode,
    onCreate,
    onUpdate,
    setOpenModal
  } = props;

  useEffect(() => {
    if (board?.id) {
      setFormValues({
        id: board.id,
        name_tabuleiro: board.name_tabuleiro,
        img_tabuleiro: board.img_tabuleiro
      });
    } else {
      setFormValues(INITIAL_FORM_VALUES);
    }
  }, [board, openModal]);

  const handleSubmit = (values: GetBoardDto) => {
    createMode
      ? onCreate(values)
      : onUpdate(values);
  }

  const handleChange = (ev: any, { name, value }: any) => {
    setFormValues({ ...formValues, [name]: value });
  }

  return (
    <Modal
      onClose={() => setOpenModal(false)}
      onOpen={() => setOpenModal(true)}
      open={openModal}
    >
      <Modal.Header>{createMode ? "Adicionar Tabuleiro" : "Editar Tabuleiro"}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form>
            <Form.Group widths='equal'>
              <Form.Input
                fluid
                name="name_tabuleiro"
                label='Nome'
                value={formValues.name_tabuleiro}
                onChange={handleChange}
                placeholder='Nome'
                error={!formValues.name_tabuleiro}
                required
              />
              <Form.Dropdown
                fluid
                name="img_tabuleiro"
                label='Imagem do Tabuleiro'
                value={formValues.img_tabuleiro}
                options={friendOptions}
                selection
                onChange={handleChange}
                placeholder='Imagem do Tabuleiro'
                error={!formValues.img_tabuleiro}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => setOpenModal(false)}>
          Cancelar
        </Button>
        <Button
          content="Salvar"
          labelPosition='right'
          icon='checkmark'
          onClick={() => handleSubmit(formValues)}
          loading={props.loading}
          disabled={!formValues.name_tabuleiro}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default BoardDetail

const friendOptions = [
  {
    key: 'Jenny Hess',
    text: 'Jenny Hess',
    value: 'Jenny Hess',
    image: { avatar: true, src: '/images/avatar/small/jenny.jpg' },
  },
  {
    key: 'Elliot Fu',
    text: 'Elliot Fu',
    value: 'Elliot Fu',
    image: { avatar: true, src: '/images/avatar/small/elliot.jpg' },
  },
  {
    key: 'Stevie Feliciano',
    text: 'Stevie Feliciano',
    value: 'Stevie Feliciano',
    image: { avatar: true, src: '/images/avatar/small/stevie.jpg' },
  },
  {
    key: 'Christian',
    text: 'Christian',
    value: 'Christian',
    image: { avatar: true, src: '/images/avatar/small/christian.jpg' },
  },
  {
    key: 'Matt',
    text: 'Matt',
    value: 'Matt',
    image: { avatar: true, src: '/images/avatar/small/matt.jpg' },
  },
  {
    key: 'Justen Kitsune',
    text: 'Justen Kitsune',
    value: 'Justen Kitsune',
    image: { avatar: true, src: '/images/avatar/small/justen.jpg' },
  },
]