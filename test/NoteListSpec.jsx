import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import NoteList from './../client/components/NoteList';

const articles = [
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
  it('should render component', () => {
    const wrapper = mount(<NoteList notes={articles} />);
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

// Should open note component with note data when clicked
