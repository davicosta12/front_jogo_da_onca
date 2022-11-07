import { FunctionComponent, useEffect, useState } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import GetJaguarSkinDto from '../../../../../Services/Skins/dto/GetJaguarSkinDto';

interface Props {
  skin: GetJaguarSkinDto;
  openModal: boolean;
  createMode: boolean;
  onCreate: (values: GetJaguarSkinDto) => void;
  onUpdate: (values: GetJaguarSkinDto) => void;
  loading?: boolean;
  setOpenModal: any;
}

const SkinDetail: FunctionComponent<Props> = (props) => {

  const [formValues, setFormValues] = useState({
    id: 0,
    img_skin: '',
    name_skin: ''
  } as GetJaguarSkinDto);

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
      } as GetJaguarSkinDto);
    }
  }, [skin, openModal]);

  const handleSubmit = (values: GetJaguarSkinDto) => {
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
                options={friendOptions}
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

const friendOptions = [
  {
    key: 'Jenny Hess',
    text: 'Jenny Hess',
    value: 'Jenny Hess',
    image: { avatar: true, src: '/images/avatar/small/jenny.jpg' },
  },
  {
    key: 'Elliot Fu',
    text: 'Elliot Fu',
    value: 'Elliot Fu',
    image: { avatar: true, src: '/images/avatar/small/elliot.jpg' },
  },
  {
    key: 'Stevie Feliciano',
    text: 'Stevie Feliciano',
    value: 'Stevie Feliciano',
    image: { avatar: true, src: '/images/avatar/small/stevie.jpg' },
  },
  {
    key: 'Christian',
    text: 'Christian',
    value: 'Christian',
    image: { avatar: true, src: '/images/avatar/small/christian.jpg' },
  },
  {
    key: 'Matt',
    text: 'Matt',
    value: 'Matt',
    image: { avatar: true, src: '/images/avatar/small/matt.jpg' },
  },
  {
    key: 'Justen Kitsune',
    text: 'Justen Kitsune',
    value: 'Justen Kitsune',
    image: { avatar: true, src: '/images/avatar/small/justen.jpg' },
  },
]

