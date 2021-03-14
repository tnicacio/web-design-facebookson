import '../styles/globals.css';
import { UserLoggedProvider } from '../contexts/UserLoggedContext';

function MyApp({ Component, pageProps }) {
  return (
    <UserLoggedProvider>
      <Component {...pageProps} />
    </UserLoggedProvider>
  );
}

export default MyApp;
