export interface Song {
  name: string;
  artist: string;
  url: string;
  streamable: number;
  listeners: number;
  image: string;
}

const fetchSongs = async (query: string): Promise<Song[]> => {
  try {
    const response = await (
      await fetch(
        '/api/?' +
          new URLSearchParams({
            method: 'track.search',
            track: query,
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

export default fetchSongs;
