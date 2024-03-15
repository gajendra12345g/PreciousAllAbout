// index.js - WEB
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import registerServiceWorker from '../../components/src/registerServiceWorker';
import { OnlineStatusProvider,OnlineStatusContext } from '../../components/src/DesignSystem/OnlineStatusProvider/OnlineStatusProvider.web';
import ErrorPage from "../../components/src/DesignSystem/ErrorPage/ErrorPage.web"

ReactDOM.render(
    <OnlineStatusProvider>
      <Router>
        <OnlineStatusContext.Consumer>
          {online => online ? <App /> : <ErrorPage/>}
        </OnlineStatusContext.Consumer>
      </Router>
    </OnlineStatusProvider>,
  document.getElementById('root')
);
registerServiceWorker();
