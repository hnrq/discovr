import { render, fireEvent } from 'solid-testing-library';

import ListItem, { ListItemProps } from '.';

const renderListItem = (props: Partial<ListItemProps>) =>
  render(() => <ListItem title="" subtitle="" {...props} />);

describe('<ListItem />', () => {
  it('renders a title', () => {
    const title = 'Title';
    const { getByText } = renderListItem({ title });

    expect(getByText(title)).toBeInTheDocument();
  });

  it('renders a subtitle', () => {
    const subtitle = 'subtitle';
    const { getByText } = renderListItem({ subtitle });

    expect(getByText(subtitle)).toBeInTheDocument();
  });

  it('renders an image when imageUrl is provided', () => {
    const imageUrl = 'https://image.com';
    const { getByRole } = renderListItem({ imageUrl });

    expect(getByRole('img')).toHaveProperty('src', `${imageUrl}/`);
  });

  it('calls onClick when clicked', () => {
    const onClick = vitest.fn();
    const { getByTestId } = renderListItem({ onClick });

    fireEvent.click(getByTestId('list-item') as HTMLDivElement);

    expect(onClick).toHaveBeenCalled();
  });

  it('adds CSS classes to root element if className is provided', () => {
    const className = 'test-class';
    const { getByTestId } = renderListItem({ class: className });

    expect(getByTestId('list-item')).toHaveClass(className);
  });
});
