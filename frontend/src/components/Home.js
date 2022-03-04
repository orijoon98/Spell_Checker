import React from 'react';
import styled from 'styled-components';

const Home = () => {
  return (
    <Container>
      <Title>맞춤법 검사</Title>
      <TextAreaContainer>
        <TextArea></TextArea>
      </TextAreaContainer>
      <ButtonContainer>
        <CheckButton>맞춤법 검사하기</CheckButton>
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Title = styled.div`
  text-align: center;
`;

const TextAreaContainer = styled.div`
  text-align: center;
`;

const TextArea = styled.textarea`
  width: 70vw;
  height: 30vh;
`;

const ButtonContainer = styled.div`
  text-align: center;
`;

const CheckButton = styled.button`
  width: 200px;
  height: 100px;
`;

export default Home;
