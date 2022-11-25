import { FunctionComponent } from 'react';
import styled from 'styled-components';

interface Props {
  countDogsDeath: number;
  dog_img: string;
}

const PetSematary: FunctionComponent<Props> = (props) => {

  const { countDogsDeath, dog_img } = props;

  const arrNumbers = new Array(countDogsDeath).fill(0);

  const Container = styled.div`
    width: 350px;
    height: 250px;
`;

  const Title = styled.h1`
    font-size: 3em;
    font-weight: 600;
    color: #fff;
    text-align: center;
`;
  const Header = styled.div`
    width: 100%;
    padding: 10px 0;
    background-image: url(${require("../../../assets/petSematary/headerPetSematary.png")});
    background-repeat: no-repeat;
    background-position: center; 
`;

  const Content = styled.div`
    width: 100%;
    height: 250px;
    background-image: url(${require("../../../assets/petSematary/backGroundPetSematary.png")});
    background-repeat: no-repeat;
    background-position: center; 
`;

  return (
    <Container>

      <Header className='flex justify-content-center align-items-center'>
        <Title>
          Cemitério
        </Title>
      </Header>

      <Content>
        <div className='flex flex-wrap justify-content-center'>
          {arrNumbers.map(item =>
            <div style={{ margin: '5px' }}>
              <img
                src={dog_img}
                height="50"
                width="50"
                alt='imagem cachorro'
                style={{ borderRadius: '50%' }}
              />
            </div>)}
        </div>
      </Content>

    </Container>
  );
};

export default PetSematary;