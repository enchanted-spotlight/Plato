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

// Should create a list item for every note received from database

// Each list item shoud have a note title

// Each item should have a snippet of the note body

// Should have a search element

// Should filter out notes that do not meet search parameters

// Should open note for editing when it is clicked

