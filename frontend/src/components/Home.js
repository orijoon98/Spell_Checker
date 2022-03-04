import React from 'react';
import styled from 'styled-components';

const Home = ({ form, loading, checked, onCheck, onChange, onFinish }) => {
  return (
    <Container>
      <Title>맞춤법 검사</Title>
      {checked ? (
        <TextAreaContainer>
          <>
            <TextAreaContainer>맞춤법 검사 완료</TextAreaContainer>
            <ButtonContainer>
              <FinishButton onClick={onFinish}>검사 종료하기</FinishButton>
            </ButtonContainer>
          </>
        </TextAreaContainer>
      ) : (
        <>
          <TextAreaContainer>
            {loading ? (
              <Loading>맞춤법 검사중입니다.</Loading>
            ) : (
              <TextArea
                name="sentence"
                value={form.sentence}
                onChange={onChange}
              />
            )}
          </TextAreaContainer>
          <ButtonContainer>
            <CheckButton onClick={onCheck}>맞춤법 검사하기</CheckButton>
          </ButtonContainer>
        </>
      )}
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

const Loading = styled.div`
  width: 70vw;
  height: 30vh;
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

const FinishButton = styled.button`
  width: 200px;
  height: 100px;
`;

export default Home;
