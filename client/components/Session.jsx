import React from 'react';
import { Row, Col, Button } from 'react-materialize';
import { convertToRaw } from 'draft-js';
import request from 'superagent';
import { createEditorState } from 'medium-draft';

import SpeechToTextEditor from './SpeechToTextEditor.jsx';
import MediumEditor from './MediumDraft.jsx';
import * as t from './../actions';

class Session extends React.Component {
  constructor(props) {
    super(props);
    /*
    eventually, cache will need to send obj whose props are: TTTNN
      time
      title
      text from transcript
      text from notes
      username
    */
    this.recording = false;
    this.time = 0;

    this.state = {
      index: this.time / 5,
      username: this.props.username,
      currentNoteTitle: this.props.currentNoteTitle,
      transcript: createEditorState(),
      currentNote: createEditorState(),
      dispatch: this.props.dispatcher
    };
    this.toggleTimer = () => {
      this.recording = !this.recording;
      // if recording,
      if (this.recording) {
        // start timer
        this.timer();
      }
    };

    this.timer = () => {
      console.log('timer invoked!!!!!!!!!!');
      setTimeout(this.recordTimeAndChunk, 5000);
    };

    this.recordTimeAndChunk = () => {
      this.time += 5;
      console.log('time! ', this.time);
      if (this.recording) {
        this.timer();
      }
    };

    this.onTranscriptChange = (transcriptState) => {
      this.setState({ transcript: transcriptState });
    };

    this.onNoteChange = (noteState) => {
      this.setState({
        currentNote: noteState
      });
    };

    // done.
    this.titleChange = (e) => {
      this.setState({ currentNoteTitle: e.target.value });
    };

    this.submitNote = () => {
      const userTitle = this.state.currentNoteTitle;
      const username = this.state.username;
      const url = 'api/save-note';

      // PACKAGE FOR NOTES
      // this will let us save the current content as rich text
      const userNote = convertToRaw(this.state.currentNote.getCurrentContent());
      const plainTextContent = this.state.currentNote.getCurrentContent()
        .getPlainText();

      const notePkg = {
        text: JSON.stringify(userNote),
        plainText: JSON.stringify(plainTextContent)
      };

      // PACKAGE FOR TRANSCRIPT
      const userTranscript = convertToRaw(this.state
        .transcript.getCurrentContent());
      const plainTranscriptContent = this.state
        .transcript.getCurrentContent().getPlainText();

      const transcriptPkg = {
        text: JSON.stringify(userTranscript),
        plainText: JSON.stringify(plainTranscriptContent)
      };

      // PACKAGE TO BE SENT TO DB:
      const sessionPkg = {
        user_id: username, // string
        title: userTitle, // string
        notes: notePkg, // object
        transcript: transcriptPkg // object
      };

      // send pkg to db
      request
        .post(url)
        .send(sessionPkg)
        .set('Accept', 'application/json')
        .end((err) => {
          if (err) {
            console.log('There is an error in submitNote: ', err);
          } else {
            // fetch notes
            // this.props.fetchNotes(this.state.username);
            // this.props.savedNotes();
            console.log(
              'Pending post implementation, but this ' +
              'session package should be sent to db: '
              , sessionPkg);
            this.state.dispatch(t.fetchNotes, this.state.username);
          }
        });
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      currentNote: newProps.currentNote,
      currentNoteTitle: newProps.currentNoteTitle
    });
  }

  render() {
    console.log(this.props, 'session props');
    console.log(this.state, 'session state');
    return (
      <div>
        <Row>
          <input
            type="text"
            value={this.state.title}
            onChange={this.titleChange}
            placeholder="Title"
          />
          <Col s={2} className="grey lighten-2 base-col-height">
            <SpeechToTextEditor
              toggleTimer={this.toggleTimer}
              transcript={this.state.transcript}
              onTranscriptChange={this.onTranscriptChange}
            />
          </Col>

          <Col s={8} className="base-col-height">
            <MediumEditor
              currentNote={this.state.currentNote}
              currentNoteTitle={this.state.currentNoteTitle}
              onNoteChange={this.onNoteChange}
              submitNote={this.submitNote}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

Session.propTypes = {
  dispatcher: React.PropTypes.func,
  currentNoteTitle: React.PropTypes.string,
  username: React.PropTypes.string,
};

export default Session;
