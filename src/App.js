import React from 'react';
import { Provider} from 'react-redux';
import TicketList from './Components/TicketsList';
import EditTicket from './Components/EditTicket';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './Styles/theme';
import store from './Store';
import styled from '@material-ui/styles/styled';
import MuiGrid from '@material-ui/core/Grid';
import {
  compose as composeStyles,
  palette,
  sizing,
  spacing,
} from '@material-ui/system';
const Grid = styled(MuiGrid)(composeStyles(spacing, palette, sizing));

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Switch>
            <Grid container px={5}>
              <Route exact path="/" component={TicketList} />
              <Route exact path="/ticket/:id" component={EditTicket} />
            </Grid>
          </Switch>
        </Router>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
