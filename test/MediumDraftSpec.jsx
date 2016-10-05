import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import MediumDraft from '../client/components/MediumDraft.jsx';

const wrapper = shallow(<MediumDraft />);
const inst = wrapper.instance();

describe('<MediumDraft />', () => {
  describe('MediumDraft Props', () => {
    it('should have a username prop', () => {
      expect(wrapper.props().username).to.be.defined;
    });
    it('should have a fetchNotes prop', () => {
      expect(wrapper.props().fetchNotes).to.be.defined;
    });
    it('should have a currentNote prop', () => {
      expect(wrapper.props().currentNote).to.be.defined;
    });
    it('should have a currentTitle prop', () => {
      expect(wrapper.props().currentTitle).to.be.defined;
    });
  });
  describe('MediumDraft State', () => {
    it('should have a editorState state', () => {
      expect(wrapper.state().editorState).to.be.defined;
    });
    it('should have a title state', () => {
      expect(wrapper.state().editorState).to.be.defined;
    });
  });
});
