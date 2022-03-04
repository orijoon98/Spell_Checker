/** @jsxImportSource @emotion/react */
import styled from 'styled-components';
import { css } from '@emotion/react';

const Home = ({
  form,
  loading,
  checked,
  onCheck,
  onChange,
  onFinish,
  onText,
  typos,
  tokens,
  result,
}) => {
  const spellCheck = () => {
    const res = [];
    for (let i = 0; i < result.length; i++) {
      if (tokens.has(result[i])) {
        res.push(
          <span key={i} name={result[i]} css={TextButton} onClick={onText}>
            {result[i]}
          </span>
        );
      } else {
        res.push(<span key={i}>{result[i]}</span>);
      }
    }
    return res;
  };

  return (
    <Container>
      <Title>맞춤법 검사</Title>

      {checked ? (
        <>
          <TextAreaContainer>{spellCheck()}</TextAreaContainer>
          <div>오타 의심 단어 {typos}개</div>
          <ButtonContainer>
            <FinishButton onClick={onFinish}>검사 종료하기</FinishButton>
          </ButtonContainer>
        </>
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
            <CheckButton onClick={onCheck} disabled={loading}>
              맞춤법 검사하기
            </CheckButton>
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

const TextButton = css`
  color: red;
  text-decoration: underline;
  &:hover {
    cursor: pointer;
  }
`;

export default Home;
