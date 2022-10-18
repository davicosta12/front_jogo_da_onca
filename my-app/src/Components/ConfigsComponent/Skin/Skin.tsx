import { FunctionComponent, useEffect, useState } from 'react';
import { Button, Dimmer, Icon, Loader, Popup, Segment, Table } from 'semantic-ui-react';
import GetSkinDto from '../../../Services/Skins/dto/GetSkinDto';
import SkinService from '../../../Services/Skins/SkinService';
import DeleteModal from '../../_commons/DeleteModal/DeleteModal';
import SemanticTable from '../../_commons/SemanticTable/SemanticTable';
import SkinDetail from './Detail/Detail';
import './Skin.scss';

interface Props {
}

const Skin: FunctionComponent<Props> = (props) => {

  const [skins, setSkins] = useState<GetSkinDto[]>([]);
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
      setSkins([..._skins]);
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
      setOpenDeleteModal(false);
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
            <Popup
              content='Editar'
              trigger={
                <Button icon onClick={() => handleEdit(d)}>
                  <Icon name='edit' />
                </Button>
              }
            />
            <Popup
              content='Remover'
              trigger={
                <Button color="red" icon onClick={() => handleDelete(d)}>
                  <Icon name='trash' />
                </Button>
              }
            />
          </Table.Cell>

        </Table.Row >)
    )
  }

  return (
    <>
      {isLoading && <Segment className='segment-loader'>
        <Dimmer active={isLoading}>
          <Loader content='Carregando...' />
        </Dimmer>
      </Segment>}
      <div className='skin-content'>

        <div className='skin-title'>Skin</div>

        <div className='linhaBox skin-section mt-3 flex justify-content-end'>
          <Popup
            content='Atualizar'
            trigger={
              <Button className='p-button-primary' icon onClick={() => getSkins()}>
                <Icon name='refresh' />
              </Button>
            }
          />

          <Button className='p-button-primary' icon labelPosition='left' onClick={handleAdd}>
            <Icon name='plus' />
            Adicionar
          </Button>
        </div>

        <div className='skin-table mt-3'>
          <SemanticTable
            data={skins}
            tableRows={createTableRow(skins)}
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
    </>
  );
};

export default Skin;

const headers = ["ID", "Nome", "Url da Imagem"];




