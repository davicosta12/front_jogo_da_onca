import { FunctionComponent, useState } from 'react';
import {
  useNavigate,
  Link
} from "react-router-dom";
import { Form, Button, Input, Segment } from 'semantic-ui-react';
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
        <h1 className='login-title'>Criar conta</h1>
      </div>
      <div className='signUp-content'>

        <div className='mb-3'>
          <h3 className='login-subtitle text-center'>Forneça suas informações</h3>
        </div>

        <div className='signUp-form-container'>
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
          </Form>

          <div className='flex flex-wrap justify-content-end mt-2'>
            <div className='flex justify-content-center align-items-center'>
              <Button className='p-button-signInAndSignUp' onClick={handleBackPage}>Voltar</Button>
            </div>
            <div className='flex justify-content-center align-items-center'>
              <Button className='p-button-signInAndSignUp' onClick={handleSignUp}>Cadastrar</Button>
            </div>
          </div>
        </div>

      </div>
    </Segment >
  );
};

export default SignUp;
