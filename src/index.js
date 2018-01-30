import React from 'react';
import ReactDOM from 'react-dom';
// Styles
import './styles/index.css';
import './styles/chart.css';
import './styles/table.css';
import './styles/champions.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
