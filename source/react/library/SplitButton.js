import React from 'react';
import classnames from 'classnames';
import Button from './Button';
import Icon from './Icon';
import DropdownMenu from './dropdown/DropdownMenu';

const propTypes = {
  className: React.PropTypes.string,
  options: React.PropTypes.array.isRequired,
  /** Primary button label */
  label: React.PropTypes.string.isRequired,
  processing: React.PropTypes.bool,
  dropdownWidth: React.PropTypes.string,
  dropdownSize: React.PropTypes.string,
  /** Whether or not to render the Menu in a Portal */
  disablePortal: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  disabledMenu: React.PropTypes.bool,
  /** Either "small" or "tiny" */
  size: React.PropTypes.string,
  /** Primary button click handler */
  onClick: React.PropTypes.func.isRequired,
  /** Option click handler */
  onOptionClick: React.PropTypes.func.isRequired,
};

const defaultProps = {
  className: '',
  label: '',
  processing: false,
  dropdownWidth: '125px',
  dropdownSize: '',
  disablePortal: false,
  disabled: false,
  disabledMenu: false,
  size: '',
  onClick: null,
};

/**
 * `SplitButton` is a `Button` with a `Dropdown`.
 *
 * @example ../../../docs/SplitButton.md
 */

class SplitButton extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.onOptionClick = this.onOptionClick.bind(this);
  }

  onClick() {
    if (this.props.onClick) {
      this.props.onClick();
    }
  }

  onOptionClick(option) {
    if (this.props.onOptionClick && typeof option !== 'undefined') {
      this.props.onOptionClick(option);
    }
  }

  renderDropdownTarget() {
    const iconSize = '14px';

    const disabledMenu = this.props.disabledMenu;

    return (
      <Button className="rc-button-menu" size={ this.props.size } disabled={ disabledMenu }>
        <div className="rc-button-menu-inner">
          <Icon height={ iconSize } width={ iconSize } type="chevron-down" />
        </div>
      </Button>
    );
  }

  renderDropdown() {
    const target = this.renderDropdownTarget();
    const { size, options, dropdownWidth, disablePortal, dropdownSize } = this.props;

    return (
      <DropdownMenu
        anchor="bottom right"
        size={ dropdownSize || size }
        width={ dropdownWidth }
        margin={ 5 }
        onChange={ this.onOptionClick }
        target={ target }
        options={ options }
        disablePortal={ disablePortal }
      />
    );
  }

  render() {
    const dropdown = this.renderDropdown();
    const { label, size, disabled, processing } = this.props;
    const className = classnames('rc-split-button', this.props.className);

    return (
      <div className={ className }>
        <Button
          processing={ processing }
          size={ size }
          onClick={ this.onClick }
          label={ label }
          disabled={ disabled }
          className="rc-button-main"
        />
        { dropdown }
      </div>
    );
  }
}

SplitButton.propTypes = propTypes;
SplitButton.defaultProps = defaultProps;

export default SplitButton;
