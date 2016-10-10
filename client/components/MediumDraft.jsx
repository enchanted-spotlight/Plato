import React from 'react';
import request from 'superagent';
import { Button } from 'react-materialize';
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
});

class MediumEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: this.props.currentNote, // for empty content
      title: this.props.username
    };

    this.onChange = (editorState) => {
      this.setState({ editorState });
    };

    this.titleChange = (e) => {
      this.setState({ title: e.target.value });
    };

    this.submitNote = () => {
      // this will let us save the current content as rich text
      const userNote = convertToRaw(this.state.editorState.getCurrentContent());
      const plainTextContent = this.state.editorState.getCurrentContent().getPlainText();
      const userTitle = this.state.title;
      const username = this.props.username;
      const url = 'api/save-note';
      // submit the note to the server for storage in db
      request
        .post(url)
        .send({
          user_id: username,
          text: JSON.stringify(userNote),
          plainText: JSON.stringify(plainTextContent),
          title: userTitle
        })
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (err) {
            console.log('There is an error in submitNote: ', err);
          } else {
            // this.props.store.dispatch(a.fetchNotes(this.props.username));
          }
        });
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      editorState: newProps.currentNote,
      title: newProps.currentNoteTitle
    });
  }


  render() {
    const { editorState } = this.state;
    return (
      <div>
        <input
          type="text"
          value={this.state.title}
          onChange={this.titleChange}
          placeholder="Title"
        />
        <Editor
          editorState={editorState}
          onChange={this.onChange}
          placeholder="Start typing here ..."
        />
        <div>
          <Button
            onClick={() => this.submitNote()}
            waves="light"
          > Submit </Button>
        </div>
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
  username: React.PropTypes.string,
  store: React.PropTypes.Object,
  currentNote: () => null
};
