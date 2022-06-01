import {
  Accessor,
  Component,
  For,
  Setter,
  Show,
  createSignal,
  JSX,
} from 'solid-js';
import { Store } from 'solid-js/store';

import './index.scss';

export interface AutocompleteProps {
  query: Accessor<string>;
  setQuery: Setter<string>;
  items?: Store<unknown[]>;
  autoFocus?: boolean;
  class?: string;
  renderItem?: (item: unknown) => JSX.Element;
  placeholder?: string;
}

const Autocomplete: Component<AutocompleteProps> = ({
  query,
  setQuery,
  class: className,
  autoFocus = false,
  items = [] as string[],
  renderItem = (item: unknown) => <li>{item.toString()}</li>,
  placeholder = '',
}) => {
  const [focused, setFocused] = createSignal(autoFocus);

  return (
    <div class={`autocomplete ${className}`}>
      <div class="input">
        <span class="material-symbols-outlined">search</span>
        <input
          value={query()}
          onKeyUp={(e) => setQuery(e.currentTarget.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          autocomplete="false"
          autofocus={autoFocus}
          placeholder={placeholder}
        />
      </div>
      <Show when={items.length > 0 && focused()}>
        <div class="dropdown">
          <For each={items}>{(item) => renderItem(item)}</For>
        </div>
      </Show>
    </div>
  );
};

export default Autocomplete;
