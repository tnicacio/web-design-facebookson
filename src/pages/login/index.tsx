import Head from 'next/head';
import styles from '../../styles/pages/Login.module.css';
import { useContext, useState } from 'react';
import { SignInSignUpContext } from '../../contexts/SignInSignUpContext';
import { RegisterModal } from '../../components/login/RegisterModal';

import axios from 'axios';

interface ILogin {
  email: string;
  password: string;
}

function Login() {
  const { isRegisterModalOpen, openRegisterModal, signIn } = useContext(
    SignInSignUpContext
  );
  const [formValues, setFormValues] = useState<ILogin>({
    email: '',
    password: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  async function validaLogin(formData) {
    try {
      const { email, password } = formData;
      const users = (await axios.get('http://localhost:3000/api/users'))?.data;
      for (let user of users) {
        if (user.email === email && user.password === password) {
          //set user on session
          return true;
        }
      }
      return false;
    } catch (err) {
      console.log(err);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const loginValid = await validaLogin(data);
    console.log(loginValid);
    if (loginValid) {
      signIn();
    } else {
      alert('Email ou senha incorretos!');
    }
    console.log('handleSubmit', data);
  };

  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Log In | facebookson</title>
        </Head>
        <section className={styles.contentContainer}>
          <div className={styles.contentLeft}>
            <h1>facebookson</h1>
            <p>
              O Facebookson ajuda você a melhorar a sua saúde ao lembrá-lo de
              fazer pequenas pausas para relaxar durante a sua jornada de
              trabalho.
            </p>
          </div>

          <div className={styles.contentRight}>
            <div className={styles.signInSignUpContainer}>
              <form className={styles.formLogin} onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Email"
                  name="email"
                  onChange={handleInputChange}
                  value={formValues.email || ''}
                />
                <input
                  type="password"
                  placeholder="Senha"
                  name="password"
                  onChange={handleInputChange}
                  value={formValues.password || ''}
                />
                <button type="submit" className={styles.loginBtn} accessKey="l">
                  Entrar
                </button>
              </form>
              <a href="#" className={styles.forgottenPass} accessKey="p">
                Esqueceu a senha?
              </a>
              <div className={styles.signUp}>
                <button
                  className={styles.signUpBtn}
                  accessKey="n"
                  onClick={openRegisterModal}
                >
                  Criar nova conta
                </button>
              </div>
            </div>

            <p>
              Tudo em excesso faz mal. Até mesmo algo tão maravilhoso quanto
              programar!
            </p>
          </div>
        </section>
      </div>
      {isRegisterModalOpen && <RegisterModal />}
    </>
  );
}

export default Login;
