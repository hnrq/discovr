import { onCleanup } from 'solid-js';

interface InfiniteScrollProps {
  threshold: number;
  callback: () => void;
}

const infiniteScroll = (
  element: HTMLElement,
  { threshold, callback }: InfiniteScrollProps
) => {
  const handleScroll = () => {
    const scrollTop = element.scrollTop + element.offsetHeight;
    const scrollHeight = element.scrollHeight;

    if (scrollTop >= scrollHeight - threshold) callback();
  };

  element.addEventListener('scroll', handleScroll);

  onCleanup(() => {
    element.removeEventListener('scroll', handleScroll);
  });
};

export default infiniteScroll;
