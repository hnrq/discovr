import { Component } from 'solid-js';

export interface TrackProps {
  name: string;
  artist: string;
  image: string;
  url: string;
}

const Track: Component<TrackProps> = (props) => (
  <div class="track">
    <img src={props.image} alt="" />
    <div class="track-info">
      <a href={props.url}>{props.name}</a>
      <span>{props.artist}</span>
    </div>
  </div>
);

export default Track;
