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
    <Grid container>
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid item lg={12} md={12} pt={4}>
        <Typography variant="h3" align="center">
          Ticket List
        </Typography>
      </Grid>
      <Grid item md={12} lg={12} py={4}>
        <Formik
          initialValues={{ ticket: '' }}
          onSubmit={(values, { resetForm }) => {
            handleSubmit(values);
            resetForm();
          }}
        >
          <Form>
            <Field
              render={({ field }) => (
                <TextField
                  error={isError}
                  helperText={isError && 'This is mandatory'}
                  size="small"
                  variant="outlined"
                  label="Add Ticket"
                  {...field}
                />
              )}
              name="ticket"
            />
            <Button
              className={classes.submitButtonStyle}
              type="submit"
              variant="contained"
              size="large"
              color="primary"
              endIcon={<SaveIcon />}
              disabled={isLoading}
            >
              {isLoading ? (
                <Typography variant="body1">...</Typography>
              ) : (
                <Typography variant="body1">Add Ticket</Typography>
              )}
            </Button>
          </Form>
        </Formik>
      </Grid>
      <Grid item md={4} lg={4}>
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
      <Grid item md={4} lg={4}>
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
      <Grid item md={4} lg={4}>
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
