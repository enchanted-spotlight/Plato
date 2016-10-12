import React from 'react';
import { Button, Row, Col } from 'react-materialize';
import { EditorState, Modifier } from 'draft-js';
import { connect } from 'react-redux';
import { createEditorState, Editor } from 'medium-draft';
import * as a from './../actions.js';

const mapStateToProps = state => ({
  currentTranscript: state.speechEditor
});

const mapDispatchToProps = dispatch => ({
  reloadTranscript: (newSpeechEditor) => {
    dispatch(a.onSpeechEditorChange(newSpeechEditor));
  }
});

class SpeechToTextEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // this will let us create an empty editor
      editorState: createEditorState(),
      title: '',
      language: 'en-US'
    };

    this.recording = false;

    // this.recording = this.state.recording;
    // transcript will hold our audio transcript
    window.transcript = '';
    // this will prompt user for access to their microphone
    // eslint-disable-next-line no-undef
    this.recognition = new webkitSpeechRecognition();
    // set language that we will be transcribing
    this.recognition.lang = this.state.language;
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
      const editorState = EditorState
        .moveSelectionToEnd(this.props.currentTranscript);
      // get the area that we have selected
      const selection = editorState.getSelection();
      // get contentState so we can insertText
      const contentState = editorState.getCurrentContent();
      // string should equal the text that we are trying to insert
      const insert = Modifier.insertText(contentState, selection, string);
      const newEditorState = EditorState
        .push(editorState, insert, 'insert-fragment');
      // this.setState({ currentTranscript: newEditorState });

      // update Session's transcript text.
      this.props.reloadTranscript(newEditorState);
    };

    this.toggleRecordingState = () => {
      // toggling state is NOT instantaneous!!

      // toggle local state
      this.recording = !this.recording;
      console.log('speech recording state: ', this.recording);

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
    console.log('props in stt: ', this.props);
    return (
      <div>
        <Row>
          <Editor
            editorState={this.props.currentTranscript}
            onChange={e => this.props.reloadTranscript(e)}
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
  reloadTranscript: React.PropTypes.func,
  currentTranscript: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.instanceOf(Object)
  ]),
  fetchNotes: React.PropTypes.func,
  username: React.PropTypes.string
};

const SpeechToTextEditorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SpeechToTextEditor);

export default SpeechToTextEditorContainer;
