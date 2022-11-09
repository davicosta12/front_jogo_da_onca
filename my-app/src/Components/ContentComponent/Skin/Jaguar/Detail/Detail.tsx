import { FunctionComponent, useContext, useEffect, useState } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import { ThemeContext } from '../../../../../App';
import { skinJaguarImagesOptions } from '../../../../../misc/utils/utils/options';
import GetJaguarSkinDto from '../../../../../Services/Skins/dto/GetJaguarSkinDto';
import PostJaguarSkinDto from '../../../../../Services/Skins/dto/PostJaguarSkinDto';

interface Props {
  skin: GetJaguarSkinDto;
  openModal: boolean;
  createMode: boolean;
  onCreate: (values: PostJaguarSkinDto) => void;
  onUpdate: (values: PostJaguarSkinDto) => void;
  loading?: boolean;
  setOpenModal: any;
}

const SkinDetail: FunctionComponent<Props> = (props) => {

  const { state, dispatch } = useContext(ThemeContext);

  const [formValues, setFormValues] = useState({
    idSeason: 0,
    img_skin: '',
    name_skin: ''
  } as PostJaguarSkinDto);

  const {
    skin,
    openModal,
    createMode,
    onCreate,
    onUpdate,
    setOpenModal
  } = props;

  useEffect(() => {
    if (skin?.id) {
      setFormValues({
        idSeason: skin.season.id,
        img_skin: skin.img_skin,
        name_skin: skin.name_skin
      });
    } else {
      setFormValues({
        idSeason: 0,
        img_skin: '',
        name_skin: ''
      } as PostJaguarSkinDto);
    }
  }, [skin, openModal]);

  const handleSubmit = (values: PostJaguarSkinDto) => {
    createMode
      ? onCreate(values)
      : onUpdate(values);
  }

  const handleChange = (ev: any, { name, value }: any) => {
    setFormValues({ ...formValues, [name]: value });
  }

  return (
    <Modal
      onClose={() => setOpenModal(false)}
      onOpen={() => setOpenModal(true)}
      open={openModal}
    >
      <Modal.Header>{createMode ? "Adicionar Skin da Onça" : "Editar Skin da Onça"}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form>
            <Form.Dropdown
              fluid
              name="idSeason"
              label='Temporada'
              value={formValues.idSeason}
              options={state.seasons.map(b => Object.assign({}, {
                key: b.id,
                text: b.nome_season,
                value: b.id,
              }))}
              selection
              onChange={handleChange}
              placeholder='Temporada'
              disabled={!createMode}
              required
              error={!formValues.idSeason}
            />
            <Form.Group widths='equal'>
              <Form.Input
                fluid
                name="name_skin"
                label='Nome'
                value={formValues.name_skin}
                onChange={handleChange}
                placeholder='Nome'
                error={!formValues.name_skin}
                required
              />
              <Form.Dropdown
                fluid
                name="img_skin"
                label='Skin Onça'
                value={formValues.img_skin}
                options={skinJaguarImagesOptions}
                selection
                onChange={handleChange}
                placeholder='Skin Onça'
                error={!formValues.img_skin}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => setOpenModal(false)}>
          Cancelar
        </Button>
        <Button
          content="Salvar"
          labelPosition='right'
          icon='checkmark'
          onClick={() => handleSubmit(formValues)}
          loading={props.loading}
          disabled={!formValues.name_skin || !formValues.img_skin}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default SkinDetail