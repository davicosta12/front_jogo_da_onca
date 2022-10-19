import { FunctionComponent, useEffect, useState } from 'react';
import { Button, Dimmer, Icon, Loader, Popup, Segment, Table } from 'semantic-ui-react';
import BoardService from '../../../Services/Board/BoardService';
import GetBoardDto from '../../../Services/Board/dto/GetBoardDto';
import DeleteModal from '../../_commons/DeleteModal/DeleteModal';
import SemanticTable from '../../_commons/SemanticTable/SemanticTable';

import './Board.scss';
import BoardDetail from './Detail/Detail';

interface Props {
}

const Board: FunctionComponent<Props> = (props) => {

  const [boards, setBoards] = useState<GetBoardDto[]>([]);
  const [board, setBoard] = useState({} as GetBoardDto);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [createMode, setCreateMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingForm, setIsLoadingForm] = useState(false);

  const boardService = new BoardService();

  useEffect(() => {
    getBoards();
  }, []);

  const getBoards = async () => {
    setIsLoading(true);
    try {
      const _boards = await boardService.getBoards();
      setBoards([..._boards]);
    }
    catch (err: any) {
      console.log(err);
    }
    finally {
      setIsLoading(false);
    }
  }

  const handleCreateBoard = async (values: GetBoardDto) => {
    setIsLoadingForm(true);
    try {
      await boardService.createBoard(values);
      getBoards();
      setOpenModal(false);
    }
    catch (err: any) {
      console.log(err);
    }
    finally {
      setIsLoadingForm(false);
    }
  }

  const handleUpdateBoard = async (values: GetBoardDto) => {
    setIsLoadingForm(true);
    try {
      await boardService.updateBoard(values, +board.id);
      getBoards();
      setOpenModal(false);
    }
    catch (err: any) {
      console.log(err);
    }
    finally {
      setIsLoadingForm(false);
    }
  }

  const handleDeleteBoard = async () => {
    setIsLoading(true);
    try {
      await boardService.deleteBoard(+board.id);
      getBoards();
      setOpenDeleteModal(false);
    }
    catch (err: any) {
      console.log(err);
    }
    finally {
      setIsLoading(false);
    }
  }

  const handleAdd = () => {
    setOpenModal(true);
    setBoard({} as GetBoardDto);
    setCreateMode(true);
  }

  const handleEdit = (board: GetBoardDto) => {
    setOpenModal(true);
    setBoard(board);
    setCreateMode(false);
  }

  const handleDelete = (board: GetBoardDto) => {
    setBoard(board);
    setOpenDeleteModal(true);
  }

  const createTableCell = (item: any) => {
    const itemsCell: any[] = [];

    for (const prop in item) {
      itemsCell.push(item[prop]);
    }

    return (
      itemsCell.map(item =>
        <Table.Cell>
          {item}
        </Table.Cell>)
    );

  }

  const createTableRow = (data: any[]) => {

    return (
      data.map(d =>
        <Table.Row>
          {createTableCell(d)}

          <Table.Cell collapsing>
            <Popup
              content='Editar'
              trigger={
                <Button icon onClick={() => handleEdit(d)}>
                  <Icon name='edit' />
                </Button>
              }
            />
            <Popup
              content='Remover'
              trigger={
                <Button color="red" icon onClick={() => handleDelete(d)}>
                  <Icon name='trash' />
                </Button>
              }
            />
          </Table.Cell>

        </Table.Row >)
    )
  }

  return (
    <>
      {isLoading && <Segment className='segment-loader'>
        <Dimmer active={isLoading}>
          <Loader content='Carregando...' />
        </Dimmer>
      </Segment>}
      <div className='board-content'>

        <div className='board-title'>Tabuleiro</div>

        <div className='linhaBox board-section mt-3 flex justify-content-end'>
          <Popup
            content='Atualizar'
            trigger={
              <Button className='p-button-primary' icon onClick={() => getBoards()}>
                <Icon name='refresh' />
              </Button>
            }
          />

          <Button className='p-button-primary' icon labelPosition='left' onClick={handleAdd}>
            <Icon name='plus' />
            Adicionar
          </Button>
        </div>

        <div className='board-table mt-3'>
          <SemanticTable
            data={boards}
            tableRows={createTableRow(boards)}
            headers={headers}
            actions
          />
        </div>

        <BoardDetail
          board={board}
          openModal={openModal}
          createMode={createMode}
          setOpenModal={setOpenModal}
          loading={isLoadingForm}
          onCreate={handleCreateBoard}
          onUpdate={handleUpdateBoard}
        />

        <DeleteModal
          openModal={openDeleteModal}
          setOpenModal={setOpenDeleteModal}
          title='Confirmar exclusão'
          subtitle='Deseja realmente excluir o tabuleiro?'
          onDelete={handleDeleteBoard}
        />
      </div>
    </>
  );
};

export default Board;

const headers = ["ID", "Nome", "Url da Imagem"];