import { FunctionComponent, useState } from 'react';
import {
  Navigate,
  Link
} from "react-router-dom";

interface Props {
}

const SignUp: FunctionComponent<Props> = (props) => {

  const [userName, setUserName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSignUp = () => {
    alert("Eu vou te registrar");
  };

  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="Nome de usuário"
          value={userName}
          onChange={e => setUserName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Endereço de e-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button onClick={handleSignUp}>Cadastrar grátis</button>
        <hr />
        <Link to="/">Fazer login</Link>
      </form>
    </div>
  );
};

export default SignUp;
