import { BrowserRouter } from 'react-router-dom';
import Routes from './routes/router.routes';
import Providers from './components/StoreProvider/Providers';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <Providers>
        <Routes />
        <ToastContainer />
      </Providers>
    </BrowserRouter>
  );
}

export default App;
