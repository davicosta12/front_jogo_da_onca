import { FunctionComponent, useEffect, useState } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import { DateInput } from "semantic-ui-calendar-react";
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

  const handleChange = (ev: any, { name, value }: any) => {
    setFormValues({ ...formValues, [name]: value });
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
              name="name_season"
              label='Nome'
              value={formValues.name_season}
              onChange={handleChange}
              placeholder='Nome'
            />
            <Form.Group widths='equal'>
              <DateInput
                name="inicio"
                label="Data Inicial"
                placeholder="Data Inicial"
                value={formValues.inicio}
                iconPosition="left"
                dateFormat='DD/MM/YYYY'
                closable
                localization='pt-br'
                onChange={handleChange}
              />
              <DateInput
                name="fim"
                label="Data Final"
                placeholder="Data Final"
                value={formValues.fim}
                iconPosition="left"
                dateFormat='DD/MM/YYYY'
                closable
                localization='pt-br'
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Dropdown
                fluid
                name="skin_id"
                label='SKIN'
                value={formValues.skin_id}
                options={friendOptions}
                selection
                onChange={handleChange}
                placeholder='SKIN'
              />
              <Form.Dropdown
                fluid
                name="tabuleiro_id"
                label='Tabuleiro'
                value={formValues.tabuleiro_id}
                options={friendOptions}
                selection
                onChange={handleChange}
                placeholder='Tabuleiro'
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
          disabled={!formValues.name_season}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default SeasonDetail

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

