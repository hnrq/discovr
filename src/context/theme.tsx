import {
  createSignal,
  createRenderEffect,
  createEffect,
  createContext,
  ParentProps,
  Component,
  Signal,
} from 'solid-js';

type Theme = 'light' | 'dark';

export const ThemeContext = createContext<Signal<Theme> | undefined>();

export const ThemeProvider: Component<ParentProps<unknown>> = (props) => {
  const [theme, setTheme] = createSignal<Theme>();

  createRenderEffect(() => {
    const initialValue = (localStorage.getItem('theme') as Theme) ?? 'light';
    setTheme(initialValue);
  });

  createEffect(() => {
    localStorage.setItem('theme', theme());
  });

  createRenderEffect(() => {
    document.documentElement.className = theme();
  });

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      {props.children}
    </ThemeContext.Provider>
  );
};
