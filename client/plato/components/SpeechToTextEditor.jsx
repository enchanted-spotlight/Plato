import React from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';
import { Button, Row, Col } from 'react-materialize';
import { EditorState, Modifier, convertToRaw } from 'draft-js';
import { Editor, createEditorState } from 'medium-draft';

class SpeechToTextEditor extends React.Component {
  constructor(props) {
    super(props);

    this.recording = false;
    // transcript will hold our audio transcript
    window.transcript = '';
    // this will prompt user for access to their microphone
    this.recognition = new webkitSpeechRecognition();
    // set language that we will be transcribing
    this.recognition.lang = 'en-US';
    // continuous = true means transcription wont stop when there's
    // an audio pause. ie, we keep transcribing until told not to
    this.recognition.continuous = true;
    // interim results = true will have the transcription process
    // return 'half-baked' results to us. ie, results that arent necessarily correct
    this.recognition.interimResults = false;
    // we are going to use these variables to determine whether or not we should
    // put the next phrase on a new line/sentence
    this.lastEventTime = undefined;
    this.currentTime = new Date();

    // function that we will fire every time an event happens, basically
    // everytime a phrase is transcribed
    this.recognition.onresult = (event) => {
      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        if (event.results[i].isFinal) {
          window.transcript += event.results[i][0].transcript;
        }
      }
      // the very first time we insert a phrase, we shouldn't be inserting
      // a period
      if (this.lastEventTime === undefined) {
        this.lastEventTime = new Date();
      }

      this.currentTime = new Date();
      if (this.currentTime - this.lastEventTime > 3500) {
        this.addText('\n');
        this.lastEventTime = new Date();
      }
      // reset our lastEventTime to match our currentTime
      this.addText(window.transcript);
      // reset transcript to nothing so that we aren't duplicating results
      window.transcript = '';
    };

    this.state = {
      // this will let us create an empty editor
<<<<<<< 662a795b1dcb095f95bb35c802bec59b979128ff:client/plato/components/SpeechToTextEditor.jsx
      editorState: EditorState.createEmpty(),
      title: ''
=======
      editorState: createEditorState(),
      title: '',
>>>>>>> Move to medium-draft, polish oAuth, send plain text:client/components/SpeechToTextEditor.jsx
    };

    // this method should mirror the MyEditor component
    this.onChange = (editorState) => {
      this.setState({ editorState });
    };

    // this method should mirror the MyEditor component
    this.titleChange = (event) => {
      this.setState({ title: event.target.value });
    };

    // this method should mirror the MyEditor component
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
            this.props.fetchNotes(this.props.username);
          }
        });
    };

    // add string to the editable portion of the editor
    this.addText = (string) => {
      // get state of the editor, move the selection to end
      // so that we are inserting text at the end
      const editorState = EditorState.moveSelectionToEnd(this.state.editorState);
      // get the area that we have selected
      const selection = editorState.getSelection();
      // get contentState so we can insertText
      const contentState = editorState.getCurrentContent();
      // string should equal the text that we are trying to insert
      const insert = Modifier.insertText(contentState, selection, string);
      const newEditorState = EditorState.push(editorState, insert, 'insert-fragment');
      this.setState({ editorState: newEditorState });
    };

    this.toggleRecordingState = () => {
      // toggling state is NOT instantaneous!!
      this.recording = !this.recording;
      if (!this.recording) {
        window.transcript = '';
        this.recognition.stop();
        console.log('Stopped the recording!');
      } else {
        this.recognition.start();
        console.log('Started the recording!');
      }
    };
  }

  render() {
    return (
      <div>
        <Row>
          <input
            type="text"
            value={this.state.value}
            onChange={this.titleChange}
            placeholder="Title"
          />
          <Editor
            editorState={this.state.editorState}
            onChange={e => this.onChange(e)}
            placeholder="This is your audio transcription... "
          />
        </Row>
        <Row>
          <Col s={12} className="center-align">
            <Button
              onClick={() => this.toggleRecordingState()}
              floating className="red" icon="voicemail"
            />
          </Col>
        </Row>
        <Row>
          <Col s={12} className="right-align">
            <Button onClick={this.submitNote} waves="light">Submit</Button>
          </Col>
        </Row>
      </div>
    );
  }
}

SpeechToTextEditor.propTypes = {
  username: React.PropTypes.string,
  fetchNotes: React.PropTypes.func
};


export default SpeechToTextEditor;
