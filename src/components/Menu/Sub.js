import React, { useState, useCallback, useContext, useMemo } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import Icon from '../Icon';
import MenuContext from './MenuContext';
import displayName from './displayName';
import getMenuInfo from './getMenuInfo';
import { difference } from '../../utils/helpers';
import Animated from '../Animated';

const Sub = ({ defaultExpanded, className, children, title, icon, _key }) => {
  const { iconOnly, selectedSubKeys, hiddenKeys } = useContext(MenuContext);
  const selected = useMemo(() => selectedSubKeys.indexOf(_key) >= 0, [selectedSubKeys, _key]);
  const hidden = useMemo(() => {
    const items = Object.keys(getMenuInfo(children).items);
    return !difference(items, hiddenKeys).length;
  }, [hiddenKeys, children]);

  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const toggleExpanded = useCallback(() => setIsExpanded(prev => !prev), []);

  const customChildren = useMemo(() => {
    return React.Children.map(children, (elm, idx) => React.cloneElement(elm, {
      _subKey: _key,
      _key: elm.hasOwnProperty('key') ? elm.key : idx,
    }));
  }, [children, _key]);

  return (
    <li
      className={cn(
        'rc-menu-sub',
        {
          '--expanded': isExpanded,
          '--icon-only': iconOnly,
          '--selected': selected,
          '--hidden': hidden,
        },
        className,
      )}
    >
      <div className="rc-menu-sub-title" onClick={toggleExpanded}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {icon && <Icon name={icon} className="rc-menu-sub-title-icon" />}
          {(iconOnly && !icon && title) && <span style={{ textTransform: 'uppercase '}}>{title[0]}</span>}
          <span className="rc-menu-sub-content">{title}</span>
        </div>
        <Icon name="caret-down" className="rc-menu-sub-icon" />
      </div>
      <Animated.Expand className="rc-menu-sub-list" isExpanded={isExpanded}>
        <ul>
          {customChildren}
        </ul>
      </Animated.Expand>
    </li>
  );
};

Sub.displayName = displayName.sub;
Sub.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  title: PropTypes.string,
  _key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultExpanded: PropTypes.bool,
};
Sub.defaultProps = {};

export default Sub;
