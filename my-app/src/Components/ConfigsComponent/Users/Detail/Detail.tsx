import { FunctionComponent, useEffect, useState } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
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
        nro_lose: user.nro_lose,
        nro_win: user.nro_win,
        senha: user.senha
      });
    } else {
      setFormValues(INITIAL_FORM_VALUES);
    }
  }, [user]);

  const handleSubmit = (values: GetUserDto) => {
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
      <Modal.Header>{createMode ? "Adicionar Usuário" : "Editar Usuário"}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form>
            <Form.Group widths='equal'>
              <Form.Input
                fluid label='Nome'
                value={formValues.nome}
                onChange={handleChange}
                placeholder='Nome'
              />
              <Form.Input
                fluid label='Senha'
                value={formValues.senha}
                onChange={handleChange}
                placeholder='Senha'
              />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Input
                fluid label='Email'
                value={formValues.e_mail}
                onChange={handleChange}
                placeholder='Email'
              />
              <Form.Select
                fluid
                value={formValues.icone}
                onChange={handleChange}
                label='Ícones'
                options={options}
                placeholder='Ícones'
              />
            </Form.Group>
            {/* <Form.Group widths='equal'>
              <Form.Input
                fluid label='Número de Vitórias'
                value={nroWin}
                onChange={(ev: any) => setNroWin(ev.value)}
                placeholder='Número de Vitórias'
              />
              <Form.Input fluid label='Número de Derrotas'
                value={nroLose}
                onChange={(ev: any) => setNroLose(ev.value)}
                placeholder='Número de Derrotas'
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
          disabled={!formValues.nome}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default UserDetail

const options = [
  { key: 'I1', text: 'Ícone 1', value: 'Ícone1' },
  { key: 'I2', text: 'Ícone 2', value: 'Ícone2' },
  { key: 'I3', text: 'Ícone 3', value: 'Ícone3' },
];