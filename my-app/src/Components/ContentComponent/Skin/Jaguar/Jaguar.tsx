import { FunctionComponent, useEffect, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { Button, Dimmer, Icon, Loader, Popup, Segment, Table } from 'semantic-ui-react';
import { ThemeContext } from '../../../../App';
import { toastError, toastOptions } from '../../../../misc/utils/utils/utils';
import GetJaguarSkinDto from '../../../../Services/Skins/dto/GetJaguarSkinDto';
import SkinService from '../../../../Services/Skins/SkinService';
import { ActionTypes } from '../../../../reducer/reducer';
import DeleteModal from '../../../_commons/DeleteModal/DeleteModal';
import SemanticTable from '../../../_commons/SemanticTable/SemanticTable';
import SkinDetail from './Detail/Detail';


interface Props {
}

const JaguarSkin: FunctionComponent<Props> = (props) => {

  const [jaguarSkin, setJaguarSkin] = useState({} as GetJaguarSkinDto);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [createMode, setCreateMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingForm, setIsLoadingForm] = useState(false);

  const { state, dispatch } = useContext(ThemeContext);
  const skinService = new SkinService();

  useEffect(() => {
    getSkins();
  }, []);

  const getSkins = async () => {
    setIsLoading(true);
    try {
      const _skins = await skinService.getJaguarSkins();
      dispatch({
        type: ActionTypes.ADD_JAGUAR_SKIN,
        payload: [..._skins]
      });
    }
    catch (err: any) {
      toast.error(toastError(err), toastOptions(toast));
    }
    finally {
      setIsLoading(false);
    }
  }

  const handleCreateSkin = async (values: GetJaguarSkinDto) => {
    setIsLoadingForm(true);
    try {
      await skinService.createJaguarSkin(values);
      getSkins();
      setOpenModal(false);
    }
    catch (err: any) {
      toast.error(toastError(err), toastOptions(toast));
    }
    finally {
      setIsLoadingForm(false);
    }
  }

  const handleUpdateSkin = async (values: GetJaguarSkinDto) => {
    setIsLoadingForm(true);
    try {
      await skinService.updateJaguarSkin(values, +jaguarSkin.id);
      getSkins();
      setOpenModal(false);
    }
    catch (err: any) {
      toast.error(toastError(err), toastOptions(toast));
    }
    finally {
      setIsLoadingForm(false);
    }
  }

  const handleDeleteSkin = async () => {
    setIsLoading(true);
    try {
      await skinService.deleteJaguarSkin(+jaguarSkin.id);
      getSkins();
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
    setJaguarSkin({} as GetJaguarSkinDto);
    setCreateMode(true);
  }

  const handleEdit = (skin: GetJaguarSkinDto) => {
    setOpenModal(true);
    setJaguarSkin(skin);
    setCreateMode(false);
  }

  const handleDelete = (skin: GetJaguarSkinDto) => {
    setJaguarSkin(skin);
    setOpenDeleteModal(true);
  }

  const createActions = (skin: GetJaguarSkinDto) => {
    return (
      <>
        <Popup
          content='Editar'
          trigger={
            <Button icon onClick={() => handleEdit(skin)}>
              <Icon name='edit' />
            </Button>
          }
        />
        <Popup
          content='Remover'
          trigger={
            <Button color="red" icon onClick={() => handleDelete(skin)}>
              <Icon name='trash' />
            </Button>
          }
        />
      </>
    );
  }

  return (
    <>
      {isLoading &&
        <Segment className='segment-loader'>
          <Dimmer active={isLoading}>
            <Loader content='Carregando...' />
          </Dimmer>
        </Segment>}
      <div className='dog-content'>

        <div className='linhaBox style-section mt-3 flex justify-content-end'>
          <Popup
            content='Atualizar'
            trigger={
              <Button className='p-button-primary' icon onClick={() => getSkins()}>
                <Icon name='refresh' />
              </Button>
            }
          />

          <Button className='p-button-primary' icon labelPosition='left' onClick={handleAdd}>
            <Icon name='plus' />
            Adicionar
          </Button>
        </div>

        <div className='dog-table mt-3'>
          <SemanticTable
            data={state.jaguarSkins}
            tableActions={createActions}
            headers={headers}
            actions
          />
        </div>

        <SkinDetail
          skin={jaguarSkin}
          openModal={openModal}
          createMode={createMode}
          setOpenModal={setOpenModal}
          loading={isLoadingForm}
          onCreate={handleCreateSkin}
          onUpdate={handleUpdateSkin}
        />

        <DeleteModal
          openModal={openDeleteModal}
          setOpenModal={setOpenDeleteModal}
          title='Confirmar exclusão'
          subtitle='Deseja realmente excluir a skin da onça?'
          onDelete={handleDeleteSkin}
        />
      </div>
    </>
  );
};

export default JaguarSkin;

const headers = ["ID", "Nome", "Imagem", "Temporada Associada"];