import { FunctionComponent, useState } from 'react';
import { Button, Icon, Label, Pagination, Table } from 'semantic-ui-react';
import JaguarDetail from './Detail/Detail';
import './Jaguar.scss';

interface Props {
}

const Jaguar: FunctionComponent<Props> = (props) => {

  const [openModal, setOpenModal] = useState(false);

  const handleAdd = () => {
    setOpenModal(true);
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
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Header</Table.HeaderCell>
              <Table.HeaderCell>Header</Table.HeaderCell>
              <Table.HeaderCell>Header</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
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
      </div>

      <JaguarDetail
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </div>
  );
};

export default Jaguar;
