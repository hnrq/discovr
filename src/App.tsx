import {
  Component,
  createSignal,
  createResource,
  createEffect,
} from 'solid-js';

import { debounce } from '@solid-primitives/scheduled';

import fetchSongs, { Song } from 'api/fetchSongs';
import Vinyl from 'assets/common/vinyl.svg';
import Autocomplete from 'components/Autocomplete';
import ListItem from 'components/ListItem';
import themeState from 'store/theme';
import 'theme/index.scss';

const App: Component = () => {
  const [theme, setTheme] = themeState;
  const [query, setQuery] = createSignal('');
  const [debouncedQuery, setDebouncedQuery] = createSignal('');
  const trigger = debounce((value: string) => setDebouncedQuery(value), 250);
  const [songs] = createResource<Song[], string>(
    debouncedQuery,
    async (q: string) => (q ? fetchSongs(q) : []),
    { initialValue: [] }
  );

  createEffect(() => {
    trigger(query());
  });

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
      <Vinyl />
      <h1 class="header mb-0">
        TIRED OF HEARING THE SAME <mark>S***</mark>?
      </h1>
      <p class="subtitle mt-1">We got your back. Just search for a song</p>
      <Autocomplete
        placeholder="Search for a song..."
        items={songs}
        class="mt-4"
        query={query}
        setQuery={setQuery}
        renderItem={(song: Song) => {
          console.log(song.image);
          return (
            <ListItem
              imageUrl={song.image[0]['#text']}
              title={song.name}
              subtitle={song.artist}
            />
          );
        }}
        autoFocus
      />
    </div>
  );
};

export default App;
