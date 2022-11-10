import { FunctionComponent, useContext, useEffect, useState } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import { ThemeContext } from '../../../../App';
import { boardImagesOptions } from '../../../../misc/utils/utils/options';
import GetBoardDto from '../../../../Services/Board/dto/GetBoardDto';
import PostBoardDto from '../../../../Services/Board/dto/PostBoardDto';

interface Props {
  board: GetBoardDto;
  openModal: boolean;
  createMode: boolean;
  onCreate?: (values: PostBoardDto) => void;
  onUpdate?: (values: PostBoardDto) => void;
  disabledAction?: boolean;
  isArray?: boolean;
  editText?: string;
  loading?: boolean;
  setOpenModal: any;
}

const INITIAL_FORM_VALUES = {
  idSeason: 0,
  name_tabuleiro: '',
  img_tabuleiro: ''
} as PostBoardDto;

const BoardDetail: FunctionComponent<Props> = (props) => {

  const [formValues, setFormValues] = useState(INITIAL_FORM_VALUES);
  const { state, dispatch } = useContext(ThemeContext);

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
        idSeason: board.season?.id,
        name_tabuleiro: board.name_tabuleiro,
        img_tabuleiro: board.img_tabuleiro,
      });
    } else {
      setFormValues(INITIAL_FORM_VALUES);
    }
  }, [board, openModal]);

  const handleSubmit = (values: PostBoardDto) => {
    createMode
      ? onCreate?.(values)
      : onUpdate?.(values);
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
      <Modal.Header>{createMode ? "Adicionar Tabuleiro" : props.editText}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form>
            {!props.isArray && < Form.Dropdown
              fluid
              name="idSeason"
              label='Temporada'
              value={formValues.idSeason}
              options={state.seasons.map(b => Object.assign({}, {
                key: b.id,
                text: b.nome_season,
                value: b.id,
              }))}
              selection
              onChange={handleChange}
              placeholder='Temporada'
              disabled={!createMode}
              required
              error={!formValues.idSeason}
            />}
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
                options={boardImagesOptions}
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
        {!props.disabledAction && <Button
          content="Salvar"
          labelPosition='right'
          icon='checkmark'
          onClick={() => handleSubmit(formValues)}
          loading={props.loading}
          disabled={!formValues.name_tabuleiro || !formValues.img_tabuleiro || (props.isArray ? !props.isArray : !formValues.idSeason)}
          positive
        />}
      </Modal.Actions>
    </Modal>
  )
}

export default BoardDetail

BoardDetail.defaultProps = {
  disabledAction: false,
  isArray: false,
  editText: "Editar Tabuleiro"
}