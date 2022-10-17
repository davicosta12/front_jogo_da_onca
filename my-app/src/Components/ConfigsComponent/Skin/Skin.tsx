import { FunctionComponent, useEffect, useState } from 'react';
import { Button, Icon, Table } from 'semantic-ui-react';
import GetSkinDto from '../../../Services/Skins/dto/GetSkinDto';
import SkinService from '../../../Services/Skins/SkinService';
import DeleteModal from '../../_commons/DeleteModal/DeleteModal';
import SemanticTable from '../../_commons/SemanticTable/SemanticTable';
import SkinDetail from './Detail/Detail';
import './Skin.scss';

interface Props {
}

const Skin: FunctionComponent<Props> = (props) => {

  const [skin, setSkin] = useState({} as GetSkinDto);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [createMode, setCreateMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingForm, setIsLoadingForm] = useState(false);

  const skinService = new SkinService();

  useEffect(() => {
    getSkins();
  }, []);

  const getSkins = async () => {
    setIsLoading(true);
    try {
      const _skins = await skinService.getSkins();
      console.log(_skins);
    }
    catch (err: any) {
      console.log(err);
    }
    finally {
      setIsLoading(false);
    }
  }

  const handleCreateSkin = async (values: GetSkinDto) => {
    setIsLoadingForm(true);
    try {
      await skinService.createSkin(values);
      getSkins();
      setOpenModal(false);
    }
    catch (err: any) {
      console.log(err);
    }
    finally {
      setIsLoadingForm(false);
    }
  }

  const handleUpdateSkin = async (values: GetSkinDto) => {
    setIsLoadingForm(true);
    try {
      await skinService.updateSkin(values, +skin.id);
      getSkins();
      setOpenModal(false);
    }
    catch (err: any) {
      console.log(err);
    }
    finally {
      setIsLoadingForm(false);
    }
  }

  const handleDeleteSkin = async () => {
    setIsLoading(true);
    try {
      await skinService.deleteSkin(+skin.id);
      getSkins();
    }
    catch (err: any) {
      console.log(err);
    }
    finally {
      setIsLoading(false);
    }
  }

  const handleAdd = () => {
    setOpenModal(true);
    setSkin({} as GetSkinDto);
    setCreateMode(true);
  }

  const handleEdit = (skin: GetSkinDto) => {
    setOpenModal(true);
    setSkin(skin);
    setCreateMode(false);
  }

  const handleDelete = (skin: GetSkinDto) => {
    setSkin(skin);
    setOpenDeleteModal(true);
  }

  const createTableCell = (item: any) => {
    const itemsCell: any[] = [];

    for (const prop in item) {
      itemsCell.push(item[prop]);
    }

    return (
      itemsCell.map(item =>
        <Table.Cell>
          {item}
        </Table.Cell>)
    );

  }

  const createTableRow = (data: any[]) => {

    return (
      data.map(d =>
        <Table.Row>
          {createTableCell(d)}

          <Table.Cell collapsing>
            <Button icon onClick={() => handleEdit(d)}>
              <Icon name='edit' />
            </Button>
            <Button color="red" icon onClick={() => handleDelete(d)}>
              <Icon name='trash' />
            </Button>
          </Table.Cell>

        </Table.Row >)
    )
  }

  return (
    <div className='skin-content'>

      <div className='skin-title'>Skin</div>

      <div className='linhaBox skin-section mt-3 flex justify-content-end'>
        <Button className='p-button-primary' icon>
          <Icon name='refresh' />
        </Button>
        <Button className='p-button-primary' icon labelPosition='left' onClick={handleAdd}>
          <Icon name='plus' />
          Adicionar
        </Button>
      </div>

      <div className='skin-table mt-3'>
        <SemanticTable
          data={skinData}
          tableRows={createTableRow(skinData)}
          headers={headers}
          actions
        />
      </div>

      <SkinDetail
        skin={skin}
        openModal={openModal}
        createMode={createMode}
        setOpenModal={setOpenModal}
        loading={isLoadingForm}
        onCreate={handleCreateSkin}
        onUpdate={handleUpdateSkin}
      />

      <DeleteModal
        openModal={openDeleteModal}
        setOpenModal={setOpenDeleteModal}
        title='Confirmar exclusão'
        subtitle='Deseja realmente excluir a skin?'
        onDelete={handleDeleteSkin}
      />
    </div>
  );
};

export default Skin;

const headers = ["Nome", "xxxxx", "yyy"];

const skinData = [
  { id: "01", nameSkin: "x1", imgSkin: "y1" },
  { id: "02", nameSkin: "x2", imgSkin: "y2" },
  { id: "03", nameSkin: "x3", imgSkin: "y3" },
  { id: "04", nameSkin: "x4", imgSkin: "y4" },
  { id: "05", nameSkin: "x5", imgSkin: "y5" },
  { id: "06", nameSkin: "x6", imgSkin: "y6" },
  { id: "07", nameSkin: "x7", imgSkin: "y7" },
  { id: "07", nameSkin: "x7", imgSkin: "y7" },
  { id: "07", nameSkin: "x7", imgSkin: "y7" },
];



