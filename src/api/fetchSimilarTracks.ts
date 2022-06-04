import Track from 'types/track';

export interface TrackInput {
  track: string;
  artist: string;
}

const fetchSimilarTracks = async (args: TrackInput): Promise<Track[]> => {
  try {
    const response = await (
      await fetch(
        '/api/?' +
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

    return response.results.trackmatches.track;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default fetchSimilarTracks;
