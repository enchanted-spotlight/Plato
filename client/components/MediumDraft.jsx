import React from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';

import { Editor, createEditorState } from 'medium-draft';

class MediumEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: createEditorState(), // for empty content
      title: ''
    };

    this.onChange = (editorState) => {
      this.setState({ editorState });
    };

    this.titleChange = (e) => {
      this.setState({ title: e.target.value });
    };

    this.submitNote = () => {
      // this will let us save the current content as rich text
      const userNote = this.state.editorState;
      const userTitle = this.state.title;
      const username = this.props.username;
      const url = 'api/save-note';
      // submit the note to the server for storage in db
      request
        .post(url)
        .send({
          user_id: username,
          text: JSON.stringify(userNote),
          title: userTitle
        })
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (err) {
            console.log('There is an error in submitNote: ', err);
          } else {
            this.props.fetchNotes(this.props.username);
          }
        });
    };
  }

  render() {
    const { editorState } = this.state;
    return (
      <Editor
        editorState={editorState}
        onChange={this.onChange}
        placeholder="Start typing your shit here ..."
      />
    );
  }
}

export default MediumEditor;

MediumEditor.propTypes = {
  username: React.PropTypes.string,
  fetchNotes: React.PropTypes.func
};
