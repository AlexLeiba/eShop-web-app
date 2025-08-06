import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { store, persistor } from './store/store.ts';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import './i18n.ts';
import { AuthProvider } from './hooks/useAuthProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <StrictMode>
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </PersistGate>
    </StrictMode>
  </Provider>
);
