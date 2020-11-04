import { makeStyles, createStyles } from '@material-ui/core/styles';

const Styles = makeStyles((theme) =>
  createStyles({
    fullWidth: {
      width: '100%',
    },
    ticketDescriptionStyle: {
      overflowWrap: 'break-word',
    },
    iconButton: {
      marginBottom: theme.spacing(1),
    },
    editPaperStyle: {
      padding: theme.spacing(3),
      width: theme.spacing(45),
      [theme.breakpoints.down(['sm'])]: {
        padding: 0,
      },
    },
    submitButtonStyle: {
      marginLeft: theme.spacing(1),
      [theme.breakpoints.down('sm')]: {
        margin: theme.spacing(1, 0),
      },
    },
    paperStyleInProgress: {
      minHeight: theme.spacing(20),
      backgroundColor: '#ffbf00',
      color: '#ffffff',
      width: '100%',
    },
    paperStyleDone: {
      minHeight: theme.spacing(20),
      margin: theme.spacing(0, 2),
      backgroundColor: '#00ff00',
      color: '#ffffff',
      width: '100%',
      [theme.breakpoints.down('sm')]: {
        margin: 0,
      },
    },
    paperStyleClose: {
      minHeight: theme.spacing(20),
      margin: theme.spacing(0, 2),
      backgroundColor: '#cccccc',
      color: '#ffffff',
      width: '100%',
      [theme.breakpoints.down('sm')]: {
        margin: 0,
      },
    },
    inProgressButtonStyle: {
      backgroundColor: '#ffbf00',
    },
    doneButtonStyle: {
      backgroundColor: '#00ff00',
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  })
);

export default Styles;
