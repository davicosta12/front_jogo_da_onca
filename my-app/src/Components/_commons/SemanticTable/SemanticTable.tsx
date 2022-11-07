import { FunctionComponent, useState } from 'react';
import { Pagination, Table } from 'semantic-ui-react';
import "./SemanticTable.scss";

interface Props {
  data: any[],
  headers: any[]
}

const MAX_PER_PAGE = 5;

const SemanticTable: FunctionComponent<Props> = (props) => {

  const { data, headers } = props;

  const [activePage, setActivePage] = useState(1);

  const pages = Math.ceil(data.length / MAX_PER_PAGE);
  const startIndex = (activePage - 1) * MAX_PER_PAGE;
  const endIndex = startIndex + MAX_PER_PAGE;
  const currentItens = data.slice(startIndex, endIndex);

  const handlePaginationChange = (e: any, { activePage }: any) => setActivePage(activePage);

  return (
    <Table className='semanticTable' celled>

      <Table.Header>
        <Table.Row>
          {headers && headers
            .filter(header => !header.hasOwnProperty("visible") || header.visible)
            .map((header, i) =>
              <Table.HeaderCell key={i}
                textAlign={header.align || 'center'}
              >
                {header.label}
              </Table.HeaderCell>
            )}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {currentItens && currentItens.map((item, ind) => {
          return <Table.Row key={ind}
            className={item.isPositive ? 'is-positive' : ''}
            negative={item.isNegative}
            positive={item.positive}
          >
            {item.values
              .filter((row: any) => !row.hasOwnProperty("visible") || row.visible)
              .map((row: any, i: number) =>
                <Table.Cell
                  className={`${row.pre ? 'pre' : ''} ${row.ellipsis ? 'ellipsis' : ''}`}
                  key={i}
                  collapsing={row.collapse}
                  textAlign={row.align}
                >
                  {row.label}
                </Table.Cell>
              )}
          </Table.Row>
        })}
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

}