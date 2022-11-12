import { FunctionComponent, useContext, useEffect, useState } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import { ThemeContext } from '../../../../App';
import { BannerImagesOptions } from '../../../../misc/utils/utils/options';
import GetBannerDto from '../../../../Services/Banner/dto/GetBannerDto';
import PostBannerDto from '../../../../Services/Banner/dto/PostBannerDto';

interface Props {
  banner: GetBannerDto;
  openModal: boolean;
  createMode: boolean;
  onCreate?: (values: PostBannerDto) => void;
  onUpdate?: (values: PostBannerDto) => void;
  disabledAction?: boolean;
  isArray?: boolean;
  editText?: string;
  loading?: boolean;
  setOpenModal: any;
}

const INITIAL_FORM_VALUES = {
  id: 0,
  name_banner: '',
  img_banner: ''
} as PostBannerDto;

const BannerDetail: FunctionComponent<Props> = (props) => {

  const [formValues, setFormValues] = useState(INITIAL_FORM_VALUES);
  const { state, dispatch } = useContext(ThemeContext);

  const {
    banner,
    openModal,
    createMode,
    onCreate,
    onUpdate,
    setOpenModal
  } = props;

  useEffect(() => {
    if (banner?.id) {
      setFormValues({
        name_banner: banner.name_banner,
        img_banner: banner.img_banner,
      });
    } else {
      setFormValues(INITIAL_FORM_VALUES);
    }
  }, [banner, openModal]);

  const handleSubmit = (values: PostBannerDto) => {
    createMode
      ? onCreate?.(values)
      : onUpdate?.(values);
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
      <Modal.Header>{createMode ? "Adicionar Tabuleiro" : props.editText}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form>
            <Form.Group widths='equal'>
              <Form.Input
                fluid
                name="name_banner"
                label='Nome'
                value={formValues.name_banner}
                onChange={handleChange}
                placeholder='Nome'
                error={!formValues.name_banner}
                required
              />
              <Form.Dropdown
                fluid
                name="img_banner"
                label='Imagem do Tabuleiro'
                value={formValues.img_banner}
                options={BannerImagesOptions}
                selection
                onChange={handleChange}
                placeholder='Imagem do Tabuleiro'
                error={!formValues.img_banner}
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
        {!props.disabledAction && <Button
          content="Salvar"
          labelPosition='right'
          icon='checkmark'
          onClick={() => handleSubmit(formValues)}
          loading={props.loading}
          disabled={!formValues.name_banner || !formValues.img_banner}
          positive
        />}
      </Modal.Actions>
    </Modal>
  )
}

export default BannerDetail

BannerDetail.defaultProps = {
  disabledAction: false,
  isArray: false,
  editText: "Editar Tabuleiro"
}