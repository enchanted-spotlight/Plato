import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import NoteItem from '../client/components/NoteItem.jsx';

const wrapper = shallow(<NoteItem />);
const inst = wrapper.instance();

describe('<NoteItem />', () => {
  describe('<NoteItem /> Props', () => {
    it('should have a unique key prop', () => {
      expect(wrapper.props().key).to.be.defined;
    });
    it('should have an _id prop', () => {
      expect(wrapper.props()._id).to.be.defined;
    });
    it('should have a title prop', () => {
      expect(wrapper.props().title).to.be.defined;
    });
    it('should have a text prop', () => {
      expect(wrapper.props().text).to.be.defined;
    });
    it('should have a username prop', () => {
      expect(wrapper.props().username).to.be.defined;
    });
    it('should have a loadNote prop', () => {
      expect(wrapper.props().loadNote).to.be.defined;
    });
    it('should have a fetchNotes prop', () => {
      expect(wrapper.props().fetchNotes).to.be.defined;
    });
  });
});
