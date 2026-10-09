import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';

import { ThemeProvider,StyledEngineProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from "./theme"; // Import the custom theme
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <StyledEngineProvider injectFirst>
     <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Ensures consistent styling across browsers */}
      <App />
    </ThemeProvider>
    </StyledEngineProvider>
  </StrictMode>,
)
