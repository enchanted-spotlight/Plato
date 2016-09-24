import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';

import browseNotes from './../client/components/browseNotes';

describe('<browseNotes />', () => {
  const wrapper = shallow(<browseNotes />);
  expect(wrapper).to.equal(true);
});


// Should exist

// Should get all notes from database for a given user

//
