import { FunctionComponent, useContext, useState } from 'react'
import { Button, Form, Icon, Image, List, Modal, Popup } from 'semantic-ui-react'
import _ from 'lodash';
import { ThemeContext } from '../../../App';
import GetBoardDto from '../../../Services/Board/dto/GetBoardDto';
import BoardDetail from '../../ContentComponent/Board/Detail/Detail';

interface Props {
  dataList: GetBoardDto[];
  setDataList: any
}

const ListData: FunctionComponent<Props> = (props) => {

  const [board, setBoard] = useState({} as GetBoardDto);
  const [openModal, setOpenModal] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const { state, dispatch } = useContext(ThemeContext);

  const handleAddArrayItem = (item: any) => {
    const addItems = [...props.dataList, { ...item }];
    const uniqItems = _.uniqBy(addItems, "id");
    props.setDataList(uniqItems);
  }

  const handleRemoveArrayItem = (rowIndex: number) => {
    let listCopy = [...props.dataList];
    listCopy.splice(rowIndex, 1);
    props.setDataList(listCopy);
  }

  const handleAdd = () => {
    setOpenModal(true);
  }

  const handleEdit = (board: GetBoardDto) => {
    setOpenDetail(true);
    setBoard(board);
  }

  const editAction = (board: GetBoardDto) => <Popup
    content='Detalhes'
    trigger={
      <Button icon onClick={() => handleEdit(board)}>
        <Icon name='edit' />
      </Button>
    }
  />

  const removeAction = (rowIndex: number) => <Popup
    content='Remover'
    trigger={
      <Button color="red" icon onClick={() => handleRemoveArrayItem(rowIndex)}>
        <Icon name='trash' />
      </Button>
    }
  />

  const ChoiceDataModal = () => {

    const INITIAL_FORM_VALUES = {
      id: 0,
      name_tabuleiro: '',
      img_tabuleiro: ''
    } as GetBoardDto;

    const [formValues, setFormValues] = useState(INITIAL_FORM_VALUES);

    const handleSubmit = () => {
      const board = state.boards.filter(b => b.id === formValues.id)[0];
      handleAddArrayItem(board);
      setOpenModal(false);
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
        <Modal.Header>Selecione um Tabuleiro</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form>
              <Form.Group widths='equal'>
                <Form.Dropdown
                  fluid
                  name="id"
                  label='Tabuleiro'
                  value={formValues.id}
                  options={state.boards.map(b => Object.assign({}, {
                    key: b.id,
                    text: b.name_tabuleiro,
                    value: b.id,
                    image: { avatar: true, src: b.img_tabuleiro },
                  }))}
                  selection
                  onChange={handleChange}
                  placeholder='Tabuleiro'
                  required
                  error={!formValues.id}
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
            onClick={handleSubmit}
            disabled={!formValues.id}
            positive
          />
        </Modal.Actions>
      </Modal>
    );
  }

  return (
    <div>
      <div className='flex justify-content-end'>
        <Popup
          content='Adicionar'
          trigger={
            <Button className='primary' icon onClick={handleAdd}>
              <Icon name='plus' />
            </Button>
          }
        />
      </div>

      <List divided verticalAlign='middle'>
        {
          props.dataList.map((data: GetBoardDto, i: number) =>
            <List.Item key={i}>
              <List.Content floated='right'>
                {editAction(data)}
                {removeAction(i)}
              </List.Content>
              <Image avatar src={data.img_tabuleiro} />
              <List.Content>{data.name_tabuleiro}</List.Content>
            </List.Item>
          )}
      </List>

      <ChoiceDataModal />
      <BoardDetail
        board={board}
        openModal={openDetail}
        createMode={false}
        disabledAction
        editText='Detalhes do Tabuleiro'
        setOpenModal={setOpenDetail}
      />
    </div>
  )
}

export default ListData