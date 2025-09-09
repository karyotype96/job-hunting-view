import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'semantic-ui-css/semantic.min.css';
import App from './App.tsx'
import { RootStore } from './stores/root-store.ts'

const rootStore = new RootStore();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App rootStore={rootStore}/>
  </StrictMode>
)