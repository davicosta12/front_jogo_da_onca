import NavigationRoutes from './routes';
import { ToastContainer } from 'react-toastify';
import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  return (
    <div className='my-app'>
      <NavigationRoutes />
      <ToastContainer />
    </div>
  );
}

export default App;
