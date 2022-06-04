import Track from 'types/track';

export interface TrackInput {
  query: string;
  page: number;
}

const fetchTracks = async (args: TrackInput): Promise<Track[]> => {
  try {
    const response = await (
      await fetch(
        '/api/?' +
          new URLSearchParams({
            method: 'track.search',
            track: args.query,
            api_key: import.meta.env.VITE_API_KEY,
            format: 'json',
            limit: '10',
            page: args.page.toString(),
          })
      )
    ).json();

    return response.results.trackmatches.track;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default fetchTracks;
