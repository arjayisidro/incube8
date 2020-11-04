import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Formik, Field } from 'formik';
import SaveIcon from '@material-ui/icons/Save';
import { connect } from 'react-redux';
import styled from '@material-ui/styles/styled';
import MuiGrid from '@material-ui/core/Grid';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {
  compose as composeStyles,
  palette,
  sizing,
  spacing,
} from '@material-ui/system';
import Styles from './TicketsList.style';
import {
  Typography,
  TextField,
  Button,
  Paper,
  Backdrop,
  CircularProgress,
  MenuItem,
} from '@material-ui/core';
import { STATUS, DONE } from './constants';

const Grid = styled(MuiGrid)(composeStyles(spacing, palette, sizing));

const EditTicket = ({ updateTicket, location }) => {
  const history = useHistory();
  const [ticketValue, setTicketValue] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const classes = Styles();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    setTicketValue(location.state.ticket);
  }, [ticketValue]);

  const handleEditSubmit = (values) => {
    if (values.description) {
      setIsError(false);
      const newObj = {
        ...ticketValue,
        description: values.description,
        status: values.ticketStatus,
        isMoving: values.ticketStatus === DONE ? true : false,
      };
      setIsLoading(true);
      return new Promise((resolve) => {
        updateTicket(newObj);
        setTimeout(() => {
          history.push('/');
        }, 2000);
      });
    } else {
      setIsError(true);
    }
  };

  return (
    <Grid container direction="column" alignItems="center" justify="center">
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid item md={12} py={5} sm={12}>
        <Typography variant="h3">Edit Ticket</Typography>
      </Grid>
      <Paper className={classes.editPaperStyle}>
        <Grid item md={12} lg={12} sm={12}>
          <Formik
            enableReinitialize={true}
            initialValues={{
              description: ticketValue.description,
              ticketStatus: ticketValue.status || 'pending',
            }}
            onSubmit={(values) => {
              handleEditSubmit(values);
            }}
          >
            <Form>
              <Grid item xs={12} md={12} lg={12} pt={3}>
                <Field
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      error={isError}
                      helperText={isError && 'This is mandatory'}
                      size="small"
                      variant="outlined"
                      label="Description"
                      {...field}
                    />
                  )}
                  name="description"
                />
                <Grid pt={1}>
                  <Field
                    render={({ field }) => (
                      <TextField
                        select
                        fullWidth
                        size="small"
                        variant="outlined"
                        label="Status"
                        {...field}
                      >
                        {STATUS.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                    name="ticketStatus"
                  />
                </Grid>
              </Grid>
              <Grid container pt={3}>
                <Grid item xs={12} md={12} lg={12} pb={1} pt={1}>
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
                      <Typography variant="body1">Saving...</Typography>
                    ) : (
                      <Typography variant="body1">Save</Typography>
                    )}
                  </Button>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                  <Button
                    variant="contained"
                    size="large"
                    color="inherit"
                    fullWidth
                    onClick={() => history.push('/')}
                  >
                    <Typography variant="body1">Back</Typography>
                  </Button>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Grid>
      </Paper>
    </Grid>
  );
};

const mapState = (state) => ({
  tickets: state.tickets,
});

const mapDispatch = (dispatch) => ({
  updateTicket: (ticket) => dispatch.tickets.updateTicket(ticket),
});

export default connect(mapState, mapDispatch)(EditTicket);
