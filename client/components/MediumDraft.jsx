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
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      currentNote: newProps.currentNote
    });
  }


  render() {
    console.log(this.props, 'medium draft state props');
    return (
      <div>
        <Editor
          editorState={this.state.currentNote}
          onChange={this.props.onNoteChange}
          placeholder="Start typing here ..."
        />
        <Button
          onClick={() => this.props.submitSession()}
          waves="light"
        >Submit
        </Button>
      </div>
    );
  }
}

export default MediumEditor;

MediumEditor.propTypes = {
  submitSession: React.PropTypes.func,
  onNoteChange: React.PropTypes.func,
  currentNote: () => null
};
