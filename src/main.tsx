import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { LanguageProvider } from './context/LanguageContext.tsx';
import { CMSProvider } from './context/CMSContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CMSProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </CMSProvider>
  </StrictMode>,
);
