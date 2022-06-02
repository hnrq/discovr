import { createSignal, createEffect, Signal } from 'solid-js';

type Theme = 'light' | 'dark';

const [theme, setTheme] = createSignal<Theme>(
  (localStorage.getItem('theme') as Theme) ?? 'light'
);
createEffect(() => {
  localStorage.setItem('theme', theme());
  document.documentElement.className = theme();
});

export default [theme, setTheme] as Signal<Theme>;
