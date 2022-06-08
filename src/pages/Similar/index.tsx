import {
  Component,
  createResource,
  For,
  Show,
  Suspense,
  createEffect,
  ErrorBoundary,
} from 'solid-js';

import { gsap } from 'gsap';
import { useSearchParams } from 'solid-app-router';

import fetchSimilarTracks from 'api/fetchSimilarTracks';
import Spinner from 'components/Spinner';
import Track from 'components/Track';
import SimilarTrack from 'types/similarTrack';

import './index.scss';

interface Params {
  track?: string;
  artist?: string;
}

const ErrorMessage: Component<{ message: string }> = (props) => (
  <div class="error">
    <h3>{props.message}</h3>
  </div>
);

const Tracks: Component<Params> = (props) => {
  let tracksRef;
  const [tracks] = createResource<SimilarTrack[], Params>(
    props,
    fetchSimilarTracks,
    { initialValue: [] }
  );

  createEffect(() => {
    const q = gsap.utils.selector(tracksRef);
    if (tracks().length > 0)
      gsap.from(q('.track'), {
        opacity: 0,
        duration: 1,
        delay: 1,
        stagger: 0.2,
      });
  });

  return (
    <div class="tracks" ref={tracksRef}>
      <For each={tracks()}>
        {(track) => (
          <Track
            name={track.name}
            artist={track.artist.name}
            image={track.image[2]['#text']}
            url={track.url}
          />
        )}
      </For>
    </div>
  );
};

const Similar: Component<unknown> = () => {
  const [params] = useSearchParams();

  const transition = (element: Element) => {
    gsap.from(element, { opacity: 0, duration: 1, delay: 0.2 });
  };

  return (
    <div class="similar-page">
      <Show
        when={params.track && params.artist}
        fallback={
          <ErrorMessage message="Track name and artist must be provided!" />
        }
      >
        <h2 use:transition>
          Tracks similar to <b>{params.track}</b>, by <b>{params.artist}</b>
        </h2>
        <Suspense
          fallback={
            <div class="spinner">
              <Spinner />
            </div>
          }
        >
          <ErrorBoundary fallback={<ErrorMessage message="Track not found" />}>
            <Tracks track={params.track} artist={params.artist} />
          </ErrorBoundary>
        </Suspense>
      </Show>
    </div>
  );
};

export default Similar;
