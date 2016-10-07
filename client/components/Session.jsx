import React from 'react';
import { Row, Col } from 'react-materialize';

import SpeechToTextEditor from './SpeechToTextEditor.jsx';
import MyEditor from './MyEditor.jsx';

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
      transcript: '',
      currentNote: this.props.currentNote,
      username: this.props.username
    };
  }

  render() {
    console.log(this.props, 'props');
    return (
      <Row>
        <Col s={2} className="grey lighten-2 base-col-height">
          <SpeechToTextEditor
            username={this.state.username}
            fetchNotes={this.props.fetchNotes}
          />
        </Col>
        <Col s={8} className="base-col-height">
          <MyEditor
            username={this.state.username}
            currentNote={this.state.currentNote}
            currentNoteTitle={this.state.currentNoteTitle}
            fetchNotes={this.props.fetchNotes}
          />
        </Col>
      </Row>
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
