import { FunctionComponent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Menu, Button } from 'semantic-ui-react';
import "./Home.scss";

interface Props {
}

const Home: FunctionComponent<Props> = (props) => {

  const [activeItem, setActiveItem] = useState('home');
  const navigate = useNavigate();

  const handleActiveItem = (ev: any, { name }: any) => {
    setActiveItem(name);
    navigate("/");
  }

  const handleGamePlay = () => {
    navigate("/jaguarboard");
    window.location.reload();
  }

  return (
    <div className='home-container'>
      <div className='home-navbar'>
        <Menu secondary>
          <Menu.Menu position='left'>
            <Menu.Item
              name='sair'
              active={activeItem === 'sair'}
              onClick={handleActiveItem}
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
                  <div>
                    <p>Nome</p>
                    <p>Vitórias</p>
                    <p>Derrotas</p>
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
  );
};

export default Home;
