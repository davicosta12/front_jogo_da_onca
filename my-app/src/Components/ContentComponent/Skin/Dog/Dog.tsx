import { FunctionComponent, useEffect, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { Button, Dimmer, Icon, Loader, Popup, Segment, Table } from 'semantic-ui-react';
import { ThemeContext } from '../../../../App';
import { toastError, toastOptions } from '../../../../misc/utils/utils/utils';
import GetDogSkinDto from '../../../../Services/Skins/dto/GetDogSkinDto';
import SkinService from '../../../../Services/Skins/SkinService';
import { ActionTypes } from '../../../../reducer/reducer';
import DeleteModal from '../../../_commons/DeleteModal/DeleteModal';
import SemanticTable from '../../../_commons/SemanticTable/SemanticTable';
import SkinDetail from './Detail/Detail';


interface Props {
}

const DogSkin: FunctionComponent<Props> = (props) => {

  const [dogSkin, setDogSkin] = useState({} as GetDogSkinDto);
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
      const _skins = await skinService.getDogSkins();
      dispatch({
        type: ActionTypes.ADD_DOG_SKIN,
        payload: [..._skins]
      });
    }
    catch (err: any) {
      toast.error(toastError(err), toastOptions(toast));
      console.log(err);
    }
    finally {
      setIsLoading(false);
    }
  }

  const handleCreateSkin = async (values: GetDogSkinDto) => {
    setIsLoadingForm(true);
    try {
      await skinService.createDogSkin(values);
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

  const handleUpdateSkin = async (values: GetDogSkinDto) => {
    setIsLoadingForm(true);
    try {
      await skinService.updateDogSkin(values, +dogSkin.idSkinCao);
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
      await skinService.deleteDogSkin(+dogSkin.idSkinCao);
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
    setDogSkin({} as GetDogSkinDto);
    setCreateMode(true);
  }

  const handleEdit = (skin: GetDogSkinDto) => {
    setOpenModal(true);
    setDogSkin(skin);
    setCreateMode(false);
  }

  const handleDelete = (skin: GetDogSkinDto) => {
    setDogSkin(skin);
    setOpenDeleteModal(true);
  }

  const createActions = (skin: GetDogSkinDto) => {
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
            data={state.dogSkins}
            tableActions={createActions}
            headers={headers}
            actions
          />
        </div>

        <SkinDetail
          skin={dogSkin}
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
          subtitle='Deseja realmente excluir a skin do cachorro?'
          onDelete={handleDeleteSkin}
        />
      </div>
    </>
  );
};

export default DogSkin;

const headers = ["ID", "Nome", "Url da Imagem", "Temporada Associada"];