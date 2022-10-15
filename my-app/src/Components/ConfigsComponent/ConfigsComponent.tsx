import { FunctionComponent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon, Menu, Segment, Sidebar } from 'semantic-ui-react';

interface Props {
  screenRender: any;
}

const ConfigsComponent: FunctionComponent<Props> = (props) => {

  const [activeItem, setActiveItem] = useState('jaguar');
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  return (
    <div>
      <Sidebar.Pushable as={Segment}>

        <Menu size='huge'>
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
            onClick={() => {
              navigate("/config/user")
              setActiveItem('user')
              setVisible(false)
            }}>
            <Icon name='user circle' />
            Usuário
          </Menu.Item>
          <Menu.Item
            as='a'
            name='skin'
            active={activeItem === 'skin'}
            onClick={() => {
              navigate("/config/skin")
              setActiveItem('skin')
              setVisible(false)
            }}>
            <Icon name='camera' />
            Skin
          </Menu.Item>
          <Menu.Item
            as='a'
            name='board'
            active={activeItem === 'board'}
            onClick={() => {
              navigate("/config/board")
              setActiveItem('board')
              setVisible(false)
            }}>
            <Icon name='gamepad' />
            Tabuleiro
          </Menu.Item>
        </Sidebar>

        <Sidebar.Pusher>
          {props.screenRender}
        </Sidebar.Pusher>

      </Sidebar.Pushable>
    </div>
  );
};

export default ConfigsComponent;