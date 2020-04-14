import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

const Spinner = ({ color, size, className }) => {
  return (
    <div
      style={{
        color,
        fontSize: size
      }}
      className={cn('rc-loader-spinner', className)} />
  );
};

Spinner.displayName = 'Loader.Spinner';
Spinner.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
};
Spinner.defaultProps = {};

export default Spinner;
