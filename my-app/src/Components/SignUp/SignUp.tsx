import { FunctionComponent, useState } from 'react';
import {
  useNavigate
} from "react-router-dom";
import { toast } from 'react-toastify';
import { Form, Button, Input, Segment, Dimmer, Loader, Label } from 'semantic-ui-react';
import { toastError, toastOptions } from '../../misc/utils/utils/utils';
import AuthService from '../../Services/AuthService/Auth';
import { RegisterUserDto } from '../../Services/AuthService/dto/AuthRestDto';
import './SignUp.scss';

interface Props {
}

const SignUp: FunctionComponent<Props> = (props) => {

  const [userName, setUserName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const authService = new AuthService();

  const regexEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;
  const validateUserName = userName.length >= 6;
  const validateEmail = regexEmail.test(email);
  const validatePassword = password.length >= 8;

  const navigate = useNavigate();

  const handleSignUp = async () => {

    setIsLoading(true);

    const payload: RegisterUserDto = {
      nome: userName,
      e_mail: email,
      senha: password
    }

    try {
      await authService.registerUser(payload);
      toast.success("Usuário cadastrado com sucesso.", toastOptions(toast));
      navigate("/");
    }
    catch (err: any) {
      toast.error(toastError(err), toastOptions(toast));
    }
    finally {
      setIsLoading(false);
    }
  };

  const handleBackPage = () => {
    navigate(-1);
  }

  const handleConfirmPassword = () => {
    return !(password === confirmPassword) || !validatePassword;
  }

  const validateRegisterUser = () => {
    return validateUserName && validateEmail && validatePassword;
  }

  return (
    <>
      {isLoading && <Segment className='segment-loader'>
        <Dimmer active={isLoading}>
          <Loader content='Carregando...' />
        </Dimmer>
      </Segment>}

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
                {!validateUserName
                  ? <Label basic color='red' pointing='below'>
                    Nome deve ter pelo menos 6 caracteres.
                  </Label>
                  : null}
                <Input
                  placeholder='Nome'
                  size='large'
                  value={userName}
                  onChange={e => setUserName(e.target.value)}
                  error={!validateUserName}
                />
              </Form.Field>

              <Form.Field>
                {!validateEmail
                  ? <Label basic color='red' pointing='below'>
                    Email incorreto.
                  </Label>
                  : null}
                <Input
                  placeholder="Email"
                  size='large'
                  value={email}
                  type="email"
                  onChange={e => setEmail(e.target.value)}
                  error={!validateEmail}
                />
              </Form.Field>

              <Form.Field>
                {!validatePassword
                  ? <Label basic color='red' pointing='below'>
                    A senha deve ter pelo menos 8 caracteres.
                  </Label>
                  : null}
                <Input
                  placeholder="Senha"
                  size='large'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  type="password"
                  error={!validatePassword}
                />
              </Form.Field>

              <Form.Field>
                {handleConfirmPassword()
                  ? <Label basic color='red' pointing='below'>
                    As senhas não conferem.
                  </Label>
                  : null}
                <Input
                  placeholder="Confirmar senha"
                  size='large'
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  type="password"
                  error={handleConfirmPassword()}
                />
              </Form.Field>
            </Form>

            <div className='flex flex-wrap justify-content-end mt-2'>
              <div className='flex justify-content-center align-items-center'>
                <Button className='p-button-signInAndSignUp' onClick={handleBackPage}>Voltar</Button>
              </div>
              <div className='flex justify-content-center align-items-center'>
                <Button
                  className='p-button-signInAndSignUp'
                  disabled={!userName || !email || !password || !confirmPassword || handleConfirmPassword() || !validateRegisterUser()}
                  onClick={handleSignUp}
                >
                  Cadastrar
                </Button>
              </div>
            </div>
          </div>

        </div>
      </Segment >
    </>
  );
};

export default SignUp;