import { FunctionComponent, useState } from 'react'
import { Button, Icon, Image, List, Popup } from 'semantic-ui-react'
import _ from 'lodash';
import SkinDetailDog from '../../ContentComponent/Skin/Dog/Detail/Detail';
import SkinDetailJaguar from '../../ContentComponent/Skin/Jaguar/Detail/Detail';

interface Props {
  dataList: any[];
  setDataList: any;
  typeList: string;
  uniqItemName: string;
}

const ListData: FunctionComponent<Props> = (props) => {

  const [data, setData] = useState({} as any);
  const [openDetail, setOpenDetail] = useState(false);
  const [createMode, setCreateMode] = useState(false);

  const { dataList, setDataList, typeList, uniqItemName } = props;

  const handleCreate = (data: any) => {
    handleAddArrayItem(data);
    setOpenDetail(false);
  }

  const handleAddArrayItem = (item: any) => {
    if (item && dataList) {
      const addItems = [...dataList, { ...item }];
      const uniqItems = _.uniqBy(addItems, uniqItemName);
      setDataList(uniqItems);
    }
  }

  const handleRemoveArrayItem = (rowIndex: number) => {
    let listCopy = [...dataList];
    listCopy.splice(rowIndex, 1);
    setDataList(listCopy);
  }

  const handleAdd = () => {
    setData({} as any);
    setOpenDetail(true);
    setCreateMode(true);
  }

  const handleEdit = (data: any) => {
    setData(data);
    setOpenDetail(true);
    setCreateMode(false);
  }

  const editAction = (data: any) => <Popup
    content='Detalhes'
    trigger={
      <Button icon onClick={() => handleEdit(data)}>
        <Icon name='edit' />
      </Button>
    }
  />

  const removeAction = (rowIndex: number) => <Popup
    content='Remover'
    trigger={
      <Button color="red" icon onClick={() => handleRemoveArrayItem(rowIndex)}>
        <Icon name='trash' />
      </Button>
    }
  />

  const choiceFormByType = () => {

    switch (typeList.toLowerCase()) {
      case 'skindog': return <SkinDetailDog
        skin={data}
        openModal={openDetail}
        createMode={createMode}
        onCreate={handleCreate}
        editText='Detalhes da Skin do Cachorro'
        isArray
        disabledAction={!createMode}
        setOpenModal={setOpenDetail}
      />;
      case 'skinjaguar': return <SkinDetailJaguar
        skin={data}
        openModal={openDetail}
        createMode={createMode}
        onCreate={handleCreate}
        editText='Detalhes da Skin da Onça'
        isArray
        disabledAction={!createMode}
        setOpenModal={setOpenDetail}
      />
      default: ;
    }
  }

  return (
    <div>
      <div className='flex justify-content-end'>
        <Popup
          content='Adicionar'
          trigger={
            <Button className='primary' icon onClick={handleAdd}>
              <Icon name='plus' />
            </Button>
          }
        />
      </div>

      <List divided verticalAlign='middle'>
        {dataList.map((data: any, i: number) =>
          <List.Item key={i}>
            <List.Content floated='right'>
              {/* {editAction(data)} */}
              {removeAction(i)}
            </List.Content>
            <Image avatar src={data?.img_skin} />
            <List.Content>{data?.name_skin}</List.Content>
          </List.Item>)
        }
      </List>

      {choiceFormByType()}
    </div>
  )
}

export default ListData