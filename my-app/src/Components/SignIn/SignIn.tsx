import { FunctionComponent, useState } from 'react';
import {
  useNavigate,
  Link
} from "react-router-dom";
import { Form, Button, Input, Segment, Grid, Divider, Header } from 'semantic-ui-react';
import { login } from "../../Services/AuthService/Auth";
import './SignIn.scss';

interface Props {
}

const SignIn: FunctionComponent<Props> = (props) => {

  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleSignIn = (ev: any) => {
    ev.preventDefault();
    login("TOKEN");
    navigate("/app");
  };

  return (
    <Segment placeholder className='login-container' >
      <Grid stackable textAlign='center'>

        <Divider vertical clearing />

        <Grid.Row columns={2} verticalAlign='middle'>

          <Grid.Column>
            <Header as='h1'>Jogo da onça</Header>
          </Grid.Column>

          <Grid.Column>
            <Header as='h1'>Seja bem vindo !</Header>
            <h3>Acesse sua conta</h3>

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

              <div className='flex justify-content-center'>
                <Button onClick={handleSignIn}>Entrar</Button>
              </div>
              <Link to="/signup">Criar conta</Link>

            </Form>
          </Grid.Column>

        </Grid.Row>
      </Grid>
    </Segment>
  );
};

export default SignIn;
