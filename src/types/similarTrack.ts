import Track from './track';

export default interface SimilarTrack extends Omit<Track, 'artist'> {
  artist: {
    name: string;
    mbid: string;
    url: string;
  };
}
