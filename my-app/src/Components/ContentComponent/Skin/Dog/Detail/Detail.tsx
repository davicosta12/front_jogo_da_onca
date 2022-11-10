import { FunctionComponent, useContext, useEffect, useState } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import { ThemeContext } from '../../../../../App';
import { skinDogImagesOptions } from '../../../../../misc/utils/utils/options';
import GetDogSkinDto from '../../../../../Services/Skins/dto/GetDogSkinDto';
import PostDogSkinDto from '../../../../../Services/Skins/dto/PostDogSkinDto';

interface Props {
  skin: GetDogSkinDto;
  openModal: boolean;
  createMode: boolean;
  onCreate?: (values: PostDogSkinDto) => void;
  onUpdate?: (values: PostDogSkinDto) => void;
  disabledAction?: boolean;
  isArray?: boolean;
  editText?: string;
  loading?: boolean;
  setOpenModal: any;
}

const SkinDetail: FunctionComponent<Props> = (props) => {

  const { state, dispatch } = useContext(ThemeContext);

  const [formValues, setFormValues] = useState({
    id: 0,
    idSeason: 0,
    img_skin: '',
    name_skin: ''
  } as PostDogSkinDto);

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
        img_skin: '',
        idSeason: 0,
        name_skin: ''
      } as PostDogSkinDto);
    }
  }, [skin, openModal]);

  const handleSubmit = (values: PostDogSkinDto) => {
    createMode
      ? onCreate?.(values)
      : onUpdate?.(values);
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
      <Modal.Header>{createMode ? "Adicionar Skin do Cachorro" : props.editText}</Modal.Header>
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
                label='Skin Cachorro'
                value={formValues.img_skin}
                options={skinDogImagesOptions}
                selection
                onChange={handleChange}
                placeholder='Skin Cachorro'
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
        {!props.disabledAction && <Button
          content="Salvar"
          labelPosition='right'
          icon='checkmark'
          onClick={() => handleSubmit(formValues)}
          loading={props.loading}
          disabled={!formValues.name_skin || !formValues.img_skin || (props.isArray ? !props.isArray : !formValues.idSeason)}
          positive
        />}
      </Modal.Actions>
    </Modal>
  )
}

export default SkinDetail

SkinDetail.defaultProps = {
  disabledAction: false,
  isArray: false,
  editText: "Editar Skin do Cachorro"
}