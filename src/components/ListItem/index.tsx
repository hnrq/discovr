import { Component, Show } from 'solid-js';

import classNames from 'classnames';

import './index.scss';

export interface ListItemProps {
  title: string;
  subtitle: string;
  imageUrl?: string;
  class?: string;
  onClick?: () => void;
}

const ListItem: Component<ListItemProps> = (props) => (
  <div
    class={classNames('list-item px-1', props.class)}
    data-testid="list-item"
    onClick={() => props.onClick?.()}
  >
    <Show when={props.imageUrl !== undefined}>
      <img src={props.imageUrl} alt="" class="my-2" />
    </Show>
    <div class="content ml-3">
      <span class="title">{props.title}</span>
      <span class="subtitle">{props.subtitle}</span>
    </div>
  </div>
);
export default ListItem;
