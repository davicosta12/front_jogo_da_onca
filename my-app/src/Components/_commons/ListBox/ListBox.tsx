import { FunctionComponent, useContext, useState } from 'react'
import { Button, Form, Icon, Image, List, Modal, Popup } from 'semantic-ui-react'
import _ from 'lodash';
import GetBoardDto from '../../../Services/Board/dto/GetBoardDto';
import BoardDetail from '../../ContentComponent/Board/Detail/Detail';
import PostBoardDto from '../../../Services/Board/dto/PostBoardDto';

interface Props {
  dataList: GetBoardDto[];
  setDataList: any
}

const ListData: FunctionComponent<Props> = (props) => {

  const [board, setBoard] = useState({} as GetBoardDto);
  const [openDetail, setOpenDetail] = useState(false);
  const [createMode, setCreateMode] = useState(false);

  const handleCreate = (board: PostBoardDto) => {
    handleAddArrayItem(board);
    setOpenDetail(false);
  }

  const handleAddArrayItem = (item: any) => {
    if (item && props.dataList) {
      const addItems = [...props.dataList, { ...item }];
      const uniqItems = _.uniqBy(addItems, "name_tabuleiro");
      props.setDataList(uniqItems);
    }
  }

  const handleRemoveArrayItem = (rowIndex: number) => {
    let listCopy = [...props.dataList];
    listCopy.splice(rowIndex, 1);
    props.setDataList(listCopy);
  }

  const handleAdd = () => {
    setBoard({} as GetBoardDto);
    setOpenDetail(true);
    setCreateMode(true);
  }

  const handleEdit = (board: GetBoardDto) => {
    setBoard(board);
    setOpenDetail(true);
    setCreateMode(false);
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
              <Image avatar src={data?.img_tabuleiro} />
              <List.Content>{data?.name_tabuleiro}</List.Content>
            </List.Item>
          )}
      </List>

      <BoardDetail
        board={board}
        openModal={openDetail}
        createMode={createMode}
        onCreate={handleCreate}
        editText='Detalhes do Tabuleiro'
        isArray
        disabledAction={!createMode}
        setOpenModal={setOpenDetail}
      />
    </div>
  )
}

export default ListData