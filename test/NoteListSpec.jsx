import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
// If this becomes a stateful component, you will have to use mount

import NoteList from './../client/main/components/NoteList';

const wrapper = shallow(<NoteList />);
const inst = wrapper.instance();

const notes = [
  {
    id: 1,
    user_id: 'Jon',
    title: 'JavaScript Intro',
    text: 'JavaScript is super fun.'
  },
  {
    id: 2,
    user_id: 'Jon',
    title: 'JavaScript for Beginners',
    text: 'Functions on objects are methods.'
  },
  {
    id: 3,
    user_id: 'Jon',
    title: 'JavaScript Frameworks',
    text: 'Angular sure is nice, but this React stuff seems cool too.'
  },
];

describe('<NoteList />', () => {
  it('should exist and be a react component', () => {
    expect(inst).to.be.instanceOf(NoteList);
    expect(wrapper.is('.notes-list')).to.equal(true);
  });


  // Should exist
  it('should be a div with class notes-list', () => {
    expect(wrapper.is('.notes-list')).to.equal(true);
  });

  // Should create a list item for every note received from database
  // Each list item shoud have a note title
  // Each item should have a snippet of the note body

  // Should have a search element
  // Should filter out notes that do not meet search parameters

  // Should open note component with note data when clicked


  // Should have a delete note button
  // Should have a delete function
  // Button should ask for confirmation
  // Delete function should send delete request after confirmation
});
