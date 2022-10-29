import { FunctionComponent, useContext, useEffect, useState } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import { DateInput } from "semantic-ui-calendar-react";
import GetSeasonDto from '../../../../Services/Season/dto/GetSeasonDto';
import { ThemeContext } from '../../../../App';

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
  tabuleiro: 0,
  skinCao: 0,
  skinOnca: 0,
  inicio: '',
  fim: '',
  idSeason: 0,
  nameSeason: ''
} as GetSeasonDto;

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
    if (season?.idSeason) {
      setFormValues({
        tabuleiro: season.tabuleiro,
        skinCao: season.skinCao,
        skinOnca: season.skinOnca,
        inicio: season.inicio,
        fim: season.fim,
        idSeason: season.idSeason,
        nameSeason: season.nameSeason
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
            <Form.Input
              fluid
              name="nameSeason"
              label='Nome'
              value={formValues.nameSeason}
              onChange={handleChange}
              placeholder='Nome'
              required
              error={!formValues.nameSeason}
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
                required
                error={!formValues.inicio}
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
                required
                error={!formValues.fim}
              />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Dropdown
                fluid
                name="skinOnca"
                label='SKIN da Onça'
                value={formValues.skinOnca}
                options={state.jaguarSkins.map(j => Object.assign({}, {
                  key: j.idSkinOnca,
                  text: j.nameSkinOnca,
                  value: j.idSkinOnca,
                  image: { avatar: true, src: 'https://conteudo.imguol.com.br/c/entretenimento/54/2020/04/28/cachorro-pug-1588098472110_v2_1x1.jpg' },
                }))}
                selection
                onChange={handleChange}
                placeholder='SKIN da Onça'
                disabled={!createMode}
                required
                error={!formValues.skinOnca && createMode}
              />
              <Form.Dropdown
                fluid
                name="skinCao"
                label='SKIN do Cachorro'
                value={formValues.skinCao}
                options={state.dogSkins.map(d => Object.assign({}, {
                  key: d.idSkinCao,
                  text: d.nameSkinCao,
                  value: d.idSkinCao,
                  image: { avatar: true, src: 'https://conteudo.imguol.com.br/c/entretenimento/54/2020/04/28/cachorro-pug-1588098472110_v2_1x1.jpg' },
                }))}
                selection
                onChange={handleChange}
                placeholder='SKIN do Cachorro'
                disabled={!createMode}
                required
                error={!formValues.skinCao && createMode}
              />
              <Form.Dropdown
                fluid
                name="tabuleiro"
                label='Tabuleiro'
                value={formValues.tabuleiro}
                options={state.boards.map(b => Object.assign({}, {
                  key: b.idTabuleiro,
                  text: b.nameTabuleiro,
                  value: b.idTabuleiro,
                  image: { avatar: true, src: 'https:conteudo.imguol.com.br/c/entretenimento/54/2020/04/28/cachorro-pug-1588098472110_v2_1x1.jpg' },
                }))}
                selection
                onChange={handleChange}
                placeholder='Tabuleiro'
                disabled={!createMode}
                required
                error={!formValues.tabuleiro && createMode}
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
          disabled={!formValues.nameSeason || !formValues.inicio || !formValues.fim || !formValues.skinOnca || !formValues.skinCao || !formValues.tabuleiro}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default SeasonDetail