import { FunctionComponent, useEffect, useState } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import GetSkinDto from '../../../../../Services/Skins/dto/GetDogSkinDto';

interface Props {
  skin: GetSkinDto;
  openModal: boolean;
  createMode: boolean;
  onCreate: (values: GetSkinDto) => void;
  onUpdate: (values: GetSkinDto) => void;
  loading?: boolean;
  setOpenModal: any;
}

const SkinDetail: FunctionComponent<Props> = (props) => {

  const [formValues, setFormValues] = useState({
    id: '',
    imgSkin: '',
    nameSkin: ''
  } as GetSkinDto);

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
        imgSkin: skin.imgSkin,
        nameSkin: skin.nameSkin
      });
    } else {
      setFormValues({
        id: '',
        imgSkin: '',
        nameSkin: ''
      } as GetSkinDto);
    }
  }, [skin, openModal]);

  const handleSubmit = (values: GetSkinDto) => {
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
      <Modal.Header>{createMode ? "Adicionar Skin" : "Editar Skin"}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form>
            <Form.Group widths='equal'>
              {/* {!createMode ?
                <Form.Input
                  fluid
                  name="id"
                  label='Id'
                  value={formValues.id}
                  onChange={handleChange}
                  placeholder='Id'
                />
                : null} */}
              <Form.Input
                fluid
                name="nameSkin"
                label='Nome'
                value={formValues.nameSkin}
                onChange={handleChange}
                placeholder='Nome'
              />
              <Form.Dropdown
                fluid
                name="imgSkin"
                label='Url da imagem'
                value={formValues.imgSkin}
                options={friendOptions}
                selection
                onChange={handleChange}
                placeholder='Url da imagem'
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
          disabled={!formValues.nameSkin}
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

