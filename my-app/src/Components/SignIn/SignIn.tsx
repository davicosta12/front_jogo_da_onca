import { FunctionComponent, useState } from 'react';
import {
  useNavigate,
  Link
} from "react-router-dom";
import { login } from "../../Services/AuthService/Auth";

interface Props {
}

const SignIn: FunctionComponent<Props> = (props) => {

  const [userName, setUserName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleSignIn = (ev: any) => {
    ev.preventDefault();
    login("TOKEN");
    navigate("/app");
  };

  return (
    <form>
      <input
        type="text"
        placeholder="Nome de usuário"
        value={userName}
        onChange={e => setUserName(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleSignIn}>Entrar</button>
      <hr />
      <Link to="/signup">Criar conta grátis</Link>
    </form>
  );
};

export default SignIn;
