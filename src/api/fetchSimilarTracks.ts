export interface Track {
  name: string;
  artist: string;
  url: string;
  streamable: number;
  listeners: number;
  image: string;
}

export interface TrackInput {
  trackName: string;
  artist: string;
  mbid: string;
}

const fetchSimilarTracks = async (args: TrackInput): Promise<Track[]> => {
  try {
    const response = await (
      await fetch(
        '/api/?' +
          new URLSearchParams({
            method: 'track.getsimilar',
            track: args.trackName,
            artist: args.artist,
            mbid: args.mbid,
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
