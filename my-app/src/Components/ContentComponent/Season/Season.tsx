import { FunctionComponent, useEffect, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { Button, Dimmer, Icon, Loader, Popup, Segment, Table } from 'semantic-ui-react';
import { ThemeContext } from '../../../App';
import { toastError, toastOptions } from '../../../misc/utils/utils/utils';
import GetSeasonDto from '../../../Services/Season/dto/GetSeasonDto';
import SeasonService from '../../../Services/Season/SeasonService';
import { ActionTypes } from '../../reducer/reducer';
import DeleteModal from '../../_commons/DeleteModal/DeleteModal';
import SemanticTable from '../../_commons/SemanticTable/SemanticTable';
import SeasonDetail from './Detail/Detail';
import './Season.scss';

interface Props {
}

const Season: FunctionComponent<Props> = (props) => {

  const [season, setSeason] = useState({} as GetSeasonDto);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [createMode, setCreateMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const { state, dispatch } = useContext(ThemeContext);

  const seasonService = new SeasonService();

  useEffect(() => {
    getSeasons();
  }, []);

  const getSeasons = async () => {
    setIsLoading(true);
    try {
      const _seasons = await seasonService.getSeasons();
      dispatch({
        type: ActionTypes.ADD_SEASON,
        payload: [..._seasons]
      });
    }
    catch (err: any) {
      toast.error(toastError(err), toastOptions(toast));
    }
    finally {
      setIsLoading(false);
    }
  }

  const handleCreateSeason = async (values: GetSeasonDto) => {
    setIsLoadingForm(true);
    try {
      await seasonService.createSeason(values);
      getSeasons();
      setOpenModal(false);
    }
    catch (err: any) {
      toast.error(toastError(err), toastOptions(toast));
    }
    finally {
      setIsLoadingForm(false);
    }
  }

  const handleUpdateSeason = async (values: GetSeasonDto) => {
    setIsLoadingForm(true);
    try {
      await seasonService.updateSeason(values, +season.id);
      getSeasons();
      setOpenModal(false);
    }
    catch (err: any) {
      toast.error(toastError(err), toastOptions(toast));
    }
    finally {
      setIsLoadingForm(false);
    }
  }

  const handleDeleteSeason = async () => {
    setIsLoading(true);
    try {
      await seasonService.deleteSeason(+season.id);
      getSeasons();
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
    setSeason({} as GetSeasonDto);
    setCreateMode(true);
  }

  const handleEdit = (season: GetSeasonDto) => {
    setOpenModal(true);
    setSeason(season);
    setCreateMode(false);
  }

  const handleDelete = (season: GetSeasonDto) => {
    setSeason(season);
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
      <div className='season-content'>

        <div className='season-title'>Temporada</div>

        <div className='linhaBox season-section mt-3 flex justify-content-end'>
          <Popup
            content='Atualizar'
            trigger={
              <Button className='p-button-primary' icon onClick={() => getSeasons()}>
                <Icon name='refresh' />
              </Button>
            }
          />

          <Button className='p-button-primary' icon labelPosition='left' onClick={handleAdd}>
            <Icon name='plus' />
            Adicionar
          </Button>
        </div>

        <div className='season-table mt-3'>
          <SemanticTable
            data={state.seasons}
            tableRows={createTableRow(state.seasons)}
            headers={headers}
            actions
          />
        </div>

        <SeasonDetail
          season={season}
          openModal={openModal}
          createMode={createMode}
          setOpenModal={setOpenModal}
          loading={isLoadingForm}
          onCreate={handleCreateSeason}
          onUpdate={handleUpdateSeason}
        />

        <DeleteModal
          openModal={openDeleteModal}
          setOpenModal={setOpenDeleteModal}
          title='Confirmar exclusão'
          subtitle='Deseja realmente excluir a temporada?'
          onDelete={handleDeleteSeason}
        />
      </div>
    </>
  );
};

export default Season;

const headers = ["ID", "Nome", "Data Inicial", "Data Final"];