import { FunctionComponent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon, Menu, Segment, Sidebar } from 'semantic-ui-react';
import './ContentComponent.scss';

interface Props {
  screenRender: any;
}

const ContentComponent: FunctionComponent<Props> = (props) => {

  const [activeItem, setActiveItem] = useState('jaguar');
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const handleActiveMenuItem = (path: string) => {
    navigate(`/config/${path}`);
    setActiveItem(path);
    setVisible(false);
  }

  return (
    <div className='configs-Component'>
      <Sidebar.Pushable as={Segment}>

        <Menu className='div-menu' size='huge'>
          <Menu.Item
            onClick={() => setVisible(true)}
          >
            <Icon name='bars' />
          </Menu.Item>

          <Menu.Item
            position='right'
            onClick={() => navigate("/")}
          >
            <Icon name='user close' />
          </Menu.Item>
        </Menu>

        <Sidebar
          as={Menu}
          animation='overlay'
          icon='labeled'
          inverted
          onHide={() => setVisible(false)}
          vertical
          visible={visible}
          width='thin'
        >
          <Menu.Item
            as='a'
            name='user'
            active={activeItem === 'user'}
            onClick={() => handleActiveMenuItem('user')}>
            <Icon name='user circle' />
            Usuário
          </Menu.Item>
          <Menu.Item
            as='a'
            name='season'
            active={activeItem === 'season'}
            onClick={() => handleActiveMenuItem('season')}>
            <Icon name='hourglass half' />
            Temporada
          </Menu.Item>
          <Menu.Item
            as='a'
            name='board'
            active={activeItem === 'board'}
            onClick={() => handleActiveMenuItem('board')}>
            <Icon name='chess board' />
            Tabuleiro
          </Menu.Item>
          <Menu.Item
            as='a'
            name='skin'
            active={activeItem === 'skin'}
            onClick={() => handleActiveMenuItem('skin')}>
            <Icon name='black tie' />
            Skin
          </Menu.Item>
        </Sidebar>

        <Sidebar.Pusher className='fix-pusher-semantic'>
          {props.screenRender}
        </Sidebar.Pusher>

      </Sidebar.Pushable>
    </div>
  );
};

export default ContentComponent;