import { FunctionComponent, useContext, useState } from 'react';
import {
  useNavigate,
  Link
} from "react-router-dom";
import { toast } from 'react-toastify';
import { Form, Button, Input, Segment, Dimmer, Loader } from 'semantic-ui-react';
import { ThemeContext } from '../../App';
import { toastError, toastOptions } from '../../misc/utils/utils/utils';
import './SignIn.scss';
import AuthHelper from '../../helpers/AuthHelper';

interface Props {
}

const SignIn: FunctionComponent<Props> = (props) => {

  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { state, dispatch } = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (ev: any) => {
    ev.preventDefault();
    setIsLoading(true);
    try {
      await AuthHelper.authenticate(userName, password, dispatch);
      !state.activeUser.isAdmin ? navigate("/home") : navigate("/config/season");
    }
    catch (err: any) {
      toast.error(toastError(err), toastOptions(toast));
    }
    finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Segment className='segment-loader'>
        <Dimmer active={isLoading}>
          <Loader content='Carregando...' />
        </Dimmer>
      </Segment>}

      <div className='login-container flex'>

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
                <Button onClick={handleSignIn} className="p-button-signInAndSignUp" disabled={!password || !userName}>Entrar</Button>
              </div>
              <div className='flex justify-content-center mt-2'>
                <Link to="/signup" className='login-signUp-btn'>Criar conta</Link>
              </div>

            </Form>
          </div>

        </div>
      </div>
    </>
  );
};

export default SignIn;
