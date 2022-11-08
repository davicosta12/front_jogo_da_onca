
import { FunctionComponent, useEffect, useState } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import { skinDogImagesOptions } from '../../../../../misc/utils/utils/options';
import GetDogSkinDto from '../../../../../Services/Skins/dto/GetDogSkinDto';

interface Props {
  skin: GetDogSkinDto;
  openModal: boolean;
  createMode: boolean;
  onCreate: (values: GetDogSkinDto) => void;
  onUpdate: (values: GetDogSkinDto) => void;
  loading?: boolean;
  setOpenModal: any;
}

const SkinDetail: FunctionComponent<Props> = (props) => {

  const [formValues, setFormValues] = useState({
    id: 0,
    img_skin: '',
    name_skin: ''
  } as GetDogSkinDto);

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
        id: skin.id,
        img_skin: skin.img_skin,
        name_skin: skin.name_skin
      });
    } else {
      setFormValues({
        img_skin: '',
        name_skin: ''
      } as GetDogSkinDto);
    }
  }, [skin, openModal]);

  const handleSubmit = (values: GetDogSkinDto) => {
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
      <Modal.Header>{createMode ? "Adicionar Skin do Cachorro" : "Editar Skin do Cachorro"}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form>
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