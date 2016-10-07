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

    // this.onChange = (editorState) => {
    //   this.setState({ editorState });
    // };

    // this.titleChange = (e) => {
    //   this.setState({ title: e.target.value });
    // };

// <<<<<<< a18abbd683b85e58bcf3f9421605db7dc57a8efc
//     this.submitNote = () => {
//       // this will let us save the current content as rich text
//       const userNote = convertToRaw(this.state.editorState.getCurrentContent());
//       const plainTextContent = this.state.editorState.getCurrentContent().getPlainText();
//       const userTitle = this.state.title;
//       const username = this.props.username;
//       const url = 'api/save-note';
//       // submit the note to the server for storage in db
//       request
//         .post(url)
//         .send({
//           user_id: username,
//           text: JSON.stringify(userNote),
//           plainText: JSON.stringify(plainTextContent),
//           title: userTitle
//         })
//         .set('Accept', 'application/json')
//         .end((err, res) => {
//           if (err) {
//             console.log('There is an error in submitNote: ', err);
//           } else {
//             this.props.store.dispatch(a.fetchNotes(this.props.username));
//           }
//         });
//     };
// =======
//     // removed submitNote here...
// >>>>>>> Integrate Session component with methods from App MediumDraft and SpeechToTextEditor
//   }

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
          placeholder="Start typing your shit here ..."
        />
      </div>
    );
  }
}

export default MediumEditor;

MediumEditor.propTypes = {
  currentNoteTitle: React.PropTypes.string,
  onNoteChange: React.PropTypes.func,
  currentNote: () => null
};
