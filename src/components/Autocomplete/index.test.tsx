import { createResource, createSignal } from 'solid-js';

import { render, fireEvent } from 'solid-testing-library';

import Autocomplete, { AutocompleteProps } from '.';

const renderAutocomplete = (props: Partial<AutocompleteProps>) => {
  const [query, setQuery] = createSignal('');
  const [items] = createResource(() => ['item 1', 'item 2']);

  return render(() => (
    <Autocomplete
      query={query}
      setQuery={setQuery}
      placeholder="Search..."
      items={items}
      renderItem={(item: string) => <div>{item}</div>}
      {...props}
    />
  ));
};

describe('<Autocomplete />', () => {
  it('calls setQuery when typing in the input', () => {
    const setQuery = jest.fn();
    const placeholder = 'Search...';
    const value = 'hello';
    const { getByPlaceholderText } = renderAutocomplete({
      setQuery,
      placeholder,
    });
    const input = getByPlaceholderText(placeholder) as HTMLInputElement;
    input.value = value;
    fireEvent.keyUp(input);

    expect(setQuery).toHaveBeenCalledWith(value);
  });

  it('renders the items if there is any and the input is focused', () => {
    const placeholder = 'Search...';
    const itemsResponse = ['1', '2'];
    const [items] = createResource(() => itemsResponse);
    const { getByPlaceholderText, getByText } = renderAutocomplete({
      items,
      placeholder,
    });

    fireEvent.focus(getByPlaceholderText(placeholder) as HTMLInputElement);

    itemsResponse.forEach((item) => {
      expect(getByText(item)).toBeInTheDocument();
    });
  });

  it('hides the dropdown if the input is blurred', () => {
    const placeholder = 'Search...';
    const itemsResponse = ['1', '2'];
    const [items] = createResource(() => itemsResponse);
    const { queryByText } = renderAutocomplete({
      items,
      placeholder,
    });

    itemsResponse.forEach((item) =>
      expect(queryByText(item)).not.toBeInTheDocument()
    );
  });

  it('receives a custom renderItem function', async () => {
    const placeholder = 'Search...';
    const itemsResponse = ['1', '2'];
    const [items] = createResource(() => itemsResponse);
    const { findAllByTestId } = renderAutocomplete({
      items,
      placeholder,
      autoFocus: true,
      renderItem: (item: string) => <div data-testid="custom-item">{item}</div>,
    });

    await expect(await findAllByTestId('custom-item')).toHaveLength(2);
  });

  it('adds CSS classes to root element if className is provided', () => {
    const className = 'test-class';
    const { getByTestId } = renderAutocomplete({ class: className });

    expect(getByTestId('autocomplete')).toHaveClass(className);
  });
});
