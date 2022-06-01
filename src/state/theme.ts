import { createSignal, createEffect } from "solid-js";

type Theme = "light" | "dark";

const themeState = createSignal<Theme>(
  (localStorage.getItem("theme") as Theme) ?? "light"
);
createEffect(() => {
  const [theme] = themeState;
  localStorage.setItem("theme", theme());
  document.documentElement.className = theme();
});

export default themeState;
