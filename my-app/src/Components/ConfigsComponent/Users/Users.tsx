import { FunctionComponent, useEffect, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { Button, Dimmer, Icon, Loader, Popup, Segment, Table } from 'semantic-ui-react';
import { ThemeContext } from '../../../App';
import { toastError, toastOptions } from '../../../misc/utils/utils';
import GetUserDto from '../../../Services/Users/dto/GetUserDto';
import UserService from '../../../Services/Users/UserService';
import { ActionTypes } from '../../reducer/reducer';
import DeleteModal from '../../_commons/DeleteModal/DeleteModal';
import SemanticTable from '../../_commons/SemanticTable/SemanticTable';
import UserDetail from './Detail/Detail';
import './Users.scss';

interface Props {
}

const Users: FunctionComponent<Props> = (props) => {

  const [user, setUser] = useState({} as GetUserDto);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [createMode, setCreateMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const { state, dispatch } = useContext(ThemeContext);

  const userService = new UserService();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    setIsLoading(true);
    try {
      const _users = await userService.getUsers();
      dispatch({
        type: ActionTypes.ADD_USER,
        payload: [..._users]
      });
    }
    catch (err: any) {
      toast.error(toastError(err), toastOptions(toast));
    }
    finally {
      setIsLoading(false);
    }
  }

  const handleCreateUser = async (values: GetUserDto) => {
    setIsLoadingForm(true);
    try {
      await userService.createUser(values);
      getUsers();
      setOpenModal(false);
    }
    catch (err: any) {
      toast.error(toastError(err), toastOptions(toast));
    }
    finally {
      setIsLoadingForm(false);
    }
  }

  const handleUpdateUser = async (values: GetUserDto) => {
    setIsLoadingForm(true);
    try {
      await userService.updateUser(values, +user.id);
      getUsers();
      setOpenModal(false);
    }
    catch (err: any) {
      toast.error(toastError(err), toastOptions(toast));
    }
    finally {
      setIsLoadingForm(false);
    }
  }

  const handleDeleteUser = async (user: GetUserDto) => {
    setIsLoading(true);
    try {
      await userService.deleteUser(+user.id);
      getUsers();
      setOpenDeleteModal(false);
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
    setUser({} as any);
    setCreateMode(true);
  }

  const handleEdit = (user: any) => {
    setOpenModal(true);
    setUser(user);
    setCreateMode(false);
  }

  const handleDelete = (user: any) => {
    setOpenDeleteModal(true);
  }

  const createTableCell = (item: any) => {
    const itemsCell: any[] = [];

    for (const prop in item) {
      if (!["senha"].includes(prop)) {
        itemsCell.push(item[prop]);
      }
    }

    return (
      itemsCell.map(item =>
        <Table.Cell>
          {item}
        </Table.Cell>
      ));

  }

  const createTableRow = (data: any[]) => {

    return (
      data.map(d =>
        <Table.Row key={d.id}>
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

      <div className='user-content'>

        <div className='user-title'>Usuário</div>

        <div className='linhaBox user-section mt-3 flex justify-content-end'>
          <Button className='p-button-primary' icon>
            <Icon name='refresh' />
          </Button>
          <Button className='p-button-primary' icon labelPosition='left' onClick={handleAdd}>
            <Icon name='plus' />
            Adicionar
          </Button>
        </div>

        <div className='user-table mt-3'>
          <SemanticTable
            data={state.users}
            tableRows={createTableRow(state.users)}
            headers={headers}
            actions
          />
        </div>

        <UserDetail
          user={user}
          openModal={openModal}
          createMode={createMode}
          loading={isLoadingForm}
          onCreate={handleCreateUser}
          onUpdate={handleUpdateUser}
          setOpenModal={setOpenModal}
        />

        <DeleteModal
          openModal={openDeleteModal}
          setOpenModal={setOpenDeleteModal}
          title='Confirmar exclusão'
          subtitle='Deseja realmente excluir o usuário?'
        />
      </div>
    </>
  );
};

export default Users;

const headers = ["Id", "Nome", "Email", "Ícones", "N° de Vitórias", "N° de Derrotas"];