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
      console.log(response.data);
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

  return (
    <Home
      form={form}
      loading={loading}
      checked={checked}
      onCheck={onCheck}
      onChange={onChange}
      onFinish={onFinish}
    />
  );
};

export default HomeContainer;
