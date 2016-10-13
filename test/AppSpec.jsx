import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import PlatoApp from './../client/components/App';

const wrapper = shallow(<PlatoApp />);
const inst = wrapper.instance();

describe('<PlatoApp /> Component', () => {
  it('should exist and be a react component', () => {
    expect(inst).to.be.instanceOf(PlatoApp);
    expect(wrapper.is('.plato-app')).to.equal(true);
  });

  it('should have a navbar component', () => {
    expect(wrapper.find('NavBar')).to.have.length(1);
  });
});
