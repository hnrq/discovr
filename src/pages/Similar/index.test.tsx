import { render, waitFor } from 'solid-testing-library';

import mockTracks from '__mocks__/tracks';
import * as fetchSimilarTracks from 'api/fetchSimilarTracks';

import Similar from '.';

const renderSimilar = (search: { track: string; artist: string }) => {
  global.location.search = `?${new URLSearchParams(search)}`;

  return render(() => <Similar />);
};

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockTracks),
  })
) as jest.Mock;

describe('<Similar />', () => {
  describe('Track or artist not provided or wrong', () => {
    it('renders a "Track not found!" message if API returns 404', () => {
      jest
        .spyOn(fetchSimilarTracks, 'default')
        .mockRejectedValue({ status: 404 });
      const { getByText } = renderSimilar({
        track: 'hdsauidhas',
        artist: 'hdsduhsd',
      });

      expect(getByText('Track not found')).toBeTruthy();
    });

    it('renders a "Track and artist must be provided" message if one of them is empty', () => {
      const { getByText } = renderSimilar({ track: '', artist: '' });

      expect(getByText('Track and artist must be provided')).toBeTruthy();
    });
  });

  describe('Track and artist provided', () => {
    it('renders Track name based on the search param provided', () => {
      const search = { track: 'Alone Again', artist: "Gilbert O' Sullivan" };
      const { getByText } = renderSimilar(search);

      expect(getByText(search.track)).toBeInTheDocument();
    });

    it('renders the artist name', () => {
      const search = { track: 'Alone Again', artist: "Gilbert O' Sullivan" };
      const { getByText } = renderSimilar(search);

      expect(getByText(search.artist)).toBeInTheDocument();
    });

    it('calls fetchSimilarTracks with the track name and artist name', async () => {
      const spy = jest.spyOn(fetchSimilarTracks, 'default');
      const search = { track: 'Alone Again', artist: "Gilbert O' Sullivan" };
      renderSimilar(search);

      waitFor(() => {
        expect(spy).toHaveBeenCalledWith(search);
      });
    });

    it('renders 10 similar Tracks', async () => {
      const search = { track: 'Alone Again', artist: "Gilbert O' Sullivan" };
      const { getByText } = renderSimilar(search);

      waitFor(() => {
        mockTracks.forEach((track) => {
          expect(getByText(track.name)).toBeInTheDocument();
        });
      });
    });
  });
});
