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
    imgSkinOnca: '',
    nameSkinOnca: ''
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
    if (skin?.idSkinOnca) {
      setFormValues({
        idSkinOnca: skin.idSkinOnca,
        season: skin.season,
        imgSkinOnca: skin.imgSkinOnca,
        nameSkinOnca: skin.nameSkinOnca
      });
    } else {
      setFormValues({
        imgSkinOnca: '',
        nameSkinOnca: ''
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
                name="nameSkinOnca"
                label='Nome'
                value={formValues.nameSkinOnca}
                onChange={handleChange}
                placeholder='Nome'
                error={!formValues.nameSkinOnca}
                required
              />
              <Form.Dropdown
                fluid
                name="imgSkinOnca"
                label='Skin Onça'
                value={formValues.imgSkinOnca}
                options={friendOptions}
                selection
                onChange={handleChange}
                placeholder='Skin Onça'
                error={!formValues.imgSkinOnca}
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
                disabled
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
          disabled={!formValues.nameSkinOnca || !formValues.imgSkinOnca}
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

