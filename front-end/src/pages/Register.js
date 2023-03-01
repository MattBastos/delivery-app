import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DeliveryContext from '../context/DeliveryContext';
import api from '../services/api';

function Register() {
  const { email, password, setEmail, setPassword } = useContext(DeliveryContext);
  const [name, setName] = useState('');
  const [errorMsg, setErrorMsg] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const passwordMinLength = 6;
    const nameMinLenght = 12;
    const emailIsValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{3})$/i);

    if (password.length >= passwordMinLength && emailIsValid
      && name.length >= nameMinLenght) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [email, password, name]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/register', {
        name,
        email,
        password,
      });
      navigate('/customer/products');
    } catch (error) {
      setErrorMsg([true, `${error}`]);
    }
  };

  return (
    <div>
      <form onSubmit={ handleSubmit } className="formulario">
        <h1>Register</h1>
        <section>
          <label htmlFor="input-email">
            Name
            <input
              className="form-input"
              type="text"
              name="text"
              onChange={ (e) => setName(e.target.value) }
              data-testid="common_register__input-name"
            />
          </label>
          <label htmlFor="input-email">
            E-mail
            <input
              className="form-input"
              type="email"
              name="email"
              onChange={ (e) => setEmail(e.target.value) }
              data-testid="common_register__input-email"
            />
          </label>
          <label htmlFor="label-password">
            Password
            <input
              className="form-input"
              type="password"
              name="password"
              onChange={ (e) => setPassword(e.target.value) }
              data-testid="common_register__input-password"
            />
          </label>
        </section>
        <div>
          <button
            className="form-input"
            type="submit"
            name="register"
            data-testid="common_register__button-register"
            disabled={ isDisabled }
          >
            Create Account
          </button>
        </div>
      </form>
      { errorMsg
        ? <p data-testid="common_register__element-invalid_register">Mensagem de erro</p>
        : undefined }

    </div>
  );
}

export default Register;
