import {
  Component,
  createSignal,
  createResource,
  createEffect,
  createMemo,
  on,
} from 'solid-js';

import { debounce } from '@solid-primitives/scheduled';
import { gsap } from 'gsap';
import { useNavigate } from 'solid-app-router';

import fetchTracks from 'api/fetchTracks';
import Vinyl from 'assets/common/vinyl.svg';
import Autocomplete from 'components/Autocomplete';
import ListItem from 'components/ListItem';
import Track from 'types/track';

import './index.scss';

declare module 'solid-js' {
  namespace JSX {
    interface Directives {
      transition: unknown;
    }
  }
}

const Home: Component = () => {
  const [query, setQuery] = createSignal('');
  const [debouncedQuery, setDebouncedQuery] = createSignal('');
  const trigger = debounce((value: string) => setDebouncedQuery(value), 250);
  const navigate = useNavigate();
  const [page, setPage] = createSignal(1);
  const queryParams = createMemo(() => ({
    query: debouncedQuery(),
    page: page(),
  }));

  const [tracks, { mutate }] = createResource<
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
      delay: 0.5,
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
    <div class="home" use:transition>
      <Vinyl />
      <h1 class="header mb-0">
        TIRED OF HEARING THE SAME <mark>S***</mark>?
      </h1>
      <p class="subtitle mt-1">We got your back. Just search for a Track</p>
      <div>
        <Autocomplete
          placeholder="Search for a Track..."
          items={tracks}
          class="mt-4"
          query={query}
          setQuery={setQuery}
          infiniteScroll={{
            threshold: 0.9,
            onLoadMore: () => setPage((currentPage) => currentPage + 1),
          }}
          renderItem={(track: Track) => (
            <ListItem
              imageUrl={track.image[0]['#text']}
              title={track.name}
              subtitle={track.artist}
              onClick={() => {
                navigate(
                  `/similar?${new URLSearchParams({
                    track: track.name,
                    artist: track.artist,
                  })}`
                );
              }}
            />
          )}
          autoFocus
        />
      </div>
    </div>
  );
};

export default Home;
