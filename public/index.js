import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
// AppContainer is a necessary wrapper component for HMR
import RenderForcer from './components/app';

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component/>
    </AppContainer>,
    document.getElementById('app')
  );
};

render(RenderForcer);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/app', () => {
    render(RenderForcer)
  });
}
