import { Component, Show } from 'solid-js';
import classNames from 'classnames';

export interface ListItemProps {
  title: string;
  subtitle: string;
  imageUrl?: string;
  class?: string;
  onClick?: () => void;
}

const ListItem: Component<ListItemProps> = ({
  title,
  subtitle,
  imageUrl,
  onClick = () => {},
  class: className,
}) => (
  <div
    class={classNames('list-item', className)}
    data-testid="list-item"
    onClick={onClick}
  >
    <Show when={imageUrl !== undefined}>
      <img src={imageUrl} alt="" />
    </Show>
    <div class="content">
      <p class="title">{title}</p>
      <p class="subtitle">{subtitle}</p>
    </div>
  </div>
);

export default ListItem;
