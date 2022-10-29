import { FunctionComponent, useState } from 'react';
import { Pagination, Table } from 'semantic-ui-react';
import "./SemanticTable.scss";

interface Props {
  data: any,
  headers: string[],
  tableActions: any,
  desactiveColumns?: string[],
  actions?: boolean
}

const MAX_PER_PAGE = 5;

const SemanticTable: FunctionComponent<Props> = (props) => {

  const { data, tableActions, desactiveColumns, actions, headers } = props;

  const [activePage, setActivePage] = useState(1);

  const pages = Math.ceil(data.length / MAX_PER_PAGE);
  const startIndex = (activePage - 1) * MAX_PER_PAGE;
  const endIndex = startIndex + MAX_PER_PAGE;
  const currentItens = data.slice(startIndex, endIndex);

  const handlePaginationChange = (e: any, { activePage }: any) => setActivePage(activePage);

  const createTableCell = (item: any) => {
    const itemsCell: any[] = [];

    for (const prop in item) {

      if (desactiveColumns?.length) {

        if (!desactiveColumns.includes(prop)) {
          itemsCell.push(item[prop]);
        }

      }

      else {
        itemsCell.push(item[prop]);
      }

    }

    return (
      itemsCell.map(item =>
        <Table.Cell>
          {item}
        </Table.Cell>)
    );

  }

  const createTableRow = () => {

    return (
      currentItens.map((d: any) =>
        <Table.Row>
          {createTableCell(d)}
          {actions ? <Table.Cell collapsing>{tableActions(d)}</Table.Cell> : null}
        </Table.Row >)
    )
  }

  return (
    <Table className='semanticTable' celled>

      <Table.Header>
        <Table.Row>
          {headers.map(h => <Table.HeaderCell>{h}</Table.HeaderCell>)}
          {actions ? <Table.HeaderCell></Table.HeaderCell> : null}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {createTableRow()}
      </Table.Body>

      <Table.Footer>

        <Table.Row>
          <Table.HeaderCell colSpan={headers.length + 2}>
            <Pagination
              activePage={activePage}
              onPageChange={handlePaginationChange}
              boundaryRange={0}
              ellipsisItem={null}
              firstItem={null}
              lastItem={null}
              siblingRange={10}
              totalPages={pages}
            />
          </Table.HeaderCell>
        </Table.Row>

      </Table.Footer>

    </Table>
  );
};

export default SemanticTable

SemanticTable.defaultProps = {
  actions: false,
}