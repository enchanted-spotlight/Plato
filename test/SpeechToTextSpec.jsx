import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import MediumDraft from '../client/components/MediumDraft.jsx';

const wrapper = shallow(<MediumDraft />);
const inst = wrapper.instance();

describe('<SpeechToTextEditor />', () => {
  describe('SpeechToTextEditor Props', () => {
    it('should have a prop named username', () => {
      expect(wrapper.props().username).to.be.defined;
    });
    it('should have a prop named fetchNotes', () => {
      expect(wrapper.props().fetchNotes).to.be.defined;
    });
  });
  describe('SpeechToTextEditor State', () => {
    it('should have a editorState state', () => {
      expect(wrapper.state().editorState).to.be.defined;
    });
    it('should have a title state', () => {
      expect(wrapper.state().editorState).to.be.defined;
    });
  });
});
