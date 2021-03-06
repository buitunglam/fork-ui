import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import Button from '../Button';
import Dialog from '../Dialog';
import { config } from '../ConfigProvider';

const PureConfirm = React.forwardRef(({ children, title, onCancel, onOk, className, ...otherProps }, ref) => {
  return (
    <Dialog
      ref={ref}
      className={cn('fui-confirm', className)}
      {...otherProps}
    >
      <Dialog.Header>{title}</Dialog.Header>
      <Dialog.Body>{children}</Dialog.Body>
      <Dialog.Footer className="fui-confirm-footer">
        <Button onClick={onCancel}>{config.lang.cancel}</Button>
        <Button onClick={onOk} style={{ marginLeft: '0.5em' }}>{config.lang.ok}</Button>
      </Dialog.Footer>
    </Dialog>
  );
});

PureConfirm.displayName = 'PureConfirm';
PureConfirm.propTypes = {
  children: PropTypes.any,
  title: PropTypes.any,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  className: PropTypes.string,
};
PureConfirm.defaultProps = {
  onCancel: f => f,
  onOk: f => f,
};

export default PureConfirm;
