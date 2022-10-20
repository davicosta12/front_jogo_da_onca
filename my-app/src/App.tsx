import NavigationRoutes from './routes';
import { ToastContainer } from 'react-toastify';
import { useReducer, createContext, Dispatch } from 'react';
import { ActionReducer, InitialState, initialState, reducer } from './Components/reducer/reducer';
import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'moment/locale/pt-br';

export const ThemeContext = createContext({} as { state: InitialState; dispatch: Dispatch<ActionReducer>; });

const App = () => {

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ThemeContext.Provider
      value={{
        state, dispatch
      }}>
      <div className='my-app'>
        <NavigationRoutes />
      </div>
      <ToastContainer />
    </ThemeContext.Provider>
  );
}

export default App;
