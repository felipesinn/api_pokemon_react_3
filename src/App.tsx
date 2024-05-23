import { Provider as ReduxProvider } from 'react-redux';
import { RouterProvider } from 'react-router-dom'

import { store } from './store/store.redux'; 
import GlobalStyles from './globalstyles/GlobalStyles'; 
import { router } from './routes/Router'; 


export function App() {
  return (
    <ReduxProvider store={store}>
      <GlobalStyles />
      <RouterProvider router={router} />
    </ReduxProvider>
  );
}
