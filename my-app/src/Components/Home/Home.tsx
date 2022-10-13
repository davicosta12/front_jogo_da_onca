import { FunctionComponent, useState } from 'react';
import { Input, Grid, Menu } from 'semantic-ui-react';

interface Props {
}

const Home: FunctionComponent<Props> = (props) => {

  const [activeItem, setActiveItem] = useState('home');

  const handleActiveItem = (ev: any, { name }: any) => {
    setActiveItem(name);
  }

  return (
    <div>
      <div>
        <Menu secondary>
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={handleActiveItem}
          />
          <Menu.Menu position='right'>
            <Menu.Item
              name='logout'
              active={activeItem === 'logout'}
              onClick={handleActiveItem}
            />
          </Menu.Menu>
        </Menu>
      </div>
      <div>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column mobile={16} tablet={8} computer={8}>
              <div>
                ÍCONE
              </div>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={8}>
              <div>
                INFORMAÇOES
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <Grid.Column mobile={16} tablet={16} computer={16}>
              <div>
                BOTÃO
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </div>
  );
};

export default Home;
