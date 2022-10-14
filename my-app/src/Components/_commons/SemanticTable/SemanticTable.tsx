import { FunctionComponent } from 'react';
import { Button, Icon, Label, Pagination, Table } from 'semantic-ui-react';

interface Props {
  data: any,
  headers: string[],
  actions?: boolean
}

const SemanticTable: FunctionComponent<Props> = (props) => {

  const { data, actions, headers } = props;

  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          {headers.map(h => <Table.HeaderCell>{h}</Table.HeaderCell>)}
          {actions ? <Table.HeaderCell></Table.HeaderCell> : null}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row>
          <Table.Cell>
            <Label ribbon>First</Label>
          </Table.Cell>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell collapsing>
            <Button icon>
              <Icon name='edit' />
            </Button>
            <Button icon>
              <Icon name='trash' />
            </Button>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell collapsing>
            <Button icon>
              <Icon name='edit' />
            </Button>
            <Button icon>
              <Icon name='trash' />
            </Button>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell collapsing>
            <Button icon>
              <Icon name='edit' />
            </Button>
            <Button icon>
              <Icon name='trash' />
            </Button>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell collapsing>
            <Button icon>
              <Icon name='edit' />
            </Button>
            <Button icon>
              <Icon name='trash' />
            </Button>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell collapsing>
            <Button icon>
              <Icon name='edit' />
            </Button>
            <Button icon>
              <Icon name='trash' />
            </Button>
          </Table.Cell>
        </Table.Row>
      </Table.Body>

      <Table.Footer>
        <Table.Row>
          <Table.HeaderCell colSpan='4'>
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
