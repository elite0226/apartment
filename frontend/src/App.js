import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { ConfirmProvider } from 'material-ui-confirm';

import configureStore, { history } from './store';
import Routes from './routes';

const store = configureStore();

function App () {
  return (
    <>
      <Provider store={store}>
        <ConfirmProvider>
          <ConnectedRouter history={history}>
            <Routes />
          </ConnectedRouter>
        </ConfirmProvider>
      </Provider>
    </>
  );
}

export default App;
