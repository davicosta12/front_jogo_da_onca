import { FunctionComponent, useEffect, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { Button, Dimmer, Icon, Image, Loader, Popup, Segment, Table } from 'semantic-ui-react';
import { ThemeContext } from '../../../App';
import { toastError, toastOptions } from '../../../misc/utils/utils/utils';
import BoardService from '../../../Services/Board/BoardService';
import GetBoardDto from '../../../Services/Board/dto/GetBoardDto';
import { ActionTypes } from '../../../reducer/reducer';
import DeleteModal from '../../_commons/DeleteModal/DeleteModal';
import SemanticTable from '../../_commons/SemanticTable/SemanticTable';

import './Board.scss';
import BoardDetail from './Detail/Detail';
import PostBoardDto from '../../../Services/Board/dto/PostBoardDto';

interface Props {
}

const Board: FunctionComponent<Props> = (props) => {

  const [board, setBoard] = useState({} as GetBoardDto);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [createMode, setCreateMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const { state, dispatch } = useContext(ThemeContext);

  const boardService = new BoardService();

  useEffect(() => {
    getBoards();
  }, []);

  const getBoards = async () => {
    setIsLoading(true);
    try {
      const _boards = await boardService.getBoards();
      dispatch({
        type: ActionTypes.ADD_BOARD,
        payload: [..._boards]
      });
    }
    catch (err: any) {
      toast.error(toastError(err), toastOptions(toast));
    }
    finally {
      setIsLoading(false);
    }
  }

  const handleCreateBoard = async (values: PostBoardDto) => {
    setIsLoadingForm(true);
    try {
      await boardService.createBoard(values);
      getBoards();
      setOpenModal(false);
      toast.success("Tabuleiro criado com sucesso.", toastOptions(toast));
    }
    catch (err: any) {
      toast.error(toastError(err), toastOptions(toast));
    }
    finally {
      setIsLoadingForm(false);
    }
  }

  const handleUpdateBoard = async (values: PostBoardDto) => {
    setIsLoadingForm(true);
    try {
      await boardService.updateBoard(values, +board.id);
      getBoards();
      setOpenModal(false);
      toast.success("Tabuleiro atualizado com sucesso.", toastOptions(toast));
    }
    catch (err: any) {
      toast.error(toastError(err), toastOptions(toast));
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
      toast.success("Tabuleiro removido com sucesso.", toastOptions(toast));
    }
    catch (err: any) {
      toast.error(toastError(err), toastOptions(toast));
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

  const editAction = (board: GetBoardDto) => <Popup
    content='Editar'
    trigger={
      <Button icon onClick={() => handleEdit(board)}>
        <Icon name='edit' />
      </Button>
    }
  />

  const removeAction = (board: GetBoardDto) => <Popup
    content='Remover'
    trigger={
      <Button color="red" icon onClick={() => handleDelete(board)}>
        <Icon name='trash' />
      </Button>
    }
  />

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

          {/* <Button className='p-button-primary' icon labelPosition='left' onClick={handleAdd}>
            <Icon name='plus' />
            Adicionar
          </Button> */}
        </div>

        <div className='board-table mt-3'>
          <SemanticTable
            data={state.boards.map(b => ({
              ...b,
              values: [
                { label: b.id, ...defProps },
                { label: b.name_tabuleiro, collapse: true },
                { label: <Image src={b.img_tabuleiro || require('../../../assets/defaultImage.png')} size='mini' circular />, collapse: true },
                { label: b.season?.nome_season},
                { label: editAction(b), ...defProps },
                { label: removeAction(b), ...defProps }
              ]
            }))}
            headers={tableHeaders}
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

const defProps = { collapse: true, align: 'center' };

const tableHeaders = [
  { id: 'id', label: 'ID' },
  { id: 'name_tabuleiro', label: 'Nome' },
  { id: 'img_tabuleiro', label: 'Imagem' },
  { id: 'temporada_associada', label: 'Temporada Associada' },
  { id: null, label: null },
  { id: null, label: null },
];