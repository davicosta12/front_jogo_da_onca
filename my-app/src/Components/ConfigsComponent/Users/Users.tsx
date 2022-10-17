import { FunctionComponent, useState } from 'react';
import { Button, Icon, Table } from 'semantic-ui-react';
import DeleteModal from '../../_commons/DeleteModal/DeleteModal';
import SemanticTable from '../../_commons/SemanticTable/SemanticTable';
import UserDetail from './Detail/Detail';
import './Users.scss';

interface Props {
}

const Users: FunctionComponent<Props> = (props) => {

  const [user, setUser] = useState({} as any);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [createMode, setCreateMode] = useState(false);

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
            <Button icon onClick={() => handleEdit(d)}>
              <Icon name='edit' />
            </Button>
            <Button icon onClick={() => handleDelete(d)}>
              <Icon name='trash' />
            </Button>
          </Table.Cell>

        </Table.Row >)
    )
  }

  return (
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
          data={userData}
          tableRows={createTableRow(userData)}
          headers={headers}
          actions
        />
      </div>

      <UserDetail
        user={user}
        openModal={openModal}
        createMode={createMode}
        setOpenModal={setOpenModal}
      />

      <DeleteModal
        openModal={openDeleteModal}
        setOpenModal={setOpenDeleteModal}
        title='Confirmar exclusão'
        subtitle='Deseja realmente excluir o usuário?'
      />
    </div>
  );
};

export default Users;

const headers = ["Id", "Nome", "Email", "Ícones", "N° de Vitórias", "N° de Derrotas"];

const userData = [
  { id: 1, nome: "onça01", e_mail: "x1", senha: "y1", icone: "", nro_win: 1, nro_lose: 3 },
  { id: 2, nome: "onça02", e_mail: "x2", senha: "y2", icone: "", nro_win: 4, nro_lose: 4 },
  { id: 3, nome: "onça03", e_mail: "x3", senha: "y3", icone: "", nro_win: 5, nro_lose: 7 },
  { id: 4, nome: "onça04", e_mail: "x4", senha: "y4", icone: "", nro_win: 2, nro_lose: 5 },
  { id: 5, nome: "onça05", e_mail: "x5", senha: "y5", icone: "", nro_win: 3, nro_lose: 6 },
  { id: 6, nome: "onça06", e_mail: "x6", senha: "y6", icone: "", nro_win: 8, nro_lose: 14 },
  { id: 7, nome: "onça07", e_mail: "x7", senha: "y7", icone: "", nro_win: 10, nro_lose: 7 },
];
