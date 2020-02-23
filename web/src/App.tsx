import React from 'react';
import Navbar from './components/layout/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Dashboard from './components/layout/Dashboard';
import Home from './components/layout/Home';
import { Container } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: '#F0B37D'
    },
    primary: {
      main: '#F0B37D'
    }
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: ['"Lato"', 'sans-serif'].join(',')
  }
});

function App() {
  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
        <Router>
          <Navbar />
          <Container maxWidth='md'>
            <Switch>
              <Route exact path='/' component={Home}></Route>
              <Route exact path='/dashboard' component={Dashboard}></Route>
            </Switch>
          </Container>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
