import React from 'react';
import { Editor, EditorState, Modifier } from 'draft-js';
import SpeechToText from './SpeechToText.jsx';

class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    };

    this.onChange = (editorState) => {
      // console.log(editorState);
      this.setState({ editorState });
    };

    this.logState = () => {
      // console.log(event);
      console.log(this.state.editorState.getCurrentContent().getPlainText());
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
    return (
      <div>
        <div>
          <SpeechToText addText={string => this.addText(string)} />
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            placeholder="Enter something please"
          />
        </div>
        <div>
          <input
            onClick={this.logState}
            type="button"
            value="Log State"
          />
        </div>
      </div>

    );
  }
}


// MyEditor.propTypes = {
//   notes: React.PropTypes.Array
// };

export default MyEditor;
