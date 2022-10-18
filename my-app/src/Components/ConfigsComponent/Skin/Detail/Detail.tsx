import { FunctionComponent, useEffect, useState } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import GetSkinDto from '../../../../Services/Skins/dto/GetSkinDto';

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

  const handleChange = (ev: any) => {
    setFormValues({ ...formValues, [ev.target.id]: ev.target.value })
  }

  return (
    <Modal
      onClose={() => setOpenModal(false)}
      onOpen={() => setOpenModal(true)}
      open={openModal}
    >
      <Modal.Header>{createMode ? "Adicionar Onça" : "Editar Onça"}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form>
            <Form.Group widths='equal'>
              {/* {!createMode ?
                <Form.Input
                  fluid
                  id="id"
                  label='Id'
                  value={formValues.id}
                  onChange={handleChange}
                  placeholder='Id'
                />
                : null} */}
              <Form.Input
                fluid
                id="nameSkin"
                label='Nome'
                value={formValues.nameSkin}
                onChange={handleChange}
                placeholder='Nome'
              />
              <Form.Input
                fluid
                id="imgSkin"
                label='Url da imagem'
                value={formValues.imgSkin}
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

