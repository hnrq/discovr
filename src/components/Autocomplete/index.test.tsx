import { createSignal } from 'solid-js';
import { render, fireEvent } from 'solid-testing-library';
import Autocomplete, { AutocompleteProps } from '.';

const renderAutocomplete = (props: Partial<AutocompleteProps>) => {
  const [query, setQuery] = createSignal('');
  return render(() => (
    <Autocomplete
      query={query}
      setQuery={setQuery}
      placeholder="Search..."
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
    const items = ['item 1', 'item 2'];
    const { getByPlaceholderText, getByText } = renderAutocomplete({
      items,
      placeholder,
    });

    fireEvent.focus(getByPlaceholderText(placeholder) as HTMLInputElement);

    items.forEach((item) => {
      expect(getByText(item)).toBeInTheDocument();
    });
  });

  it('hides the dropdown if the input is blurred', () => {
    const placeholder = 'Search...';
    const items = ['item 1', 'item 2'];
    const { queryByText } = renderAutocomplete({
      items,
      placeholder,
    });

    items.forEach((item) => expect(queryByText(item)).not.toBeInTheDocument());
  });

  it('receives a custom renderItem function', () => {
    const placeholder = 'Search...';
    const items = ['item 1', 'item 2'];
    const { getAllByTestId } = renderAutocomplete({
      items,
      placeholder,
      autoFocus: true,
      renderItem: (item: string) => (
        <div data-testid="custom-item">{item.toString()}</div>
      ),
    });

    expect(getAllByTestId('custom-item')).toHaveLength(2);
  });

  it('adds CSS classes to root element if className is provided', () => {
    const className = 'test-class';
    const { getByTestId } = renderAutocomplete({ class: className });

    expect(getByTestId('autocomplete')).toHaveClass(className);
  });
});
