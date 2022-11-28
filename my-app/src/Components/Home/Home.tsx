import moment from 'moment';
import { FunctionComponent, useContext, useEffect, useState } from 'react';
// import io from 'socket.io-client';
// import uuid from 'uuid/v4';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Grid, Menu, Button, Segment, Dimmer, Loader, Image } from 'semantic-ui-react';
import ImageGallery from 'react-image-gallery';
import { ThemeContext } from '../../App';
import { toastError, toastOptions } from '../../misc/utils/utils/utils';
import { logout, setUserCache } from '../../Services/AuthService/Auth';
import GetSeasonDto from '../../Services/Season/dto/GetSeasonDto';
import SeasonService from '../../Services/Season/SeasonService';
import "./Home.scss";
import UserService from '../../Services/Users/UserService';
import { ActionTypes } from '../../reducer/reducer';
import GetDogSkinDto from '../../Services/Skins/dto/GetDogSkinDto';
import { userIconsThumbnail } from '../../misc/utils/utils/options';
import DifficultModal from '../_commons/DifficultModal/DifficultModal';

interface Props {
}

const Home: FunctionComponent<Props> = (props) => {

  const [activeSeason, setActiveSeason] = useState({} as GetSeasonDto);
  const [playerChoiced, setPlayerChoiced] = useState({} as any);
  const [playerChoicedLabel, setPlayerChoicedLabel] = useState("");
  const [thumbnailPosition, setThumbnailPosition] = useState(0);
  const [startIndexPosition, setStartIndexPosition] = useState(0);
  const [activeItem, setActiveItem] = useState('home');
  const [openDifficultModal, setOpenDifficultModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingChangeIcon, setIsLoadingChangeIcon] = useState(false);
  const { state, dispatch } = useContext(ThemeContext);
  const navigate = useNavigate();
  const seasonService = new SeasonService();
  const userService = new UserService();

  // const myId = uuid();
  // const socket = io('http://localhost:8080');
  // socket.on('connect', () => console.log('[IO] Connect => New connection has been established'));

  useEffect(() => {
    getSeasonByRangeDate();
    setPlayerChoiced({} as any);
    setPlayerChoicedLabel('');
  }, []);

  useEffect(() => {
    const _thumbnailPosition = userIconsThumbnail?.map(u => u.original).indexOf(state.activeUser?.icone) || 0;
    if (_thumbnailPosition >= 0) {
      setStartIndexPosition(_thumbnailPosition);
    }
  }, [state.activeUser]);

  const getSeasonByRangeDate = async () => {
    setIsLoading(true);
    try {
      const season = await seasonService.getSeasonByRangeDate(moment().format("YYYY-MM-DD"));
      setActiveSeason({ ...season })
    }
    catch (err: any) {
      toast.error(toastError(err), toastOptions(toast));
    }
    finally {
      setIsLoading(false);
    }
  }

  // const handleActiveItem = (ev: any, { name }: any) => {
  //   setActiveItem(name);
  //   navigate("/");
  // }

  const handleLogout = (ev: any, { name }: any) => {
    setActiveItem(name);
    logout();
    navigate("/");
  }

  const handleChangeUserIcon = async () => {
    setIsLoadingChangeIcon(true);
    try {
      const getUrlImgByIndex = userIconsThumbnail?.[thumbnailPosition || 0]?.original || '';

      if (getUrlImgByIndex) {
        const user = await userService.changeUserIcon(getUrlImgByIndex, state.activeUser.id);
        dispatch({
          type: ActionTypes.SET_ACTIVE_USER,
          payload: user
        });
        setUserCache(user);
        toast.success("O seu ícone foi alterado com sucesso.", toastOptions(toast));
      }

    }
    catch (err: any) {
      toast.error(toastError(err), toastOptions(toast));
    }
    finally {
      setIsLoadingChangeIcon(false);
    }
  }

  const handleActivePlayerChoiced = (namePlayer: string, playerData: any, isDog: boolean) => {
    setPlayerChoicedLabel(namePlayer);
    setPlayerChoiced({ ...playerData, isDog });
  }

  const onSlide = (index: number) => {
    setThumbnailPosition(index);
  }

  const handleOpenDiffcultModal = () => {
    setOpenDifficultModal(true);
  }

  return (
    <>
      {isLoading && <Segment className='segment-loader'>
        <Dimmer active={isLoading}>
          <Loader content='Carregando...' />
        </Dimmer>
      </Segment>}
      <div className='home-container'>
        <div className='home-navbar'>
          <Menu secondary>
            <Menu.Menu position='left'>
              <div className='menu-left-season flex align-items-center text-center'>
                <h1 className='m-0'>Temporada: {activeSeason.nome_season || "Padrão"}</h1>
              </div>
            </Menu.Menu>
            <Menu.Menu position='right'>
              <Menu.Item
                name='sair'
                active={activeItem === 'sair'}
                onClick={handleLogout}
              />
            </Menu.Menu>
          </Menu>
        </div>
        <div className='home-content'>
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column mobile={16} tablet={8} computer={8}>
                <div className='home-user-icons flex align-items-center justify-content-center h-full'>
                  <div className='flex-column justify-content-center align-items-center'>
                    <h1>Alterar ícone</h1>
                    <ImageGallery
                      showBullets
                      infinite
                      showThumbnails={false}
                      showNav={false}
                      showFullscreenButton={false}
                      showPlayButton={false}
                      items={userIconsThumbnail}
                      slideDuration={450}
                      slideInterval={2000}
                      slideOnThumbnailOver={false}
                      thumbnailPosition='bottom'
                      onSlide={onSlide}
                      startIndex={startIndexPosition}
                    />
                    <div>
                      <Button
                        className='mt-1 mb-1'
                        loading={isLoadingChangeIcon}
                        disabled={isLoading || isLoadingChangeIcon}
                        onClick={handleChangeUserIcon}
                      >Alterar
                      </Button>
                    </div>
                  </div>
                </div>
              </Grid.Column>
              <Grid.Column mobile={16} tablet={8} computer={8} className="flex justify-content-center">
                <div className='home-user-info flex justify-content-center align-items-center'>
                  <div className='user-info flex align-items-center'>
                    <div className='w-full'>
                      <div className='flex justify-content-between flex align-items-center'><p>Nome</p><div>{state.activeUser?.nome}</div></div>
                      <div className='flex justify-content-between flex align-items-center'><p>Vitórias</p><div>{state.activeUser?.nro_win || 0}</div></div>
                      <div className='flex justify-content-between flex align-items-center'><p>Derrotas</p><div>{state.activeUser?.nro_lose || 0}</div></div>
                    </div>
                  </div>
                </div>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2} className="justify-content-center mt-2">
              <Grid.Column mobile={16} tablet={8} computer={8}>
                <div className='w-full imageGalleryBanner'>
                  <ImageGallery
                    showBullets={false}
                    infinite
                    showThumbnails={false}
                    showNav={false}
                    showFullscreenButton={false}
                    showPlayButton={false}
                    items={state.banners?.length
                      ? state.banners.map(b => Object.assign({}, {
                        original: b.img_banner,
                        thumbnail: b.img_banner,
                        originalClass: 'img-banner',
                      }))
                      : []}
                    slideDuration={5000}
                    slideInterval={5000}
                    slideOnThumbnailOver={false}
                    lazyLoad
                    autoPlay
                    thumbnailPosition='bottom'
                  />
                </div>
              </Grid.Column>
              <Grid.Column mobile={16} tablet={8} computer={8}>
                <h1 className='text-center'>Selecione a peça de tabuleiro que deseja jogar</h1>
                <h2 className='text-center'>{`Peça Escolhida: ${playerChoicedLabel}`}</h2>
                <div className='flex justify-content-center align-items-start'>
                  {/* <div className='flex-column justify-content-start align-items-center'>
                    {activeSeason.skinsJaguar?.length
                      ?
                      activeSeason.skinsJaguar.map((skin: GetJaguarSkinDto, i: number) =>
                        <div key={i}
                          className='peca-onca flex justify-content-center align-items-center mb-1'
                          onClick={() => handleActivePlayerChoiced(`Onça (${skin.name_skin})`, skin, false)}
                        >
                          <Image src={skin.img_skin} size='tiny' circular />
                        </div>)
                      :
                      <div
                        className='peca-onca flex justify-content-center align-items-center'
                        onClick={() => handleActivePlayerChoiced(`Onça Padrão`, { id: 1 }, false)}
                      >
                        <Image src={require('../../assets/pecas/oncaBase.png')} size='tiny' circular />
                      </div>}
                  </div> */}
                  <div className='flex-column justify-content-start align-items-center ml-1'>
                    {activeSeason.skinsDog?.length
                      ?
                      activeSeason.skinsDog.map((skin: GetDogSkinDto, i: number) =>
                        <div key={i}
                          className='peca-dog flex justify-content-center align-items-center mb-1'
                          onClick={() => handleActivePlayerChoiced(`Cachorro (${skin.name_skin})`, skin, true)}
                        >
                          <Image src={skin.img_skin} size='tiny' circular />
                        </div>)
                      :
                      <div
                        className='peca-dog flex justify-content-center align-items-center mb-1'
                        onClick={() => handleActivePlayerChoiced(`Cachorro Padrão`, { id: 1 }, true)}
                      >
                        <Image src={require('../../assets/pecas/cachorroBase.png')} size='tiny' circular />
                      </div>}
                  </div>
                </div>
                <div className='home-user-action flex justify-content-center align-items-center'>
                  <Button
                    className='home-action-btn'
                    disabled={!playerChoiced?.id || isLoading || isLoadingChangeIcon}
                    onClick={handleOpenDiffcultModal}
                  >
                    Jogar
                  </Button>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </div>

      <DifficultModal 
        activeSeason={activeSeason}
        playerChoiced={playerChoiced}
        openModal={openDifficultModal}
        setOpenModal={setOpenDifficultModal}
      />
    </>
  );
};

export default Home;