import React from 'react';
import { useHistory } from 'react-router-dom';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import styled from '@material-ui/styles/styled';
import {
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  Grow,
  IconButton,
} from '@material-ui/core';
import MuiGrid from '@material-ui/core/Grid';
import {
  compose as composeStyles,
  palette,
  sizing,
  spacing,
} from '@material-ui/system';
import Styles from './TicketsList.style';
import { onTicketMove } from '../Utils/utility';
import { PENDING, DONE, CLOSE } from './constants';

const Grid = styled(MuiGrid)(composeStyles(spacing, palette, sizing));

const CardTicket = ({ tickets, updateTicket, ticketStatus, setIsLoading }) => {
  const classes = Styles();
  const history = useHistory();
  const isDone = ticketStatus === DONE;
  const isClose = ticketStatus === CLOSE;

  return tickets
    .filter((item) => item.status === ticketStatus)
    .map((ticket) => {
      return (
        <Grid px={2} py={1}>
          <Grow in={true}>
            <Card>
              <CardContent>
                <Typography
                  variant="h6"
                  component="p"
                  className={classes.ticketDescriptionStyle}
                >
                  {ticket.description}
                  {ticketStatus !== CLOSE && (
                    <IconButton
                      onClick={() =>
                        history.push({
                          pathname: `/ticket/${ticket.id}`,
                          state: { ticket },
                        })
                      }
                      className={classes.iconButton}
                    >
                      <EditOutlinedIcon />
                    </IconButton>
                  )}
                </Typography>
              </CardContent>
              {!isClose && (
                <CardActions>
                  <Button
                    variant="contained"
                    onClick={() => {
                      onTicketMove(ticket, CLOSE, updateTicket, setIsLoading);
                    }}
                    size="small"
                    color="inherit"
                  >
                    <Typography>Close</Typography>
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => {
                      onTicketMove(
                        ticket,
                        isDone ? PENDING : DONE,
                        updateTicket,
                        setIsLoading,
                        isDone ? false : true
                      );
                    }}
                    size="small"
                    color="inherit"
                  >
                    <Typography>{isDone ? 'Not Fix' : ' Done'}</Typography>
                  </Button>
                </CardActions>
              )}
            </Card>
          </Grow>
        </Grid>
      );
    });
};

export default CardTicket;
