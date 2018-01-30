import React, { Component } from 'react';
// Fonts
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
// Libs
import { ThemeProvider } from 'react-css-themr';
import theme from './theme/theme';
import './theme/theme.css';
// Components
import Champions from './views/champions';

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Champions />
      </ThemeProvider>
    );
  }
}

export default App;
