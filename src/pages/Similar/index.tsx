import { Component, createResource, For, Show, Suspense } from 'solid-js';

import { useParams } from 'solid-app-router';

import fetchSimilarTracks from 'api/fetchSimilarTracks';
import Track from 'components/Track';
import TrackType from 'types/track';

interface Params {
  track?: string;
  artist?: string;
}

const Tracks: Component<Params> = (props) => {
  const [tracks] = createResource<TrackType[], Params>(
    props,
    async (args) =>
      fetchSimilarTracks({
        track: args.track,
        artist: args.artist,
      }),
    { initialValue: [] }
  );

  return (
    <div class="tracks">
      <For each={tracks()}>
        {(track) => (
          <Track
            name={track.name}
            artist={track.artist}
            image={track.image[0]['#text']}
            url={track.url}
          />
        )}
      </For>
    </div>
  );
};

const ErrorMessage: Component = () => (
  <div class="error">
    <h3>Track name and artist must be provided!</h3>
  </div>
);

const Similar: Component<unknown> = () => {
  const params: Params = useParams();

  return (
    <div class="similar-page">
      <Show when={params.track && params.artist} fallback={<ErrorMessage />}>
        <h2>
          Tracks similar to {params.track} by {params.artist}
        </h2>
        <Suspense fallback={<div>loading...</div>}>
          <Tracks track={params.track} artist={params.artist} />
        </Suspense>
      </Show>
    </div>
  );
};

export default Similar;
