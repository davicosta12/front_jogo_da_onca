import { FunctionComponent, useEffect, useState } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
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
    imgSkinCao: '',
    nameSkinCao: ''
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
    if (skin?.idSkinCao) {
      setFormValues({
        idSkinCao: skin.idSkinCao,
        season: skin.season,
        imgSkinCao: skin.imgSkinCao,
        nameSkinCao: skin.nameSkinCao
      });
    } else {
      setFormValues({
        imgSkinCao: '',
        nameSkinCao: ''
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
                name="nameSkinCao"
                label='Nome'
                value={formValues.nameSkinCao}
                onChange={handleChange}
                placeholder='Nome'
                error={!formValues.nameSkinCao}
                required
              />
              <Form.Dropdown
                fluid
                name="imgSkinCao"
                label='Skin Cao'
                value={formValues.imgSkinCao}
                options={friendOptions}
                selection
                onChange={handleChange}
                placeholder='Skin Cao'
                error={!formValues.imgSkinCao}
                required
              />
            </Form.Group>
            {/* <Form.Group widths='equal'>
              <Form.Input
                fluid
                name="season"
                label='Temporada Associada'
                value={formValues.season}
                onChange={handleChange}
                placeholder='Temporada Associada'
              />
            </Form.Group> */}
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
          disabled={!formValues.nameSkinCao || !formValues.imgSkinCao}
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

