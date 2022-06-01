import { Component, createSignal, createEffect } from 'solid-js';
import Autocomplete from 'components/Autocomplete';
import themeState from 'state/theme';
import Vinyl from 'assets/common/vinyl.svg';
import 'theme/index.scss';

const App: Component = () => {
  const [theme, setTheme] = themeState;
  const [query, setQuery] = createSignal('');

  return (
    <div class="container-sm" style={{ 'text-align': 'center' }}>
      <button
        class="icon-button"
        style={{ 'margin-left': 'auto' }}
        onClick={() =>
          setTheme((theme) => (theme === 'light' ? 'dark' : 'light'))
        }
      >
        <span class="material-symbols-outlined">
          {theme() === 'light' ? 'light_mode' : 'dark_mode'}
        </span>
      </button>
      <Vinyl />
      <h1 class="header">
        TIRED OF HEARING THE SAME <mark>S***</mark>?
      </h1>
      <p>We got your back. Just search for a song</p>
      <Autocomplete items={[]} query={query} setQuery={setQuery} autoFocus />
    </div>
  );
};

export default App;
