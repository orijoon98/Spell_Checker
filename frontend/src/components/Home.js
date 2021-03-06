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
  onXButton,
  onDirectChange,
  onDirectClick,
  onSuggestionClick,
  onCopy,
  typos,
  tokens,
  result,
  modal,
  modalDetail,
  fixed,
  blankO,
  blankX,
}) => {
  const spellCheck = () => {
    const res = [];
    for (let i = 0; i < result.length; i++) {
      if (fixed.has(i)) {
        res.push(
          <span key={i} id={i} name={result[i]} css={BlueText}>
            {result[i]}
          </span>
        );
      } else if (tokens.has(result[i])) {
        res.push(
          <span
            key={i}
            id={i}
            name={result[i]}
            css={TextButton}
            onClick={onText}
          >
            {result[i]}
          </span>
        );
      } else {
        res.push(
          <span
            key={i}
            id={i}
            name={result[i] === '<LineChange>' ? '\n' : result[i]}
          >
            {result[i] === '<LineChange>' ? <br /> : result[i]}
          </span>
        );
      }
    }
    return res;
  };

  const substitutes = () => {
    const res = [];
    let suggestions = modalDetail[1];
    for (let i = 0; i < suggestions.length; i++) {
      res.push(
        <div key={i}>
          <span key={i} id={i} name={suggestions[i]} css={BlueText}>
            {suggestions[i]}
          </span>
          <button onClick={onSuggestionClick}>적용</button>
        </div>
      );
    }
    return res;
  };

  return (
    <Container>
      <Title>맞춤법 검사</Title>

      {checked ? (
        <>
          <div>
            공백포함: 총 <span css={BlueText}>{blankO}</span>자 | 공백제외: 총{' '}
            <span css={BlueText}>{blankX}</span>자
          </div>
          <TextAreaContainer name="textArea">
            <button onClick={onCopy}>복사</button>
            {spellCheck()}
          </TextAreaContainer>
          <div>오타 의심 단어 {typos}개</div>
          <ButtonContainer>
            <FinishButton onClick={onFinish}>검사 종료하기</FinishButton>
          </ButtonContainer>
          {modal ? (
            <Modal>
              <button onClick={onXButton}>x</button>
              <div>
                틀린 단어 <span css={RedText}>{modalDetail[0]}</span>
              </div>
              <div>대체어 {substitutes()}</div>
              <div>
                직접 입력 <input type="text" onChange={onDirectChange} />
                <button onClick={onDirectClick}>적용</button>
              </div>
              <div>
                도움말 보기 <span>{modalDetail[2]}</span>
              </div>
            </Modal>
          ) : (
            <></>
          )}
        </>
      ) : (
        <>
          <div>
            공백포함: 총 <span css={BlueText}>{blankO}</span>자 | 공백제외: 총{' '}
            <span css={BlueText}>{blankX}</span>자
          </div>
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

const RedText = css`
  color: red;
  text-decoration: underline;
`;

const BlueText = css`
  color: blue;
`;

const Modal = styled.div`
  position: absolute;
  background-color: white;
  border: 1px solid black;
  z-index: 100;
  width: 50%;
  height: 30%;
  left: 25%;
  top: 30%;
`;

export default Home;
