import { FunctionComponent } from 'react';
import { Pagination, Table } from 'semantic-ui-react';
import "./SemanticTable.scss";

interface Props {
  data: any,
  headers: string[],
  tableRows: any,
  actions?: boolean
}

const SemanticTable: FunctionComponent<Props> = (props) => {

  const { data, tableRows, actions, headers } = props;

  return (
    <Table className='semanticTable' celled>

      <Table.Header>
        <Table.Row>
          {headers.map(h => <Table.HeaderCell>{h}</Table.HeaderCell>)}
          {actions ? <Table.HeaderCell></Table.HeaderCell> : null}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {tableRows}
      </Table.Body>

      <Table.Footer>

        <Table.Row>
          <Table.HeaderCell colSpan={headers.length + 1}>
            <Pagination
              boundaryRange={0}
              defaultActivePage={1}
              ellipsisItem={null}
              firstItem={null}
              lastItem={null}
              siblingRange={1}
              totalPages={10}
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