import './globals.css';

import ReactDOM from 'react-dom/client';
import { Routes } from '@generouted/react-router';
import { AuthProvider } from './providers/auth.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <Routes />
  </AuthProvider>,
);
