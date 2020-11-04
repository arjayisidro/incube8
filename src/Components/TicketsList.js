import React, { useState, useEffect } from 'react';
import CardTicket from './CardTicket';
import { Form, Formik, Field } from 'formik';
import { connect } from 'react-redux';
import styled from '@material-ui/styles/styled';
import {
  TextField,
  Typography,
  Button,
  Paper,
  Backdrop,
  CircularProgress,
} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MuiGrid from '@material-ui/core/Grid';
import {
  compose as composeStyles,
  palette,
  sizing,
  spacing,
} from '@material-ui/system';
import Styles from './TicketsList.style';
import { onTicketMove } from '../Utils/utility';
import { PENDING, DONE, CLOSE, TIMER_IN_SECS } from './constants';

const Grid = styled(MuiGrid)(composeStyles(spacing, palette, sizing));

const TicketList = ({ tickets, addTicket, updateTicket }) => {
  const classes = Styles();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSubmit = (values) => {
    setIsLoading(true);
    if (values.ticket) {
      setIsError(false);
      return new Promise((resolve) => {
        setTimeout(() => {
          addTicket({
            id: tickets.length,
            description: values.ticket,
            status: PENDING,
          });
          setIsLoading(false);
        }, 1000);
      });
    } else {
      setIsLoading(false);
      setIsError(true);
    }
  };

  useEffect(() => {
    let timer = setTimeout(() => {
      tickets.map((ticket) => {
        if (ticket.status === DONE) {
          onTicketMove(ticket, CLOSE, updateTicket, setIsLoading, false);
        }
      });
    }, TIMER_IN_SECS);
    return () => {
      clearTimeout(timer);
    };
  }, [tickets]);

  return (
    <Grid container px={5}>
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid item lg={12} md={12} pt={4} sm={12}>
        <Typography variant="h3" align="center">
          Ticket List
        </Typography>
      </Grid>
      <Grid item md={12} lg={12} py={4} sm={12} className={classes.fullWidth}>
        <Formik
          initialValues={{ ticket: '' }}
          onSubmit={(values, { resetForm }) => {
            handleSubmit(values);
            resetForm();
          }}
        >
          <Form>
            <Grid item lg={3}>
              <Field
                render={({ field }) => (
                  <TextField
                    error={isError}
                    helperText={isError && 'This is mandatory'}
                    size="small"
                    variant="outlined"
                    label="Add Ticket"
                    fullWidth
                    {...field}
                  />
                )}
                name="ticket"
              />
            </Grid>
            <Grid item lg={3} pt={1}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                color="primary"
                fullWidth
                endIcon={<SaveIcon />}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Typography variant="body1">...</Typography>
                ) : (
                  <Typography variant="body1">Add Ticket</Typography>
                )}
              </Button>
            </Grid>
          </Form>
        </Formik>
      </Grid>
      <Grid item md={4} lg={4} sm={12} className={classes.fullWidth}>
        <Paper className={classes.paperStyleInProgress}>
          <Grid py={2}>
            <Typography variant="h4" align="center">
              In Progress
            </Typography>
          </Grid>
          <CardTicket
            setIsLoading={setIsLoading}
            tickets={tickets}
            updateTicket={updateTicket}
            ticketStatus={PENDING}
          />
        </Paper>
      </Grid>
      <Grid
        item
        md={4}
        lg={4}
        sm={12}
        pr={isSmall ? 0 : 2}
        py={isSmall && 1}
        className={classes.fullWidth}
      >
        <Paper className={classes.paperStyleDone}>
          <Grid py={2}>
            <Typography variant="h4" align="center">
              Done
            </Typography>
          </Grid>
          <CardTicket
            setIsLoading={setIsLoading}
            tickets={tickets}
            updateTicket={updateTicket}
            ticketStatus={DONE}
          />
        </Paper>
      </Grid>
      <Grid item md={4} lg={4} sm={12} className={classes.fullWidth}>
        <Paper className={classes.paperStyleClose}>
          <Grid py={2}>
            <Typography variant="h4" align="center">
              Close
            </Typography>
          </Grid>
          <CardTicket
            setIsLoading={setIsLoading}
            tickets={tickets}
            updateTicket={updateTicket}
            ticketStatus={CLOSE}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

const mapState = (state) => ({
  tickets: state.tickets,
});

const mapDispatch = (dispatch) => ({
  addTicket: (ticket) => dispatch.tickets.addTicket(ticket),
  removeTicket: ({ id }) => dispatch.tickets.removeTicket({ id }),
  updateTicket: (ticket) => dispatch.tickets.updateTicket(ticket),
});

export default connect(mapState, mapDispatch)(TicketList);
