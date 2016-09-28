import React from 'react';
import SpeechToText from './SpeechToText.jsx';
import { Editor, EditorState, Modifier } from 'draft-js';

class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.onChange = (editorState) => {
      this.setState({ editorState });
    };
  }

  addText(string) {
    const editorState = this.state.editorState;
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    // string should equal the text that we are trying to insert
    const insert = Modifier.insertText(contentState, selection, string);
    const es = EditorState.push(editorState, insert, 'insert-fragment');
    this.setState({ editorState: es });
  }

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <SpeechToText addText={string => this.addText(string)} />
        <Editor editorState={editorState} onChange={this.onChange} />
      </div>
    );
  }
}


// MyEditor.propTypes = {
//   notes: React.PropTypes.Array
// };

export default MyEditor;
