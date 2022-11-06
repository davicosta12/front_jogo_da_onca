import { FunctionComponent, useContext, useState } from 'react';
import {
  useNavigate,
  Link
} from "react-router-dom";
import { toast } from 'react-toastify';
import { Form, Button, Input } from 'semantic-ui-react';
import { ThemeContext } from '../../App';
import { toastError, toastOptions } from '../../misc/utils/utils/utils';
import AuthService, { isAdmin } from '../../Services/AuthService/Auth';
import { ActionTypes } from '../../reducer/reducer';
import './SignIn.scss';

interface Props {
}

const SignIn: FunctionComponent<Props> = (props) => {

  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const authService = new AuthService();
  const { state, dispatch } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleSignIn = async (ev: any) => {
    ev.preventDefault();
    try {
      const user = await authService.getToken(userName, password);
      localStorage.setItem("ACTIVE_USER", JSON.stringify(user));
      !user.isAdmin ? navigate("/home") : navigate("/config/season");
    }
    catch (err: any) {
      toast.error(toastError(err), toastOptions(toast));
    }
  };

  return (
    <div className='login-container flex' >

      <div className='w-full img-background-left flex-column justify-content-center align-items-center'>
        <h1 className='login-title-left'>Jogo da onça</h1>
        <div className='flex justify-content-center align-items-center'>
          <img className='img-onca-base' height={250} width={250}></img>
        </div>
      </div>

      <div className='w-full img-background-right flex justify-content-center align-items-center'>
        <div>
          <h1 className='login-title-right'>Seja bem vindo !</h1>

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
                type='password'
                size='large'
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </Form.Field>

            <div className='flex justify-content-center mt-2'>
              <Button onClick={handleSignIn} className="p-button-signInAndSignUp">Entrar</Button>
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
