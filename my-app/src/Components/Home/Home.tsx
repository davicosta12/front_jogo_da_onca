import moment from 'moment';
import { FunctionComponent, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Grid, Menu, Button, Segment, Dimmer, Loader } from 'semantic-ui-react';
import { ThemeContext } from '../../App';
import { toastError, toastOptions } from '../../misc/utils/utils/utils';
import { logout } from '../../Services/AuthService/Auth';
import GetSeasonDto from '../../Services/Season/dto/GetSeasonDto';
import SeasonService from '../../Services/Season/SeasonService';
import "./Home.scss";

interface Props {
}

const Home: FunctionComponent<Props> = (props) => {

  const [activeSeason, setActiveSeason] = useState({} as GetSeasonDto);
  const [activeItem, setActiveItem] = useState('home');
  const [isLoading, setIsLoading] = useState(false);
  const { state, dispatch } = useContext(ThemeContext);
  const navigate = useNavigate();
  const seasonService = new SeasonService();

  useEffect(() => {
    getSeasonByRangeDate();
  }, []);

  const getSeasonByRangeDate = async () => {
    setIsLoading(true);
    try {
      const season = await seasonService.getSeasonByRangeDate(moment().format("YYYY-MM-DD"), moment().format("YYYY-MM-DD"));
      setActiveSeason({ ...season });
    }
    catch (err: any) {
      toast.error(toastError(err), toastOptions(toast));
    }
    finally {
      setIsLoading(false);
    }
  }

  const handleActiveItem = (ev: any, { name }: any) => {
    setActiveItem(name);
    navigate("/");
  }

  const handleLogout = (ev: any, { name }: any) => {
    setActiveItem(name);
    logout();
    navigate("/")
  }

  const handleGamePlay = () => {
    navigate("/jaguarboard", { state: activeSeason });
    window.location.reload();
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
                    <img className='img-onca-base' height={200} width={200}></img>
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
            <Grid.Row columns={1}>
              <Grid.Column mobile={16} tablet={16} computer={16}>
                <div className='home-user-action flex justify-content-center align-items-center mt-2'>
                  <Button className='home-action-btn' onClick={handleGamePlay}>Jogar</Button>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default Home;
