import { makeStyles } from '@mui/styles';
import React, { ReactNode } from 'react';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  txtError: {
    fontSize: '12px',
    color: '#f44336',
    textAlign: 'start',
    margin: '5px'
  }
}));

interface ErrorMessageProps {
  children: ReactNode | string;
  className?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps | any> = (props) => {
  const classes = useStyles();
  const { children, className, ...rest } = props;
  if (!children) return null;
  return (
    <p className={clsx(classes.txtError, { [className]: !!className })} {...rest}>
      {children}
    </p>
  );
};

export default ErrorMessage;
