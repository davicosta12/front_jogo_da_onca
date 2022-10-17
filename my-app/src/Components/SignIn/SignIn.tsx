import { FunctionComponent, useState } from 'react';
import {
  useNavigate,
  Link
} from "react-router-dom";
import { Form, Button, Input, Segment, Grid, Divider, Header } from 'semantic-ui-react';
import AuthService from '../../Services/AuthService/Auth';
import './SignIn.scss';

interface Props {
}

const SignIn: FunctionComponent<Props> = (props) => {

  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const authService = new AuthService(localStorage.getItem("@airbnb-Token"));
  const navigate = useNavigate();

  const handleSignIn = async (ev: any) => {
    ev.preventDefault();
    // await authService.getToken(userName, password);
    authService.saveToken("Token");
    navigate("/config/skin");
  };

  return (
    <div className='login-container flex' >

      <div className='w-full img-background-left flex-column justify-content-center align-items-center'>
        <Header as='h1' className='login-title-left'>Jogo da onça</Header>
        <div className='flex justify-content-center align-items-center'>
          <img className='img-onca-base' height={360} width={360}></img>
        </div>
      </div>

      <div className='w-full img-background-right flex justify-content-center align-items-center'>
        <div>
          <Header as='h1' className='login-title-right'>Seja bem vindo !</Header>

          <h3 className='text-center login-subtitle-right'>Acesse sua conta</h3>

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
                placeholder="Senha"
                size='large'
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </Form.Field>

            <div className='flex justify-content-center mt-2'>
              <Button onClick={handleSignIn} className="login-entrar">Entrar</Button>
            </div>
            <div className='flex justify-content-center mt-2'>
              <Link to="/signup" className='login-signUp-btn'>Criar conta</Link>
            </div>

          </Form>
        </div>

      </div>
    </div>

  );
};

export default SignIn;
