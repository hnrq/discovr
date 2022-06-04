export default interface Track {
  name: string;
  artist: string;
  url: string;
  streamable: number;
  listeners: number;
  image: { '#text': string }[];
}
