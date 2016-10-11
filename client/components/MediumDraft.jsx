import React from 'react';
import request from 'superagent';
import { Button } from 'react-materialize';
import ReactDOM from 'react-dom';

import { convertToRaw } from 'draft-js';
import { Editor, createEditorState } from 'medium-draft';
import { connect } from 'react-redux';

import * as a from './../actions.js';

const mapStateToProps = state => ({
  currentNote: state.textEditor
});

const mapDispatchToProps = dispatch => ({
  fetchNotes: username => dispatch(a.fetchNotes(username)),
  onNoteChange: newEditorState => dispatch(a.onTextEditorChange(newEditorState))
});

class MediumEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toggleTimer: this.props.toggleTimer
    };
  }

  render() {
    console.log(this.props, 'medium draft state props');
    return (
      <div>
        <Editor
          editorState={this.props.currentNote}
          onChange={this.props.onNoteChange}
          placeholder="Start typing here ..."
        />
      </div>
    );
  }
}

const MediumEditorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MediumEditor);

export default MediumEditorContainer;

MediumEditor.propTypes = {
  toggleTimer: React.PropTypes.func,
  currentNote: React.PropTypes.func,
  onNoteChange: React.PropTypes.func
};
