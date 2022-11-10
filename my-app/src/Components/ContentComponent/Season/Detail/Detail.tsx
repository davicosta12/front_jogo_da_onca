import { FunctionComponent, useEffect, useState } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import { DateInput } from "semantic-ui-calendar-react";
import GetSeasonDto from '../../../../Services/Season/dto/GetSeasonDto';
import PostSeasonDto from '../../../../Services/Season/dto/PostSeasonDto';
import PutSeasonDto from '../../../../Services/Season/dto/PutSeasonDto';
import ListData from '../../../_commons/ListBox/ListBox';
import GetBoardDto from '../../../../Services/Board/dto/GetBoardDto';
import GetDogSkinDto from '../../../../Services/Skins/dto/GetDogSkinDto';
import GetJaguarSkinDto from '../../../../Services/Skins/dto/GetJaguarSkinDto';
import { boardImagesOptions } from '../../../../misc/utils/utils/options';

interface Props {
  skinsDogArray: GetDogSkinDto[],
  setSkinsDogArray: any,
  skinsJaguarArray: GetJaguarSkinDto[],
  setSkinsJaguarArray: any,
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
  tabuleiro: {} as GetBoardDto,
  skinsDog: [],
  skinsJaguar: []
} as PostSeasonDto;

const SeasonDetail: FunctionComponent<Props> = (props) => {

  const [formValues, setFormValues] = useState(INITIAL_FORM_VALUES);

  const {
    skinsDogArray,
    setSkinsDogArray,
    skinsJaguarArray,
    setSkinsJaguarArray,
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
        tabuleiro: season.tabuleiro,
        skinsDog: season.skinsDog?.length ? season.skinsDog : [],
        skinsJaguar: season.skinsJaguar?.length ? season.skinsJaguar : []
      });

      season.skinsDog?.length ? setSkinsDogArray(season.skinsDog) : setSkinsDogArray([]);
      season.skinsJaguar?.length ? setSkinsJaguarArray(season.skinsJaguar) : setSkinsJaguarArray([]);
    } else {
      setFormValues(INITIAL_FORM_VALUES);
      setSkinsDogArray([]);
      setSkinsJaguarArray([]);
    }
  }, [season, openModal]);

  const handleSubmit = (values: any) => {
    createMode
      ? onCreate(values)
      : onUpdate(values);
  }

  const handleChange = (ev: any, { name, value }: any) => {
    const split = name.split(".");
    (split?.length > 1)
      ? setFormValues({ ...formValues, tabuleiro: { ...formValues.tabuleiro, [split[1]]: value } })
      : setFormValues({ ...formValues, [name]: value });
  }

  const formValidate = () => {
    return !formValues.nome_season || !formValues.inicio || !formValues.fim
      || !formValues.tabuleiro.name_tabuleiro || !formValues.tabuleiro.img_tabuleiro
      || !skinsJaguarArray?.length || !skinsDogArray?.length
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
              <Form.Input
                fluid
                name="tabuleiro.name_tabuleiro"
                label='Nome do Tabuleiro'
                value={formValues.tabuleiro.name_tabuleiro}
                onChange={handleChange}
                placeholder='Nome'
                error={!formValues.tabuleiro.name_tabuleiro}
                required
              />
              <Form.Dropdown
                fluid
                name="tabuleiro.img_tabuleiro"
                label='Imagem do Tabuleiro'
                value={formValues.tabuleiro.img_tabuleiro}
                options={boardImagesOptions}
                selection
                onChange={handleChange}
                placeholder='Imagem do Tabuleiro'
                error={!formValues.tabuleiro.img_tabuleiro}
                required
              />
            </Form.Group>

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
                disabled={!createMode}
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
                disabled={!createMode}
              />
            </Form.Group>

            <Form.Group widths='equal'>
              <Form.Field>
                <label>Adicionar Skins da Onça</label>
                <ListData
                  dataList={skinsJaguarArray}
                  setDataList={setSkinsJaguarArray}
                  typeList='skinJaguar'
                  uniqItemName='name_skin'
                />
              </Form.Field>
              <Form.Field>
                <label>Adicionar Skins do Cachorro</label>
                <ListData
                  dataList={skinsDogArray}
                  setDataList={setSkinsDogArray}
                  typeList='skinDog'
                  uniqItemName='name_skin'
                />
              </Form.Field>
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
          disabled={formValidate()}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default SeasonDetail