import { FunctionComponent, useEffect, useState } from 'react';
import { Button, Form, Header, Modal } from 'semantic-ui-react';

interface Props {
  user: any;
  openModal: boolean;
  createMode: boolean;
  loading?: boolean;
  setOpenModal: any;
}

const UserDetail: FunctionComponent<Props> = (props) => {

  const [id, setId] = useState(0);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [icone, setIcone] = useState('');
  const [nroWin, setNroWin] = useState(0);
  const [nroLose, setNroLose] = useState(0);

  const {
    user,
    openModal,
    createMode,
    setOpenModal
  } = props;

  useEffect(() => {
    if (user?.id) {
      setId(user.id);
      setNome(user.nome);
      setEmail(user.e_mail);
      setSenha(user.senha);
      setIcone(user.icone);
      setNroWin(user.nro_win);
      setNroLose(user.nro_lose);
    } else {
      setId(0);
      setNome('');
      setEmail('');
      setSenha('');
      setIcone('');
      setNroWin(0);
      setNroLose(0);
    }
  }, [user]);

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
                value={nome}
                onChange={(ev: any) => setNome(ev.value)}
                placeholder='Nome'
              />
              <Form.Input
                fluid label='Senha'
                value={senha}
                onChange={(ev: any) => setSenha(ev.value)}
                placeholder='Senha'
              />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Input
                fluid label='Email'
                value={email}
                onChange={(ev: any) => setEmail(ev.value)}
                placeholder='Email'
              />
              <Form.Select
                fluid
                value={icone}
                onChange={(ev: any) => setIcone(ev.value)}
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
          onClick={() => setOpenModal(false)}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default UserDetail

const options = [
  { key: 'm', text: 'Ícone 1', value: 'male' },
  { key: 'f', text: 'Ícone 2', value: 'female' },
  { key: 'o', text: 'Ícone 3', value: 'other' },
];