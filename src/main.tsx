import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ru } from 'date-fns/locale';
import './index.css';
import { App } from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
      <App />
    </LocalizationProvider>
  </StrictMode>,
);
