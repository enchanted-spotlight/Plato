import React from 'react';
import request from 'superagent';
import { Button } from 'react-materialize';
import ReactDOM from 'react-dom';

import { convertToRaw } from 'draft-js';
import { Editor, createEditorState } from 'medium-draft';

import * as a from './../actions.js';


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
    console.log(this.props, 'medium draft state props');
    return (
      <div>
        <Editor
          editorState={this.state.currentNote}
          onChange={this.props.onNoteChange}
          placeholder="Start typing your shit here ..."
        />
        <Button
          onClick={() => this.props.submitNote()}
          waves="light"
        >Submit
        </Button>
      </div>
    );
  }
}

export default MediumEditor;

MediumEditor.propTypes = {
  submitNote: React.PropTypes.func,
  currentNoteTitle: React.PropTypes.string,
  onNoteChange: React.PropTypes.func,
  currentNote: () => null
};
