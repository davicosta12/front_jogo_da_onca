import { FunctionComponent, useEffect, useState } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import GetSeasonDto from '../../../../Services/Season/dto/GetSeasonDto';

interface Props {
  season: GetSeasonDto;
  openModal: boolean;
  createMode: boolean;
  onCreate: (values: GetSeasonDto) => void;
  onUpdate: (values: GetSeasonDto) => void;
  loading?: boolean;
  setOpenModal: any;
}

const INITIAL_FORM_VALUES = {
  id: 0,
  name_season: '',
  fim: '',
  inicio: '',
  skin_id: 0,
  tabuleiro_id: 0
} as GetSeasonDto;

const SeasonDetail: FunctionComponent<Props> = (props) => {

  const [formValues, setFormValues] = useState(INITIAL_FORM_VALUES);

  const {
    season,
    openModal,
    createMode,
    onCreate,
    onUpdate,
    setOpenModal
  } = props;

  useEffect(() => {
    if (season?.id) {
      setFormValues({
        id: season.id,
        name_season: season.name_season,
        inicio: season.inicio,
        fim: season.fim,
        skin_id: season.skin_id,
        tabuleiro_id: season.tabuleiro_id
      });
    } else {
      setFormValues(INITIAL_FORM_VALUES);
    }
  }, [season, openModal]);

  const handleSubmit = (values: GetSeasonDto) => {
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
      <Modal.Header>{createMode ? "Adicionar Temporada" : "Editar Temporada"}</Modal.Header>
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
                id="name_season"
                label='Nome'
                value={formValues.name_season}
                onChange={handleChange}
                placeholder='Nome'
              />
              <Form.Input
                fluid
                id="inicio"
                label='Data Inicial'
                value={formValues.inicio}
                onChange={handleChange}
                placeholder='Data Inicial'
              />
              <Form.Input
                fluid
                id="fim"
                label='Data Final'
                value={formValues.fim}
                onChange={handleChange}
                placeholder='Data Final'
              />
              {/* <Form.Input
                fluid
                id="skin_id"
                label='Url da imagem'
                value={formValues.skin_id}
                onChange={handleChange}
                placeholder='Skin do Tabuleiro'
              />
              <Form.Input
                fluid
                id="tabuleiro_id"
                label='Url da imagem'
                value={formValues.tabuleiro_id}
                onChange={handleChange}
                placeholder='Url da imagem'
              /> */}
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
          disabled={!formValues.name_season}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default SeasonDetail

