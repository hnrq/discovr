import { Component } from 'solid-js';

import { Routes, Route } from 'solid-app-router';

import Home from 'pages/Home';

const App: Component = () => (
  <Routes>
    <Route path="/" component={Home} />
  </Routes>
);

export default App;
