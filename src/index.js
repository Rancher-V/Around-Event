import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import {Header} from './components/Header'
import {Footer} from './components/Footer'


ReactDOM.render(<Header />, document.getElementById('head'));
ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<Footer />, document.getElementById('foot'));
registerServiceWorker();


