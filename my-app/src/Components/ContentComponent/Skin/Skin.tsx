import { FunctionComponent, useState } from 'react';
import { Menu } from 'semantic-ui-react';
import Dog from './Dog/Dog';
import Jaguar from './Jaguar/Jaguar';
import './Skin.scss';

interface Props {
}

const Skin: FunctionComponent<Props> = (props) => {

  const [activeItem, setActiveItem] = useState('jaguar');

  const handleItemClick = (ev: any, { name }: any) => setActiveItem(name)

  return (
    <div className='skin-content'>

      <h1 className='skin-title'>Skin</h1>

      <Menu tabular className='div-tabular m-3'>
        <Menu.Item
          name='jaguar'
          active={activeItem === 'jaguar'}
          onClick={handleItemClick}
        >
          Onça
        </Menu.Item>
        <Menu.Item
          name='dog'
          active={activeItem === 'dog'}
          onClick={handleItemClick}
        >
          Cachorro
        </Menu.Item>
      </Menu>

      <div className='mx-3'>
        {activeItem === 'jaguar' ? <Jaguar /> : <Dog />}
      </div>

    </div>
  )
};

export default Skin;