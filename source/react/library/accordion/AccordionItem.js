import React from 'react';
import classnames from 'classnames';

import Icon from '../Icon';

const propTypes = {
  /** A string to identify the item visually for the user */
  title: React.PropTypes.string,
  /**
    Whether or not the children are displayed. Usually controlled by the parent
    `Accordion`
  */
  active: React.PropTypes.bool,
  /** Class name to apply to container */
  className: React.PropTypes.string,
  /** Callback for when the user opens the item */
  onOpen: React.PropTypes.func,
  children: React.PropTypes.any,
  icon: React.PropTypes.string,
};


const defaultProps = {
  icon: '',
  active: false,
  className: '',
  onOpen: () => {},
  children: null,
};

/**
 * `AccordionItem`s are containers which are meant to be rendered within an
 * `Accordion`.
 *
 * @example ../../../../docs/AccordionItem.md
 */
class AccordionItem extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    if (e.nativeEvent) {
      const nativeEvent = e.nativeEvent;
      nativeEvent.preventDefault();
    }

    if (this.props.onOpen) {
      this.props.onOpen();
    }
  }

  renderContent() {
    return (
      <div className="rc-accordion-item-content">
        { this.props.children }
      </div>
    );
  }

  renderTitle() {
    const { active, title } = this.props;
    const className = classnames('rc-accordion-item-header', {
      'rc-accordion-item-header-active': active,
    });
    let jsx = [];

    if (this.props.icon) {
      jsx.push(
        <span key="header-icon" className="rc-accordion-header-icon">
          <Icon width="16px" height="16px" type={ this.props.icon } />
        </span>,
      );
    }

    jsx.push(
      <span key="header-title" className="rc-accordion-item-header-title">
        { title }
      </span>,
    );

    if (active) {
      jsx = (
        <div className={ className }>
          { jsx }
        </div>
      );
    } else {
      jsx.push(
        <span key="header-action" className="rc-accordion-item-header-action">
          <Icon width="10px" height="10px" type="plus" />
        </span>,
      );

      jsx = (
        <a className="rc-accordion-item-header" href="" onClick={ this.onClick }>
          { jsx }
        </a>
      );
    }

    return jsx;
  }

  render() {
    const className = classnames('rc-accordion-item', {
      'rc-accordion-item-active': this.props.active,
    }, this.props.className);
    const title = this.renderTitle();
    const content = this.renderContent();

    return (
      <div className={ className }>
        { title }
        { content }
      </div>
    );
  }
}

AccordionItem.propTypes = propTypes;
AccordionItem.defaultProps = defaultProps;

export default AccordionItem;
