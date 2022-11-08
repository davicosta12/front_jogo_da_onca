import { FunctionComponent, useContext, useEffect, useState } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import { DateInput } from "semantic-ui-calendar-react";
import GetSeasonDto from '../../../../Services/Season/dto/GetSeasonDto';
import { ThemeContext } from '../../../../App';
import PostSeasonDto from '../../../../Services/Season/dto/PostSeasonDto';
import PutSeasonDto from '../../../../Services/Season/dto/PutSeasonDto';

interface Props {
  season: GetSeasonDto;
  openModal: boolean;
  createMode: boolean;
  onCreate: (values: PostSeasonDto) => void;
  onUpdate: (values: PutSeasonDto) => void;
  loading?: boolean;
  setOpenModal: any;
}

const INITIAL_FORM_VALUES = {
  nome_season: '',
  inicio: '',
  fim: '',
  tabuleiro_id: 0,
  skinDog_id: 0,
  skinJaguar_id: 0
} as PostSeasonDto;

const SeasonDetail: FunctionComponent<Props> = (props) => {

  const [formValues, setFormValues] = useState(INITIAL_FORM_VALUES);
  const { state, dispatch } = useContext(ThemeContext);

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
        nome_season: season.nome_season,
        inicio: season.inicio,
        fim: season.fim,
        tabuleiro_id: season.tabuleiro?.id || 0,
        skinDog_id: season.skinDog?.id || 0,
        skinJaguar_id: season.skinJaguar?.id || 0
      });
    } else {
      setFormValues(INITIAL_FORM_VALUES);
    }
  }, [season, openModal]);

  const handleSubmit = (values: any) => {
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
            <Form.Input
              fluid
              name="nome_season"
              label='Nome'
              value={formValues.nome_season}
              onChange={handleChange}
              placeholder='Nome'
              required
              error={!formValues.nome_season}
            />
            <Form.Group widths='equal'>
              <DateInput
                name="inicio"
                label="Data Inicial"
                placeholder="Data Inicial"
                value={formValues.inicio}
                iconPosition="left"
                dateFormat='YYYY-MM-DD'
                closable
                localization='pt-br'
                onChange={handleChange}
                required
                error={!formValues.inicio}
              />
              <DateInput
                name="fim"
                label="Data Final"
                placeholder="Data Final"
                value={formValues.fim}
                iconPosition="left"
                dateFormat='YYYY-MM-DD'
                closable
                localization='pt-br'
                onChange={handleChange}
                required
                error={!formValues.fim}
              />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Dropdown
                fluid
                name="skinJaguar_id"
                label='SKIN da Onça'
                value={formValues.skinJaguar_id}
                options={state.jaguarSkins.map(j => Object.assign({}, {
                  key: j.id,
                  text: j.name_skin,
                  value: j.id,
                  image: { avatar: true, src: j.img_skin},
                }))}
                selection
                onChange={handleChange}
                placeholder='SKIN da Onça'
                disabled={!createMode}
                required
                error={!formValues.skinJaguar_id && createMode}
              />
              <Form.Dropdown
                fluid
                name="skinDog_id"
                label='SKIN do Cachorro'
                value={formValues.skinDog_id}
                options={state.dogSkins.map(d => Object.assign({}, {
                  key: d.id,
                  text: d.name_skin,
                  value: d.id,
                  image: { avatar: true, src: d.img_skin },
                }))}
                selection
                onChange={handleChange}
                placeholder='SKIN do Cachorro'
                disabled={!createMode}
                required
                error={!formValues.skinDog_id && createMode}
              />
              <Form.Dropdown
                fluid
                name="tabuleiro_id"
                label='Tabuleiro'
                value={formValues.tabuleiro_id}
                options={state.boards.map(b => Object.assign({}, {
                  key: b.id,
                  text: b.name_tabuleiro,
                  value: b.id,
                  image: { avatar: true, src: b.img_tabuleiro},
                }))}
                selection
                onChange={handleChange}
                placeholder='Tabuleiro'
                disabled={!createMode}
                required
                error={!formValues.tabuleiro_id && createMode}
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
          disabled={!formValues.nome_season || !formValues.inicio || !formValues.fim || !formValues.skinJaguar_id || !formValues.skinDog_id || !formValues.tabuleiro_id}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default SeasonDetail