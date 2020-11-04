import { makeStyles, createStyles } from '@material-ui/core/styles';

const Styles = makeStyles((theme) =>
  createStyles({
    ticketDescriptionStyle: {
      overflowWrap: 'break-word',
    },
    iconButton: {
      marginBottom: theme.spacing(1),
    },
    editPaperStyle: {
      padding: theme.spacing(3),
      width: theme.spacing(45),
    },
    submitButtonStyle: {
      marginLeft: theme.spacing(1),
    },
    paperStyleInProgress: {
      minHeight: theme.spacing(20),
      margin: theme.spacing(0, 2),
      backgroundColor: '#ffbf00',
      color: '#ffffff',
    },
    paperStyleDone: {
      minHeight: theme.spacing(20),
      margin: theme.spacing(0, 2),
      backgroundColor: '#00ff00',
      color: '#ffffff',
    },
    paperStyleClose: {
      minHeight: theme.spacing(20),
      margin: theme.spacing(0, 2),
      backgroundColor: '#cccccc',
      color: '#ffffff',
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
