import { Component } from 'solid-js';

import './index.scss';

export interface TrackProps {
  name: string;
  artist: string;
  image: string;
  url: string;
}

const Track: Component<TrackProps> = (props) => (
  <a class="track" href={props.url} target="__blank">
    <img src={props.image} alt="" />
    <div class="track-info">
      <h5>{props.name}</h5>
      <span>{props.artist}</span>
    </div>
  </a>
);

export default Track;
