import SimilarTrack from 'types/similarTrack';

export interface TrackInput {
  track: string;
  artist: string;
}

const fetchSimilarTracks = async (
  args: TrackInput
): Promise<SimilarTrack[]> => {
  try {
    const response = await (
      await fetch(
        'http://ws.audioscrobbler.com/2.0/?' +
          new URLSearchParams({
            method: 'track.getsimilar',
            track: args.track,
            artist: args.artist,
            api_key: import.meta.env.VITE_API_KEY,
            format: 'json',
            limit: '10',
          })
      )
    ).json();
    if (response.error) {
      throw new Error(response.message);
    }

    return response.similartracks.track;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default fetchSimilarTracks;
