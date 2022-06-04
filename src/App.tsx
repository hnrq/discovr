import { Component, useContext } from 'solid-js';

import { Routes, Route } from 'solid-app-router';

import { ThemeContext } from 'context/theme';
import Home from 'pages/Home';
import Similar from 'pages/Similar';

const App: Component = () => {
  const [theme, setTheme] = useContext(ThemeContext);

  return (
    <div class="container-sm" style={{ 'text-align': 'center' }}>
      <button
        class="icon-button"
        style={{ 'margin-left': 'auto' }}
        onClick={() =>
          setTheme((currentTheme) =>
            currentTheme === 'light' ? 'dark' : 'light'
          )
        }
      >
        <span class="material-symbols-outlined">
          {theme() === 'light' ? 'light_mode' : 'dark_mode'}
        </span>
      </button>
      <Routes>
        <Route path="/" component={Home} />
        <Route path="/similar-tracks" component={Similar} />
      </Routes>
    </div>
  );
};

export default App;
