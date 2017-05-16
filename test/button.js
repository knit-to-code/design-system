import jsdom from 'mocha-jsdom';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import Button from '../source/react/library/Button';

describe('<Button />', () => {
  jsdom({ skipWindowCheck: true });

  it('should have disabled attr when passed disabled prop', () => {
    const wrapper = shallow(<Button disabled />);

    expect(wrapper).to.have.attr('disabled');
  });

  it('should not respond to click events when disabled', () => {
    const onClick = sinon.spy();
    const wrapper = shallow(<Button disabled onClick={ onClick } />);
    wrapper.simulate('click', { preventDefault: () => { } });

    expect(onClick.called).to.equal(false);
  });

  it('should respond to click events', () => {
    const onClick = sinon.spy();
    const wrapper = shallow(<Button onClick={ onClick } />);
    wrapper.simulate('click');

    expect(onClick.called).to.equal(true);
  });

  it('should have a processing indicator when enabled', () => {
    const wrapper = shallow(<Button processing />);
    const Icon = wrapper.find('Icon');

    expect(Icon.prop('type')).to.equal('loader');
  });

  it('should render an icon when provided', () => {
    const wrapper = shallow(<Button icon="plus" />);
    const Icon = wrapper.find('Icon');

    expect(Icon.prop('type')).to.equal('plus');
  });

  it('should render a button with a badge', () => {
    const wrapper = shallow(<Button badge icon="plus" />);

    expect(wrapper).to.have.className('rc-button-badged');
  });
});
