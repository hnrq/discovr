import {
  Component,
  createSignal,
  createResource,
  createEffect,
  createMemo,
  on,
  useContext,
} from 'solid-js';

import { debounce } from '@solid-primitives/scheduled';
import { useNavigate } from 'solid-app-router';

import fetchSongs, { Song } from 'api/fetchSongs';
import Vinyl from 'assets/common/vinyl.svg';
import Autocomplete from 'components/Autocomplete';
import ListItem from 'components/ListItem';
import { ThemeContext } from 'context/theme';

import 'theme/index.scss';

const Home: Component = () => {
  const [theme, setTheme] = useContext(ThemeContext);
  const [query, setQuery] = createSignal('');
  const [debouncedQuery, setDebouncedQuery] = createSignal('');
  const trigger = debounce((value: string) => setDebouncedQuery(value), 250);
  const navigate = useNavigate();
  const [page, setPage] = createSignal(1);
  const queryParams = createMemo(() => ({
    query: debouncedQuery(),
    page: page(),
  }));

  const [songs, { mutate }] = createResource<
    Song[],
    { query: string; page: number }
  >(
    queryParams,
    async (args, { value }) =>
      args.query ? [...value, ...(await fetchSongs(args))] : [],
    { initialValue: [] }
  );

  createEffect(() => trigger(query()));

  createEffect(
    on(debouncedQuery, () => {
      setPage(1);
      mutate([]);
    })
  );

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
        infiniteScroll={{
          threshold: 0.9,
          onLoadMore: () => setPage((currentPage) => currentPage + 1),
        }}
        renderItem={(song: Song) => (
          <ListItem
            imageUrl={song.image[0]['#text']}
            title={song.name}
            subtitle={song.artist}
            onClick={() => {
              navigate(
                `/similar?${new URLSearchParams({
                  track: song.name,
                  artist: song.artist,
                })}`
              );
            }}
          />
        )}
        autoFocus
      />
    </div>
  );
};

export default Home;
