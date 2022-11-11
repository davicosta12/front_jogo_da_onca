import moment from 'moment';
import { FunctionComponent, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Grid, Menu, Button, Segment, Dimmer, Loader, Image, GridRow } from 'semantic-ui-react';
import ImageGallery from 'react-image-gallery';
import { ThemeContext } from '../../App';
import { toastError, toastOptions } from '../../misc/utils/utils/utils';
import { logout, setUserCache } from '../../Services/AuthService/Auth';
import GetSeasonDto from '../../Services/Season/dto/GetSeasonDto';
import SeasonService from '../../Services/Season/SeasonService';
import "./Home.scss";
import UserService from '../../Services/Users/UserService';
import { ActionTypes } from '../../reducer/reducer';
import GetJaguarSkinDto from '../../Services/Skins/dto/GetJaguarSkinDto';
import GetDogSkinDto from '../../Services/Skins/dto/GetDogSkinDto';

interface Props {
}

const Home: FunctionComponent<Props> = (props) => {
  const [activeSeason, setActiveSeason] = useState({} as GetSeasonDto);
  const [playerChoiced, setPlayerChoiced] = useState("");
  const [thumbnailPosition, setThumbnailPosition] = useState(0);
  const [startIndexPosition, setStartIndexPosition] = useState(0);
  const [activeItem, setActiveItem] = useState('home');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingChangeIcon, setIsLoadingChangeIcon] = useState(false);
  const { state, dispatch } = useContext(ThemeContext);
  const navigate = useNavigate();
  const seasonService = new SeasonService();
  const userService = new UserService();

  useEffect(() => {
    getSeasonByRangeDate();
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
      setActiveSeason({ ...season });
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
    navigate("/")
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

  const handleGamePlay = () => {
    navigate("/jaguarboard", { state: activeSeason });
    window.location.reload();
  }

  const onSlide = (index: number) => {
    setThumbnailPosition(index);
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
                      <div className='flex justify-content-between flex align-items-center'><p>Vitórias</p><div>{state.activeUser?.nro_win}</div></div>
                      <div className='flex justify-content-between flex align-items-center'><p>Derrotas</p><div>{state.activeUser?.nro_lose}</div></div>
                    </div>
                  </div>
                </div>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={1} className="justify-content-center mt-2">
              <Grid.Column mobile={16} tablet={8} computer={8}>
                <h1 className='text-center'>Selecione a peça de tabuleiro que deseja jogar</h1>
                <h2 className='text-center'>{`Peça Escolhida: ${playerChoiced}`}</h2>
                <div className='flex justify-content-center align-items-start'>
                  <div className='flex-column justify-content-start align-items-center'>
                    {activeSeason.skinsJaguar?.length
                      ?
                      activeSeason.skinsJaguar.map((skin: GetJaguarSkinDto, i: number) =>
                        <div key={i} className='peca-onca flex justify-content-center align-items-center mb-1' onClick={() => setPlayerChoiced(`Onça (${skin.name_skin})`)}>
                          <Image src={skin.img_skin} size='tiny' circular />
                        </div>)
                      :
                      <div className='peca-onca flex justify-content-center align-items-center' onClick={() => setPlayerChoiced(`Onça`)}>
                        <Image src={require('../../assets/oncaBase.png')} size='tiny' circular />
                      </div>}
                  </div>
                  <div className='flex-column justify-content-start align-items-center ml-1'>
                    {activeSeason.skinsDog?.length
                      ?
                      activeSeason.skinsDog.map((skin: GetDogSkinDto, i: number) =>
                        <div key={i} className='peca-dog flex justify-content-center align-items-center  mb-1' onClick={() => setPlayerChoiced(`Cachorro (${skin.name_skin})`)}>
                          <Image src={skin.img_skin} size='tiny' circular />
                        </div>)
                      :
                      <div className='peca-dog flex justify-content-center align-items-center' onClick={() => setPlayerChoiced("Cachorro")}>
                        <Image src={require('../../assets/cachorroBase.png')} size='tiny' circular />
                      </div>}
                  </div>
                </div>
              </Grid.Column>
            </Grid.Row>
            <GridRow className="justify-content-center">
              <Grid.Column mobile={16} tablet={8} computer={8}>
                <div className='home-user-action flex justify-content-center align-items-center'>
                  <Button
                    className='home-action-btn'
                    disabled={!playerChoiced || isLoading || isLoadingChangeIcon}
                    onClick={handleGamePlay}
                  >
                    Jogar
                  </Button>
                </div>
              </Grid.Column>
            </GridRow>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default Home;

const userIconsThumbnail = [
  {
    original: require('../../assets/logoOnca.jpeg'),
    thumbnail: require('../../assets/logoOnca.jpeg'),
    originalClass: 'img-onca-base',
    bulletClass: 'bulletClass'
  },
  {
    original: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/1000/600/',
    originalClass: 'img-onca-base',
    bulletClass: 'bulletClass'
  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/1000/600/',
    originalClass: 'img-onca-base',
    bulletClass: 'bulletClass'
  },
];