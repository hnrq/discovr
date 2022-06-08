/* eslint-disable solid/reactivity */
import {
  Accessor,
  Component,
  For,
  Setter,
  Show,
  JSX,
  mergeProps,
  Resource,
} from 'solid-js';

import { createViewportObserver } from '@solid-primitives/intersection-observer';
import classNames from 'classnames';

import Spinner from 'components/Spinner';

import './index.scss';

export interface AutocompleteProps {
  query: Accessor<string>;
  setQuery: Setter<string>;
  items: Resource<unknown[]>;
  autoFocus?: boolean;
  class?: string;
  renderItem?: (item: unknown) => JSX.Element;
  placeholder?: string;
  infiniteScroll?: {
    threshold: number;
    onLoadMore: () => void;
  };
}

const Autocomplete: Component<AutocompleteProps> = (_props) => {
  const props = mergeProps({ autoFocus: false, placeholder: '' }, _props);
  const [observer] = createViewportObserver([], {
    threshold: props.infiniteScroll?.threshold ?? 1,
  });

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
          autocomplete="false"
          autofocus={props.autoFocus}
          placeholder={props.placeholder}
        />
      </div>
      <Show when={props.items()?.length > 0}>
        <div data-testid="dropdown" class="dropdown mt-2" use:observer>
          <For each={props.items()}>{props.renderItem}</For>
          <Show when={props.infiniteScroll !== undefined}>
            <div
              use:observer={(el) => {
                if (el.isIntersecting) props.infiniteScroll?.onLoadMore?.();
              }}
              class="py-2"
            >
              <Spinner />
            </div>
          </Show>
        </div>
      </Show>
    </div>
  );
};

export default Autocomplete;
