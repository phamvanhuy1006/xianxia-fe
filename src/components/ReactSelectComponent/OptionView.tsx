import React from 'react';
import clsx from 'clsx';
import { Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import AddIcon from '@mui/icons-material/Close';

const useStyles = makeStyles(() => ({
  root: {
    borderTop: '2px solid #f0f3fb',
    padding: '8px 12px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#f0f5f7'
    }
  },
  icon: {
    float: 'left',
    paddingTop: 1,
    color: '#007d4c'
  },
  title: {
    color: '#007d4c',
    fontSize: '16px',
    fontWeight: 700
  }
}));

interface OptionProps {
  title?: any;
  action?: any;
  showIcon?: boolean;
  className?: string;
}

const OptionView: React.FC<OptionProps> = ({ title, action, className, showIcon }) => {
  const classes = useStyles();

  if (!title) return null;

  return (
    <Box component="div" className={clsx(classes.root, className)} onClick={action}>
      {showIcon && (
        <Box className={classes.icon}>
          <AddIcon fontSize="small" />
        </Box>
      )}
      <Box className={classes.title}>{title}</Box>
    </Box>
  );
};

OptionView.defaultProps = {
  title: '',
  action: () => {
    //
  },
  showIcon: false
};

export default OptionView;
