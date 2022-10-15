import { FunctionComponent, useState } from 'react';
import { Button, Icon, Table } from 'semantic-ui-react';
import SemanticTable from '../../_commons/SemanticTable/SemanticTable';
import JaguarDetail from './Detail/Detail';
import './Jaguar.scss';

interface Props {
}

const Jaguar: FunctionComponent<Props> = (props) => {

  const [jaguar, setJaguar] = useState({} as any);
  const [openModal, setOpenModal] = useState(false);
  const [createMode, setCreateMode] = useState(false);

  const handleAdd = () => {
    setOpenModal(true);
    setCreateMode(true);
  }

  const handleEdit = (jaguar: any) => {
    setOpenModal(true);
    setJaguar(jaguar);
    setCreateMode(false);
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
            <Button icon onClick={handleEdit}>
              <Icon name='edit' />
            </Button>
            <Button icon>
              <Icon name='trash' />
            </Button>
          </Table.Cell>

        </Table.Row >)
    )
  }

  return (
    <div className='jaguar-content'>

      <div className='jaguar-title'>Onça</div>

      <div className='jaguar-section mt-3 flex justify-content-end'>
        <Button icon>
          <Icon name='refresh' />
        </Button>
        <Button icon labelPosition='left' onClick={handleAdd}>
          <Icon name='plus' />
          Adicionar
        </Button>
      </div>

      <div className='jaguar-table mt-3'>
        <SemanticTable
          data={jaguarData}
          tableRows={createTableRow(jaguarData)}
          headers={headers}
          actions
        />
      </div>

      <JaguarDetail
        jaguar={jaguar}
        openModal={openModal}
        createMode={createMode}
        setOpenModal={setOpenModal}
      />
    </div>
  );
};

export default Jaguar;

const headers = ["Nome", "xxxxx", "yyy"];

const jaguarData = [
  { nome: "onça01", xxxxx: "x1", yyyyy: "y1" },
  { nome: "onça02", xxxxx: "x2", yyyyy: "y2" },
  { nome: "onça03", xxxxx: "x3", yyyyy: "y3" },
  { nome: "onça04", xxxxx: "x4", yyyyy: "y4" },
  { nome: "onça05", xxxxx: "x5", yyyyy: "y5" },
  { nome: "onça06", xxxxx: "x6", yyyyy: "y6" },
  { nome: "onça07", xxxxx: "x7", yyyyy: "y7" },
];



