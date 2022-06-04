import { render } from 'solid-testing-library';

import Track, { TrackProps } from '.';

const renderTrack = (props: Partial<TrackProps>) =>
  render(() => (
    <Track
      name="I Miss You"
      artist="Blink-182"
      image="https://image.com"
      url="https://last.fm/Track"
      {...props}
    />
  ));

describe('<Track />', () => {
  describe('Track name', () => {
    it('renders the Track name', () => {
      const name = 'The Other Line';
      const { getByText } = renderTrack({ name });

      expect(getByText(name)).toBeInTheDocument();
    });

    it('renders a link to the Track in Last.fm', () => {
      const url = 'https://last.fm/the-other-line';
      const name = 'The Other Line';
      const { getByText } = renderTrack({ url, name });

      expect(getByText(name)).toHaveProperty(
        'href',
        expect.stringContaining(url)
      );
    });
  });

  it('renders the artist', () => {
    const artist = 'Chunk! No, Captain Chunk!';
    const { getByText } = renderTrack({ artist });

    expect(getByText(artist)).toBeInTheDocument();
  });

  it('renders the album cover', () => {
    const image = 'https://image.com/captainchunk-otherline.jpg';
    const { getByRole } = renderTrack({ image });

    expect(getByRole('img')).toHaveProperty(
      'src',
      expect.stringContaining(image)
    );
  });
});
