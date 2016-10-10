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
      currentNoteTitle: this.props.currentNoteTitle,
      transcript: createEditorState(), // '',
      currentNote: this.props.currentNote,
    };

    // this method should mirror the MyEditor component
    this.onChange = (editorState) => {
      console.log(editorState, 'speech to text state');
      this.setState({ currentNote: editorState });
      console.log(editorState, 'speech to text changed');
    };

    this.titleChange = (e) => {
      this.setState({ currentNoteTitle: e.target.value });
    };

    // this method should mirror the MyEditor component
    this.submitNote = () => {
      // this will let us save the current content as rich text
      const userNote = convertToRaw(this.state.currentNote.getCurrentContent());
      const plainTextContent = this.state.currentNote.getCurrentContent().getPlainText();
      const userTitle = this.state.title;
      const username = this.props.username;
      const url = 'api/save-note';

      const toBeSent = {
        user_id: username,
        text: JSON.stringify(userNote),
        plainText: JSON.stringify(plainTextContent),
        title: userTitle
      };

      console.log(toBeSent, 'to be sent!!!!');

      // submit the note to the server for storage in db
      // request
      //   .post(url)
      //   .send({
      //     user_id: username,
      //     text: JSON.stringify(userNote),
      //     plainText: JSON.stringify(plainTextContent),
      //     title: userTitle
      //   })
      //   .set('Accept', 'application/json')
      //   .end((err) => {
      //     if (err) {
      //       console.log('There is an error in submitNote: ', err);
      //     } else {
      //       this.props.fetchNotes(this.props.username);
      //     }
      //   });
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
              onTranscriptChange={this.onChange}
            />
          </Col>

          <Col s={8} className="base-col-height">
            <MediumEditor
              currentNote={this.state.currentNote}
              currentNoteTitle={this.state.currentNoteTitle}
              fetchNotes={this.props.fetchNotes}
              titleChange={this.titleChange}
              onNoteChange={this.onChange}
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
  currentNote: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.instanceOf(Object)
  ]),
  username: React.PropTypes.string
};

export default Session;
