import React from 'react';
import PropTypes from 'prop-types';
import { EventOverlay } from '@collab-ui/react';

/**
 * MenuOverlay is container component which contains MenuContent and Menu
 * @category containers
 * @component MenuOverlay
 * @variations collab-ui-react
 */

export default class MenuOverlay extends React.Component {
  static displayName = 'MenuOverlay';

  state = {
    isOpen: false,
  };

  static childContextTypes = {
    onSelect: PropTypes.func,
  };

  getChildContext = () => {
    return {
      onSelect: this.onSelect,
    };
  };

  verifyChildren = () => {
    const { children } = this.props;
    const status = React.Children.toArray(children).reduce((status, child) => {
      return (
        status
        && child.type
        && (child.type.displayName === 'MenuContent'
          || child.type.displayName === 'Menu')
      );
    }, true);

    if(!status) {
      throw new Error('MenuOverlay should only contain Menu or MenuContent as children');
    }
  };

  componentWillMount () {
    this.verifyChildren();
  }

  onSelect = (e, menuIndex, menuItem) => {
    const { onSelect } = this.props;
    const { children, keepMenuOpen } = menuItem.props;

    onSelect && onSelect(e, menuIndex, menuItem);
    !children && !keepMenuOpen && this.handleClose();
  };

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const {
      children,
      className,
      menuTrigger,
      ...otherprops
    } = this.props;

    const { isOpen } = this.state;

    const setMenuTrigger = () => React.cloneElement(menuTrigger, {
      onClick: () => this.setState({ isOpen: !isOpen }),
      ref: ref => this.anchorNode = ref,
    });

    return (
      <div
        className={
          'cui-menu-overlay-wrapper' +
          `${(className && ` ${className}`) || ''}`
        }
      >
        {setMenuTrigger()}
        <EventOverlay
          className='cui-menu-overlay'
          allowClickAway
          isOpen={isOpen}
          close={this.handleClose}
          anchorNode={this.anchorNode}
          {...otherprops}
        >
          {children}
        </EventOverlay>
      </div>
    );
  }
}

MenuOverlay.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onSelect: PropTypes.func,
  menuTrigger: PropTypes.element.isRequired,
  direction: PropTypes.string,
  showArrow: PropTypes.bool,
};

MenuOverlay.defaultProps = {
  children: null,
  className: '',
  onSelect: null,
  direction: 'bottom-left',
  showArrow: true,
};

/**
* @name MenuOverlay
*
* @category containers
* @component menu-overlay
* @section default
*
* @js
*

import { MenuItem, Button, Menu, MenuContent } from '@collab-ui/react';

export default class MenuOverlayDefault extends React.PureComponent {
  render() {
    return(
      <div>
        <MenuOverlay
          menuTrigger={<Button>Show Menu</Button>}
        >
          <MenuContent>Content</MenuContent>
          <Menu>
            <MenuItem
              key="0"
              selectedValue="Out of office until 2:00pm"
              label="Status"
            >
              <MenuItem key="0" isHeader label="Set Do Not Disturb:"/>
              <MenuItem key="1" disabled label="1 hour"/>
              <MenuItem key="2" keepMenuOpen label="5 hour"/>
              <MenuItem key="3" keepMenuOpen label="8 hour"/>
            </MenuItem>
            <MenuItem
              key="1"
              selectedValue="English"
              label="Language"
            >
              <MenuItem key="0" label="English"/>
              <MenuItem key="1" label="Spanish"/>
            </MenuItem>
            <MenuItem
              key="2"
              label="Settings"
            />
          </Menu>
        </MenuOverlay>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>
    );
  }
}
**/
