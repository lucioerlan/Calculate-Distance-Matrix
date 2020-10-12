import React from 'react';
import { Link } from 'react-router-dom';
import { IconButton, Tooltip } from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';
import './styles.css';

export default () => {
  return (
    <div className="notfound-content">
      <Link to="/">
        <Tooltip title={'Back'}>
          <IconButton>
            <ArrowBack className="icon-back" />
          </IconButton>
        </Tooltip>
      </Link>
      <div className="notfound">
        <div className="notfound-404">
          <h3>Oops! Page not found</h3>
          <h1>
            <span>4</span>
            <span>0</span>
            <span>4</span>
          </h1>
        </div>
        <h2>we are sorry, but the page you requested was not found</h2>
      </div>
    </div>
  );
};
