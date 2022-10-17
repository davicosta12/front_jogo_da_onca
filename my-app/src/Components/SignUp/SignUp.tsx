import { FunctionComponent, useState } from 'react';
import {
  useNavigate,
  Link
} from "react-router-dom";
import { Form, Button, Input, Segment, Container, Header } from 'semantic-ui-react';
import './SignUp.scss';

interface Props {
}

const SignUp: FunctionComponent<Props> = (props) => {

  const [userName, setUserName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const navigate = useNavigate();

  const handleSignUp = () => {
    alert("Eu vou te registrar");
    navigate("/");
  };

  const handleBackPage = () => {
    navigate(-1);
  }

  return (
    <Segment className='signUp-container'>
      <div className='signUp-header'>
        <Header as='h1'>Criar conta</Header>
      </div>
      <div className='signUp-content'>
        <Header as='h3' className='text-center'>Forneça suas informações</Header>
        <Form>
          <Form.Field>
            <Input
              placeholder='Nome'
              size='large'
              value={userName}
              onChange={e => setUserName(e.target.value)}
            />
          </Form.Field>

          <Form.Field>
            <Input
              placeholder="Email"
              size='large'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </Form.Field>

          <Form.Field>
            <Input
              placeholder="Senha"
              size='large'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </Form.Field>

          <Form.Field>
            <Input
              placeholder="Confirmar senha"
              size='large'
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
          </Form.Field>

          <div className='flex justify-content-end'>
            <Button onClick={handleBackPage}>Voltar</Button>
            <Button onClick={handleSignUp}>Cadastrar</Button>
          </div>

        </Form>
      </div>
    </Segment>
  );
};

export default SignUp;
