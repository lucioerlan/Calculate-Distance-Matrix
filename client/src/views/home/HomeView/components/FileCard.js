import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  GetAppOutlined as GetAppOutlinedIcon,
} from '@material-ui/icons';
import {
  Button, Card, CardContent, Typography
} from '@material-ui/core';
import { formatDistance, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: theme.spacing(2)
  },
  content: {
    padding: theme.spacing(2),
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      flexWrap: 'wrap'
    },
    '&:last-child': {
      paddingBottom: theme.spacing(2)
    }
  },
  stats: {
    padding: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      flexBasis: '50%'
    }
  },
  actions: {
    padding: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      flexBasis: '50%'
    }
  }
}));

export const FileCard = (props) => {
  const { file, className, ...rest } = props;
  const classes = useStyles();

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent className={classes.content}>
        <div className={classes.stats}>
          <Typography variant="h6">Document Name</Typography>
          <Typography variant="body2">{file.fullname}</Typography>
        </div>

        <div className={classes.stats}>
          <Typography variant="h6">Calculation Type</Typography>
          <Typography variant="body2">{file.chooseDistances}</Typography>
        </div>

        <div className={classes.stats}>
          <Typography variant="h6">Created At</Typography>
          <Typography variant="body2">
            há
            {' '}
            {formatDistance(parseISO(file.createdAt), new Date(), {
              locale: ptBR
            })}
          </Typography>
        </div>

        <div className={classes.actions}>
          <Button
            target="_blank"
            rel="noopener noreferrer"
            href={`${process.env.REACT_APP_SOCKET_URL}/files/${file.docFile}`}
            color="primary"
            size="small"
            variant="outlined"
            startIcon={<GetAppOutlinedIcon />}
          >
            Download Document
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

FileCard.propTypes = {
  className: PropTypes.string,
  project: PropTypes.object.isRequired
};
