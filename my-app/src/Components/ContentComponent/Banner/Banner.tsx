import { FunctionComponent, useEffect, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { Button, Dimmer, Icon, Image, Loader, Popup, Segment } from 'semantic-ui-react';
import { ThemeContext } from '../../../App';
import { toastError, toastOptions } from '../../../misc/utils/utils/utils';
import BannerService from '../../../Services/Banner/BannerService';
import GetBannerDto from '../../../Services/Banner/dto/GetBannerDto';
import { ActionTypes } from '../../../reducer/reducer';
import DeleteModal from '../../_commons/DeleteModal/DeleteModal';
import SemanticTable from '../../_commons/SemanticTable/SemanticTable';

import './Banner.scss';
import PostBannerDto from '../../../Services/Banner/dto/PostBannerDto';
import BannerDetail from './Detail/Detail';

interface Props {
}

const Banner: FunctionComponent<Props> = (props) => {

  const [banner, setBanner] = useState({} as GetBannerDto);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [createMode, setCreateMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const { state, dispatch } = useContext(ThemeContext);

  const bannerService = new BannerService();

  useEffect(() => {
    getBanners();
  }, []);

  const getBanners = async () => {
    setIsLoading(true);
    try {
      const _banners = await bannerService.getBanners();
      dispatch({
        type: ActionTypes.ADD_BANNER,
        payload: [..._banners]
      });
    }
    catch (err: any) {
      toast.error(toastError(err), toastOptions(toast));
    }
    finally {
      setIsLoading(false);
    }
  }

  const handleCreateBanner = async (values: PostBannerDto) => {
    setIsLoadingForm(true);
    try {
      await bannerService.createBanner(values);
      getBanners();
      setOpenModal(false);
      toast.success("Tabuleiro criado com sucesso.", toastOptions(toast));
    }
    catch (err: any) {
      toast.error(toastError(err), toastOptions(toast));
    }
    finally {
      setIsLoadingForm(false);
    }
  }

  const handleUpdateBanner = async (values: PostBannerDto) => {
    setIsLoadingForm(true);
    try {
      await bannerService.updateBanner(values, +banner.id);
      getBanners();
      setOpenModal(false);
      toast.success("Tabuleiro atualizado com sucesso.", toastOptions(toast));
    }
    catch (err: any) {
      toast.error(toastError(err), toastOptions(toast));
    }
    finally {
      setIsLoadingForm(false);
    }
  }

  const handleDeleteBanner = async () => {
    setIsLoading(true);
    try {
      await bannerService.deleteBanner(+banner.id);
      getBanners();
      setOpenDeleteModal(false);
      toast.success("Tabuleiro removido com sucesso.", toastOptions(toast));
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
    setBanner({} as GetBannerDto);
    setCreateMode(true);
  }

  const handleEdit = (Banner: GetBannerDto) => {
    setOpenModal(true);
    setBanner(Banner);
    setCreateMode(false);
  }

  const handleDelete = (Banner: GetBannerDto) => {
    setBanner(Banner);
    setOpenDeleteModal(true);
  }

  const editAction = (Banner: GetBannerDto) => <Popup
    content='Editar'
    trigger={
      <Button icon onClick={() => handleEdit(Banner)}>
        <Icon name='edit' />
      </Button>
    }
  />

  const removeAction = (Banner: GetBannerDto) => <Popup
    content='Remover'
    trigger={
      <Button color="red" icon onClick={() => handleDelete(Banner)}>
        <Icon name='trash' />
      </Button>
    }
  />

  return (
    <>
      {isLoading && <Segment className='segment-loader'>
        <Dimmer active={isLoading}>
          <Loader content='Carregando...' />
        </Dimmer>
      </Segment>}
      <div className='banner-content'>

        <div className='banner-title'>Banner</div>

        <div className='linhaBox banner-section mt-3 flex justify-content-end'>
          <Popup
            content='Atualizar'
            trigger={
              <Button className='p-button-primary' icon onClick={() => getBanners()}>
                <Icon name='refresh' />
              </Button>
            }
          />

          <Button className='p-button-primary' icon labelPosition='left' onClick={handleAdd}>
            <Icon name='plus' />
            Adicionar
          </Button>
        </div>

        <div className='banner-table mt-3'>
          <SemanticTable
            data={state.banners.map(b => ({
              ...b,
              values: [
                { label: b.id, ...defProps },
                { label: <Image src={b.img_banner || require('../../../assets/defaultImage.png')} size='mini' circular />, ...defProps },
                { label: b.name_banner },
                { label: editAction(b), ...defProps },
                { label: removeAction(b), ...defProps }
              ]
            }))}
            headers={tableHeaders}
          />
        </div>

        <BannerDetail
          banner={banner}
          openModal={openModal}
          createMode={createMode}
          setOpenModal={setOpenModal}
          loading={isLoadingForm}
          onCreate={handleCreateBanner}
          onUpdate={handleUpdateBanner}
        />

        <DeleteModal
          openModal={openDeleteModal}
          setOpenModal={setOpenDeleteModal}
          title='Confirmar exclusão'
          subtitle='Deseja realmente excluir o tabuleiro?'
          onDelete={handleDeleteBanner}
        />
      </div>
    </>
  );
};

export default Banner;

const defProps = { collapse: true, align: 'center' };

const tableHeaders = [
  { id: 'id', label: 'ID' },
  { id: 'img_banner', label: 'Imagem' },
  { id: 'name_banner', label: 'Nome' },
  { id: null, label: null },
  { id: null, label: null },
];