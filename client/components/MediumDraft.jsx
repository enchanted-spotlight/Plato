import React from 'react';
import request from 'superagent';
import { Button } from 'react-materialize';
import ReactDOM from 'react-dom';

import { convertToRaw } from 'draft-js';
import { Editor, createEditorState } from 'medium-draft';
import { connect } from 'react-redux';

import * as a from './../actions.js';

const mapStateToProps = store => ({
  username: store.username,
  currentNote: store.textEditor,
  currentNoteTitle: store.sessionTitle
});
const mapDispatchToProps = dispatch => ({
  fetchNotes: username => dispatch(a.fetchNotes(username))
});

class MediumEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentNote: this.props.currentNote, // for empty content
      title: this.props.currentNoteTitle
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      currentNote: newProps.currentNote,
      title: newProps.currentNoteTitle
    });
  }


  render() {
    // const { currentNote } = this.state;
    console.log(this.props, 'medium draft state props');
    return (
      <div>
        <Editor
          editorState={this.state.currentNote}
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
  currentNoteTitle: React.PropTypes.string,
  onNoteChange: React.PropTypes.func,
  currentNote: () => null
};
