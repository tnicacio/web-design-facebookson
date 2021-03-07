import Head from 'next/head';
import styles from '../../styles/pages/Login.module.css';
import { useContext } from 'react';
import { SignInSignUpContext } from '../../contexts/SignInSignUpContext';

export function Login() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const { openRegisterModal } = useContext(SignInSignUpContext);

  console.log(openRegisterModal);
  return (
    <div className={styles.container}>
      <Head>
        <title>Login | facebookson</title>
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
          <form className={styles.formLogin} onSubmit={handleSubmit}>
            <input type="text" placeholder="Email ou telefone" />
            <input type="password" placeholder="Senha" />
            <a href="/api/login" className={styles.loginBtn} accessKey="l">
              Entrar
            </a>
            <a href="#" className={styles.forgottenPass} accessKey="p">
              Esqueceu a senha?
            </a>
            <div className={styles.signUp}>
              <a
                href="#"
                className={styles.signUpBtn}
                accessKey="n"
                onClick={openRegisterModal}
              >
                Criar nova conta
              </a>
            </div>
          </form>

          <p>
            Tudo em excesso faz mal. Até mesmo algo tão maravilhoso quanto
            programar!
          </p>
        </div>
      </section>
    </div>
  );
}
