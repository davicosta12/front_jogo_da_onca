import { FunctionComponent, useEffect, useState } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import { userIconsOptions } from '../../../../misc/utils/utils/options';
import GetUserDto from '../../../../Services/Users/dto/GetUserDto';

interface Props {
  user: GetUserDto;
  openModal: boolean;
  createMode: boolean;
  onCreate: (values: GetUserDto) => void;
  onUpdate: (values: GetUserDto) => void;
  loading?: boolean;
  setOpenModal: any;
}

const INITIAL_FORM_VALUES = {
  id: 0,
  e_mail: '',
  icone: '',
  nome: '',
  nro_lose: 0,
  nro_win: 0,
  isAdmin: false,
  senha: ''
} as GetUserDto;

const UserDetail: FunctionComponent<Props> = (props) => {

  const [formValues, setFormValues] = useState(INITIAL_FORM_VALUES);

  const {
    user,
    openModal,
    createMode,
    onCreate,
    onUpdate,
    setOpenModal
  } = props;

  useEffect(() => {
    if (user?.id) {
      setFormValues({
        id: user.id,
        nome: user.nome,
        e_mail: user.e_mail,
        icone: user.icone,
        isAdmin: user.isAdmin,
        nro_lose: user.nro_lose,
        nro_win: user.nro_win,
        senha: user.senha
      });
    } else {
      setFormValues(INITIAL_FORM_VALUES);
    }
  }, [user, openModal]);

  const handleSubmit = (values: GetUserDto) => {

    let payload = {} as any;
    if (formValues.isAdmin) {
      delete values.icone
      payload = { ...values };
    }
    else {
      payload = { ...values };
    }

    createMode
      ? onCreate(payload)
      : onUpdate(payload);
  }

  const handleChange = (ev: any, { name, value }: any) => {
    setFormValues({ ...formValues, [name]: value });
  }

  const handleChecked = (ev: any, { name, checked }: any) => {
    setFormValues({ ...formValues, [name]: checked });
  }

  return (
    <Modal
      onClose={() => setOpenModal(false)}
      onOpen={() => setOpenModal(true)}
      open={openModal}
    >
      <Modal.Header>{createMode ? "Adicionar Usuário" : "Editar Usuário"}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form>
            <Form.Group widths='equal'>
              <Form.Input
                label='Nome'
                name='nome'
                value={formValues.nome}
                onChange={handleChange}
                placeholder='Nome'
                error={!formValues.nome}
                required
              />
              <Form.Input
                label='Senha'
                name='senha'
                value={formValues.senha}
                onChange={handleChange}
                type='password'
                placeholder='Senha'
                error={!formValues.senha}
                required
              />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Input
                label='Email'
                name='e_mail'
                value={formValues.e_mail}
                onChange={handleChange}
                placeholder='Email'
              />
              {!formValues.isAdmin && <Form.Dropdown
                name='icone'
                value={formValues.icone}
                onChange={handleChange}
                label='Ícone'
                options={userIconsOptions}
                selection
                placeholder='Ícone'
              />}
            </Form.Group>
            <Form.Checkbox
              name='isAdmin'
              checked={formValues.isAdmin}
              label='Admin?'
              onChange={handleChecked}
            />
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
          disabled={!formValues.nome}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default UserDetail