import React from 'react';
import { Button, Row, Col } from 'react-materialize';
import { EditorState, Modifier } from 'draft-js';

import { Editor } from 'medium-draft';

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
    // return 'half-baked' results to us.
      // ie, results that arent necessarily correct
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

    // mutable: currentTranscript

    this.state = {
      // this will let us create an empty editor
      currentTranscript: this.props.transcript // createEditorState(),
      // editorState: createEditorState(),
    };

    // add string to the editable portion of the editor
    this.addText = (string) => {
      // get state of the editor, move the selection to end
      // so that we are inserting text at the end
      const editorState = EditorState
        .moveSelectionToEnd(this.state.currentTranscript);
      // get the area that we have selected
      const selection = editorState.getSelection();
      // get contentState so we can insertText
      const contentState = editorState.getCurrentContent();
      // string should equal the text that we are trying to insert
      const insert = Modifier.insertText(contentState, selection, string);
      const newEditorState = EditorState
        .push(editorState, insert, 'insert-fragment');
      this.setState({ currentTranscript: newEditorState });

      // update Session's transcript text.
      this.props.onTranscriptChange(newEditorState);
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
          <Editor
            editorState={this.state.currentTranscript}
            onChange={e => this.props.onTranscriptChange(e)}
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
      </div>
    );
  }
}

SpeechToTextEditor.propTypes = {
  onTranscriptChange: React.PropTypes.func,
  transcript: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.instanceOf(Object)
  ])
};


export default SpeechToTextEditor;
