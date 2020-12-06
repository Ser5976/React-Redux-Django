// frontend/src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import history from "./constants/history";


ReactDOM.render(
  <Router history={history}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
