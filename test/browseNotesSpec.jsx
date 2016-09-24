import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import BrowseNotes from './../client/components/BrowseNotes';

describe('<BrowseNotes />', () => {
  it('should render component', () => {
    const wrapper = mount(<BrowseNotes />);
    expect(wrapper.find('h2')).to.have.length(1);
  });
});

// Should exist

// Should get all notes from database for a given user

//
