import React from 'react';
import { Editor } from 'medium-draft';
import { connect } from 'react-redux';

import * as a from './../actions.js';

const mapStateToProps = state => ({
  currentNote: state.textEditor
});

const mapDispatchToProps = dispatch => ({
  fetchNotes: username => dispatch(a.fetchNotes(username)),
  onNoteChange: newEditorState => dispatch(a.onTextEditorChange(newEditorState))
});

const MediumEditor = props => (// extends React.Component {
  <div>
    <Editor
      editorState={props.currentNote}
      onChange={props.onNoteChange}
      placeholder="Start typing here ..."
    />
  </div>
);

const MediumEditorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MediumEditor);

export default MediumEditorContainer;

MediumEditor.propTypes = {
  currentNote: React.PropTypes.func,
  onNoteChange: React.PropTypes.func
};
