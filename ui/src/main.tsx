import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'semantic-ui-css/semantic.min.css';
import App from './App.tsx'
import { Provider } from 'mobx-react';
import { RecordStore } from './stores/record-store.ts';

const stores = {
  recordStore: new RecordStore(),
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider {...stores}>
      <App />
    </Provider>
  </StrictMode>
)