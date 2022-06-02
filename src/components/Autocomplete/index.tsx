import {
  Accessor,
  Component,
  For,
  Setter,
  Show,
  createSignal,
  JSX,
  mergeProps,
  Resource,
} from 'solid-js';

import classNames from 'classnames';

import './index.scss';

export interface AutocompleteProps {
  query: Accessor<string>;
  setQuery: Setter<string>;
  items: Resource<unknown[]>;
  autoFocus?: boolean;
  class?: string;
  renderItem?: (item: unknown) => JSX.Element;
  placeholder?: string;
}

const Autocomplete: Component<AutocompleteProps> = (_props) => {
  const props = mergeProps({ autoFocus: false, placeholder: '' }, _props);
  // eslint-disable-next-line solid/reactivity
  const [focused, setFocused] = createSignal(props.autoFocus);

  return (
    <div
      data-testid="autocomplete"
      class={classNames('autocomplete', props.class)}
    >
      <div class="input">
        <span class="material-symbols-outlined">search</span>
        <input
          value={props.query()}
          onKeyUp={(e) => props.setQuery(e.currentTarget.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          autocomplete="false"
          autofocus={props.autoFocus}
          placeholder={props.placeholder}
        />
      </div>
      <Show when={props?.items()?.length > 0 && focused()}>
        <div class="dropdown mt-2">
          <For each={props.items()}>{props.renderItem}</For>
        </div>
      </Show>
    </div>
  );
};

export default Autocomplete;
