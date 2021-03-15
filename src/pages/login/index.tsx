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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    const userObject: ILogin = {
      email: String(data?.email),
      password: String(data?.password),
    };

    try {
      const response = await axios.post('/api/signIn', userObject);
      const responseDatafromDb = response.data;

      if (responseDatafromDb._id) {
        signIn(responseDatafromDb);
      } else {
        alert(responseDatafromDb.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleForgottenPass = (event: React.MouseEvent) => {
    event.preventDefault();
    alert("Not implemented yet, sorry. You'll have to remeber");
  };

  const handleKeyUpForgottenPass = (event: React.KeyboardEvent) => {
    if (event.keyCode === 13) {
      //Enter
      document.getElementById('forgotten-pass')?.click();
    }
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
                  type="email"
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
              <a
                id="forgotten-pass"
                href="#"
                className={styles.forgottenPass}
                accessKey="p"
                onClick={handleForgottenPass}
                onKeyUp={handleKeyUpForgottenPass}
              >
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
