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

  const handleChange = (ev: any) => {
    setFormValues({ ...formValues, [ev.target.id]: ev.target.value })
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
              {/* {!createMode ?
                <Form.Input
                  fluid
                  id="id"
                  label='Id'
                  value={formValues.id}
                  onChange={handleChange}
                  placeholder='Id'
                />
                : null} */}
              <Form.Input
                fluid
                id="name_tabuleiro"
                label='Nome'
                value={formValues.name_tabuleiro}
                onChange={handleChange}
                placeholder='Nome'
              />
              <Form.Input
                fluid
                id="inicio"
                label='Url da imagem'
                value={formValues.img_tabuleiro}
                onChange={handleChange}
                placeholder='Data Inicial'
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

