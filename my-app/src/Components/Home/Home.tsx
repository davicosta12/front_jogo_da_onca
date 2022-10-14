import { FunctionComponent, useState } from 'react';
import { Input, Grid, Menu, Button } from 'semantic-ui-react';
import "./Home.scss";

interface Props {
}

const Home: FunctionComponent<Props> = (props) => {

  const [activeItem, setActiveItem] = useState('home');

  const handleActiveItem = (ev: any, { name }: any) => {
    setActiveItem(name);
  }

  return (
    <div className='home-container'>
      <div className='home-navbar'>
        <Menu secondary>
          <Menu.Item
            name='home'

            active={activeItem === 'home'}
            onClick={handleActiveItem}
          />
          <Menu.Menu position='right'>
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
                <h1>Alterar ícone</h1>
              </div>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={8}>
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
              <div className='home-user-action flex justify-content-center align-items-center'>
                <Button className='home-action-btn'>Jogar</Button>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </div>
  );
};

export default Home;
