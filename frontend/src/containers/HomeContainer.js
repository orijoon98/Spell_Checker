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
      const corrections = new Map();

      for (let i = 0; i < res.length; i++) {
        tokens.add(res[i]['token']);
        const correction = {
          suggestions: res[i]['suggestions'],
          info: res[i]['info'],
        };
        corrections.set(res[i]['token'], correction);
      }

      setTokens(tokens);

      console.log(tokens);
      console.log(corrections);

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
    console.log(e.target.getAttribute('name'));
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
      typos={typos}
      tokens={tokens}
      result={result}
    />
  );
};

export default HomeContainer;
