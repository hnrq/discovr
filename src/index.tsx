/* @refresh reload */
import { Router } from 'solid-app-router';
import { render } from 'solid-js/web';

import { ThemeProvider } from 'context/theme';

import App from './App';

render(
  () => (
    <Router>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Router>
  ),
  document.getElementById('root') as HTMLElement
);
