import React from 'react';
import { Row, Col, Button } from 'react-materialize';
import { convertToRaw } from 'draft-js';
import { connect } from 'react-redux';
import SpeechToTextEditor from './SpeechToTextEditor.jsx';
import MediumEditor from './MediumDraft.jsx';
import Canvas from './Canvas.jsx';

import * as a from './../actions.js';

// map state properties into Session props
const mapStateToProps = state => ({
  username: state.username,
  currentNote: state.textEditor,
  title: state.sessionTitle,
  currentTranscript: state.speechEditor,
  isSignedIn: state.signinStatus,
  currentCanvas: state.canvasEditor
});

// map dispatched actions to Session props
const mapDispatchToProps = dispatch => ({
  reloadNote: (changedNote, title) => {
    dispatch(a.onTextEditorChange(changedNote));
    dispatch(a.onSessionTitleCreate(title));
  },
  reloadTranscript: (changedTranscript) => {
    dispatch(a.onSpeechEditorChange(changedTranscript));
  },
  saveSession: sessionPkg => (
    dispatch(a.saveSession(sessionPkg))
  ),
  onTitleChange: e => (
    dispatch(a.onSessionTitleCreate(e.target.value))
  ),
  hasSignedIn: bool => dispatch(a.setSignIn(bool))
});

// Note-taking Session class
class Session extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // previous activity prevents not saving cleared notes
      previousActivity: false
    };
    // saves the session to database
    this.submitSession = () => {
      const userTitle = this.props.title;
      const username = this.props.username;

      // PACKAGE FOR NOTES
      // this will let us save the current content as rich text
      const userNote = convertToRaw(this.props.currentNote.getCurrentContent());
      const plainTextContent = this.props.currentNote.getCurrentContent()
        .getPlainText();

      const notePkg = {
        text: JSON.stringify(userNote),
        plainText: JSON.stringify(plainTextContent)
      };

      // PACKAGE FOR TRANSCRIPT
      const userTranscript = convertToRaw(this.props
        .currentTranscript.getCurrentContent());
      const plainTranscriptContent = this.props
        .currentTranscript.getCurrentContent().getPlainText();

      const transcriptPkg = {
        text: JSON.stringify(userTranscript),
        plainText: JSON.stringify(plainTranscriptContent)
      };

      // PACKAGE FOR CANVAS

      // PACKAGE TO BE SENT TO DB:
      const sessionPkg = {
        user_id: username,
        title: userTitle,
        notes: notePkg,
        transcript: transcriptPkg
      };

      // send pkg to db
      this.props.saveSession(sessionPkg);
    };

    // autosave saves session if
    // there was previous activity or either editors have content
    this.autosave = () => {
      if (this.props.currentTranscript
              .getCurrentContent().getPlainText().length > 0
          || this.props.currentNote
            .getCurrentContent().getPlainText().length > 0
          || this.state.previousActivity) {
        this.setState({ previousActivity: true });
        this.submitSession();
      }
    };

    // autosave timer set to a minute
    setInterval(this.autosave, 60000);
  }

  render() {
    return (
      <div>
        <Row>
          <input
            type="text"
            value={this.props.title}
            onChange={this.props.onTitleChange}
            placeholder="Title"
          />
          <Col s={5} className="grey lighten-2 base-col-height">
            <SpeechToTextEditor />
          </Col>

          <Col s={5} className="base-col-height">
            <MediumEditor />
          </Col>
        </Row>
        <Button
          onClick={() => this.submitSession()}
          waves="light"
        >Submit
        </Button>
      </div>
    );
  }
}

Session.propTypes = {
  title: React.PropTypes.string,
  currentNote: React.PropTypes.object,
  currentTranscript: React.PropTypes.object,
  username: React.PropTypes.string,
  saveSession: React.PropTypes.func,
  onTitleChange: React.PropTypes.func
};

const SessionContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Session);

export default SessionContainer;
