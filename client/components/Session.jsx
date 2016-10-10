import React from 'react';
import { Row, Col, Button } from 'react-materialize';
import { convertToRaw } from 'draft-js';
import request from 'superagent';
import { createEditorState } from 'medium-draft';

import SpeechToTextEditor from './SpeechToTextEditor.jsx';
import MediumEditor from './MediumDraft.jsx';

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
    this.state = {
      time: 0,
      username: this.props.username,
      currentNoteTitle: this.props.currentNoteTitle,
      transcript: createEditorState(),
      currentNote: createEditorState()
    };

    this.onTranscriptChange = (transcriptState) => {
      this.setState({ transcript: transcriptState });
    };

    this.onNoteChange = (noteState) => {
      this.setState({ currentNote: noteState });
    };

    // done.
    this.titleChange = (e) => {
      this.setState({ currentNoteTitle: e.target.value });
    };

    this.submitNote = () => {
      const userTitle = this.state.currentNoteTitle;
      const username = this.state.username;
      const url = 'api/save-note';

      // package for notes
      // this will let us save the current content as rich text
      const userNote = convertToRaw(this.state.currentNote.getCurrentContent());
      const plainTextContent = this.state.currentNote.getCurrentContent()
        .getPlainText();

      const notePkg = {
        text: JSON.stringify(userNote),
        plainText: JSON.stringify(plainTextContent)
      };

      // package for transcript
      const userTranscript = convertToRaw(this.state
        .transcript.getCurrentContent());
      const plainTranscriptContent = this.state
        .transcript.getCurrentContent().getPlainText();

      // package for transcript
      const transcriptPkg = {
        text: JSON.stringify(userTranscript),
        plainText: JSON.stringify(plainTranscriptContent)
      };

      console.log(transcriptPkg, 'transcript package');

      const pkg = {
        time: this.state.time,
        user_id: username, // string
        title: userTitle, // string
        notes: notePkg, // object
        transcript: transcriptPkg // object
      };

      console.log(pkg, 'this willl be sent. this is the package!!!');

      // send pkg to db
      request
        .post(url)
        .send(pkg)
        .set('Accept', 'application/json')
        .end((err) => {
          if (err) {
            console.log('There is an error in submitNote: ', err);
          } else {
            // fetch notes
            // this.props.fetchNotes(this.state.username);

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
              transcript={this.state.transcript}
              fetchNotes={this.props.fetchNotes}
              titleChange={this.titleChange}
              onTranscriptChange={this.onTranscriptChange}
            />
          </Col>

          <Col s={8} className="base-col-height">
            <MediumEditor
              currentNote={this.state.currentNote}
              currentNoteTitle={this.state.currentNoteTitle}
              fetchNotes={this.props.fetchNotes}
              titleChange={this.titleChange}
              onNoteChange={this.onNoteChange}
            />
          </Col>
        </Row>
        <Button
          onClick={() => this.submitNote()}
          waves="light"
        >Submit
        </Button>
      </div>
    );
  }
}

Session.propTypes = {
  fetchNotes: React.PropTypes.func,
  currentNoteTitle: React.PropTypes.string,
  username: React.PropTypes.string,
};

export default Session;
