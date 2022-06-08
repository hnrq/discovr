import { Component, useContext } from 'solid-js';

import { Routes, Route } from 'solid-app-router';

import { ThemeContext } from 'context/theme';
import Home from 'pages/Home';
import Similar from 'pages/Similar';

import 'theme/index.scss';
import './App.scss';

const App: Component = () => {
  const [theme, setTheme] = useContext(ThemeContext);

  return (
    <div class="app container-sm">
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
        <Route path="/similar" component={Similar} />
      </Routes>
    </div>
  );
};

export default App;
