import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
// If this becomes a stateful component, you will have to use mount

import BrowseNotes from './../client/components/BrowseNotes';

describe('BrowseNotes React Component', () => {
  const wrapper = shallow(<BrowseNotes />);

  it('should render component', () => {
    expect(wrapper.find('h2')).to.have.length(1);
  });

  // Should exist
  it('should be a div with class notes-list', () => {
    expect(wrapper.is('.notes-list')).to.equal(true);
  });

  // Should get all notes from database for a given user
  it('should have a fetch notes function', () => {

  });
  it('should call fetch notes function on mount', () => {

  });

  // Should create a list item for every note received from database
  // Each list item shoud have a note title
  // Each item should have a snippet of the note body

  // Should have a search element
  // Should filter out notes that do not meet search parameters

  // Should open note component with note data when clicked


<<<<<<< 54c686af3e8ac8b65342de93ca8bea309df52c2f
<<<<<<< 3a9c5c0da56445b1d312a94cf6822c8d64bd9677
=======
// Should open note for editing when it is clicked

>>>>>>> Rename test spec again since change was lost in rebase
=======
  // Should have a delete note button
  // Should have a delete function
  // Button should ask for confirmation
  // Delete function should send delete request after confirmation
});
>>>>>>> Change browse notes component to div and write initial mount test
