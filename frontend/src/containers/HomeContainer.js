import React, { useState } from 'react';
import { spellCheck } from '../api/check';
import Home from '../components/Home';

const HomeContainer = () => {
  const initForm = {
    sentence: '',
  };

  const [form, setForm] = useState(initForm);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [typos, setTypos] = useState(0);
  const [result, setResult] = useState([]);
  const [tokens, setTokens] = useState(new Set());
  const [corrections, setCorrections] = useState([]);
  const [index, setIndex] = useState(0);
  const [modal, setModal] = useState(false);
  const [modalDetail, setModalDetail] = useState(['', [], '']);
  const [fixed, setFixed] = useState(new Set());
  const [direct, setDirect] = useState('');

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    setForm((state) => ({ ...state, [name]: value }));
  };

  const onCheck = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const data = { ...form };
      const response = await spellCheck(data);
      const res = response.data;
      setTypos(res.length);

      const tokens = new Set();
      const corrections = [];

      for (let i = 0; i < res.length; i++) {
        tokens.add(res[i]['token']);
        const correction = [
          res[i]['token'],
          res[i]['suggestions'],
          res[i]['info'],
        ];
        corrections[i] = correction;
      }

      setTokens(tokens);
      setCorrections(corrections);

      let tmp = form.sentence;

      for (let item of tokens) {
        let index = tmp.indexOf(item);
        while (index !== -1) {
          tmp = replaceAt(tmp, index, '*****' + item + '*****');
          index = tmp.indexOf(item, index + 10);
        }
      }

      setResult(tmp.split('*****'));

      setChecked(true);
      setLoading(false);
    } catch (e) {
      alert('맞춤법 검사 오류입니다.');
      setChecked(false);
      setLoading(false);
    }
  };

  const onFinish = async (e) => {
    e.preventDefault();

    setChecked(false);
  };

  const onText = async (e) => {
    e.preventDefault();
    const name = e.target.getAttribute('name');
    let id = 0;
    for (let i = 0; i < corrections.length; i++) {
      if (name === corrections[i][0]) {
        id = i;
        break;
      }
    }
    const textIndex = Number(e.target.getAttribute('id'));
    setIndex(textIndex);
    setModalDetail(corrections[id]);
    setModal(true);
  };

  const onXButton = async (e) => {
    e.preventDefault();
    setModal(false);
  };

  const onDirectChange = (e) => {
    setDirect(e.target.value);
  };

  const onDirectClick = async (e) => {
    e.preventDefault();
    let tmp = result;
    tmp[index] = direct;
    let tmpSet = fixed;
    tmpSet.add(index);
    setFixed(tmpSet);
    setModal(false);
    setResult([...tmp]);
  };

  const replaceAt = (string, index, replacement) => {
    return (
      string.substr(0, index) +
      replacement +
      string.substr(index + replacement.length - 10)
    );
  };

  return (
    <Home
      form={form}
      loading={loading}
      checked={checked}
      onCheck={onCheck}
      onChange={onChange}
      onFinish={onFinish}
      onText={onText}
      onXButton={onXButton}
      onDirectChange={onDirectChange}
      onDirectClick={onDirectClick}
      typos={typos}
      tokens={tokens}
      result={result}
      corrections={corrections}
      index={index}
      modal={modal}
      modalDetail={modalDetail}
      fixed={fixed}
    />
  );
};

export default HomeContainer;
