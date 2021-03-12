import styles from '../../styles/components/RegisterModal.module.css';
import { useState, useRef, useContext } from 'react';
import { FocusScope } from '@react-aria/focus';
import { useOverlay } from '@react-aria/overlays';
import { useDialog } from '@react-aria/dialog';
import { SignInSignUpContext } from '../../contexts/SignInSignUpContext';
import Link from 'next/link';

import { getRandomAvatar } from '../../utils/UserIcons';

interface ICadastro {
  name: string;
  email: string;
  password: string;
}

export function RegisterModal(props: any) {
  const { closeRegisterModal, signIn } = useContext(SignInSignUpContext);
  const [formValues, setFormValues] = useState<ICadastro>({
    name: '',
    email: '',
    password: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    //Validação do login
    const validData = true;

    console.log(getRandomAvatar());

    if (validData) {
      //Salva as infos na session
      closeRegisterModal();
      signIn();
    }
    console.log('handleSubmit', data);
  };

  let ref = useRef();
  let { overlayProps } = useOverlay(props, ref);
  let { dialogProps } = useDialog(props, ref);

  // console.log('***formValues', formValues);

  return (
    <FocusScope contain autoFocus>
      <div className={styles.overlay}>
        <div
          className={styles.container}
          ref={ref}
          {...overlayProps}
          {...dialogProps}
        >
          <header>
            <h1>Cadastre-se</h1>
            <p>É rápido e fácil!</p>
          </header>
          <form className={styles.formRegister} onSubmit={handleSubmit}>
            <label htmlFor="name">Nome</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Facebookson Goku"
              onChange={handleInputChange}
              value={formValues.name || ''}
            />
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="facebooksonthet@ble.com"
              onChange={handleInputChange}
              value={formValues.email || ''}
            />
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Solarwinds123"
              onChange={handleInputChange}
              value={formValues.password || ''}
            />
            <div className={styles.submitContainer}>
              <p>
                Ao clicar em Cadastrar, você concorda com nossos{' '}
                <Link href="about">
                  <a target="_blank" rel="noopener noreferrer">
                    Termos e Política de Cookies
                  </a>
                </Link>
                .
              </p>
              <button className={styles.submitRegister} type="submit">
                Cadastrar
              </button>
            </div>
            <button
              className={styles.closeRegister}
              type="button"
              onClick={closeRegisterModal}
            >
              <img src="icons/close.svg" alt="Fechar Cadastro" />
            </button>
          </form>
        </div>
      </div>
    </FocusScope>
  );
}
