import { gsap } from 'gsap';
import * as router from 'solid-app-router';
import { render, waitFor } from 'solid-testing-library';

import mockSimilarTracks from '__mocks__/similarTracks';
import * as fetchSimilarTracks from 'api/fetchSimilarTracks';

import Similar from '.';

const renderSimilar = (search: { track: string; artist: string }) => {
  vitest.spyOn(router, 'useSearchParams').mockReturnValue([search, () => null]);
  return render(() => (
    <router.Router>
      <Similar />
    </router.Router>
  ));
};

describe('<Similar />', () => {
  beforeEach(() => {
    vitest
      .spyOn(gsap, 'from')
      .mockImplementation(vitest.fn() as () => Promise<GSAPTween>);
    vitest
      .spyOn(gsap, 'to')
      .mockImplementation(vitest.fn() as () => Promise<GSAPTween>);
  });

  describe('Track or artist not provided or wrong', () => {
    it('renders a "Track not found" message if API returns 404', async () => {
      vitest
        .spyOn(fetchSimilarTracks, 'default')
        .mockRejectedValueOnce(new Error('Track not found'));
      const { findByText } = renderSimilar({
        track: 'hdsauidhas',
        artist: 'hdsduhsd',
      });

      expect(await findByText('Track not found')).toBeInTheDocument();
    });

    it('renders a "Track name and artist must be provided!" message if one of them is empty', () => {
      const { getByText } = renderSimilar({ track: '', artist: '' });

      expect(getByText('Track name and artist must be provided!')).toBeTruthy();
    });
  });

  describe('Track and artist provided', () => {
    beforeEach(() => {
      vitest
        .spyOn(fetchSimilarTracks, 'default')
        .mockResolvedValue(mockSimilarTracks);
    });

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
      const spy = vitest
        .spyOn(fetchSimilarTracks, 'default')
        .mockResolvedValue(mockSimilarTracks);
      const search = { track: 'Alone Again', artist: "Gilbert O' Sullivan" };
      renderSimilar(search);

      waitFor(() => {
        expect(spy).toHaveBeenCalledWith(search);
      });
    });

    it('renders 10 similar Tracks', async () => {
      const search = { track: 'Alone Again', artist: "Gilbert O' Sullivan" };
      const { findByText } = renderSimilar(search);

      for (const track of mockSimilarTracks) {
        expect(await findByText(track.name)).toBeInTheDocument();
      }
    });
  });
});
