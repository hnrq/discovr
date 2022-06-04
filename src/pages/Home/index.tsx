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
import { gsap } from 'gsap';
import { useNavigate } from 'solid-app-router';

import fetchTracks, { Track } from 'api/fetchTracks';
import Vinyl from 'assets/common/vinyl.svg';
import Autocomplete from 'components/Autocomplete';
import ListItem from 'components/ListItem';
import { ThemeContext } from 'context/theme';

import 'theme/index.scss';

declare module 'solid-js' {
  namespace JSX {
    interface Directives {
      transition: unknown;
    }
  }
}

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

  const [Tracks, { mutate }] = createResource<
    Track[],
    { query: string; page: number }
  >(
    queryParams,
    async (args, { value }) =>
      args.query ? [...value, ...(await fetchTracks(args))] : [],
    { initialValue: [] }
  );

  const transition = (element: Element) => {
    gsap.from(element.children, {
      delay: 0.2,
      opacity: 0,
      duration: 1,
      stagger: 1,
    });
  };

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
      <div class="content" use:transition>
        <h1 class="header mb-0">
          TIRED OF HEARING THE SAME <mark>S***</mark>?
        </h1>
        <p class="subtitle mt-1">We got your back. Just search for a Track</p>
        <div>
          <Autocomplete
            placeholder="Search for a Track..."
            items={Tracks}
            class="mt-4"
            query={query}
            setQuery={setQuery}
            infiniteScroll={{
              threshold: 0.9,
              onLoadMore: () => setPage((currentPage) => currentPage + 1),
            }}
            renderItem={(Track: Track) => (
              <ListItem
                imageUrl={Track.image[0]['#text']}
                title={Track.name}
                subtitle={Track.artist}
                onClick={() => {
                  navigate(
                    `/similar?${new URLSearchParams({
                      track: Track.name,
                      artist: Track.artist,
                    })}`
                  );
                }}
              />
            )}
            autoFocus
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
