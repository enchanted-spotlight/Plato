import React from 'react';
import { Row, Col, Button } from 'react-materialize';
import { createEditorState } from 'medium-draft';
import { connect } from 'react-redux';
import request from 'superagent';

import * as a from './../actions.js';

const mapStateToProps = state => ({
  username: state.username
});
const mapDispatchToProps = dispatch => ({
  loadNote: (newEditorState, title) => {
    dispatch(a.onTextEditorChange(newEditorState));
    dispatch(a.onSessionTitleCreate(title));
  },
  loadTranscript: (newEditorState) => {
    dispatch(a.onSpeechEditorChange(newEditorState));
  },
  loadCanvas: (newCanvasState) => {
    dispatch(a.onCanvasChange(newCanvasState));
  },
  deleteNote: (noteId, username) => (
    dispatch(a.deleteSession(noteId, username))
  )
});

class NoteItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayShare: false,
      email: ''
    };

    this.toggleDisplayShare = () => {
      this.setState({
        displayShare: !this.state.displayShare
      });
    };

    // take noteId and e-mail, send post request to db to get
    // db to look up the noteId and create a new noteId under
    // that user's name
    this.shareNote = (e) => {
      e.preventDefault();
      this.toggleDisplayShare();
      request
        .post('/api/social/share-note')
        .send({
          noteId: this.props.noteId,
          email: this.state.email,
          originEmail: this.props.username
        })
        .end((err, res) => {
          if (err) {
            console.log('Error sharing notes ... ', err);
          } else {
            // success
            console.log('Shared the note!');
          }
        });
    };
  }

  render() {
    return (
      <li>
        <div className="card red darken-1">
          <div className="card-content white-text center-align">
            <span className="center-align card-title">{this.props.title}</span>
            <Row className="center-align">

              <Col s={4} className="center-align">
                <Button
                  onClick={() => {
                    // get new store state for editors
                    const newNoteState =
                      createEditorState(JSON.parse(this.props.notesText));
                    const newTranscriptState =
                      createEditorState(JSON.parse(this.props.transcriptText));
                    // load each editor onto page.
                    this.props.loadNote(newNoteState, this.props.title);
                    this.props.loadTranscript(newTranscriptState);
                    this.props.loadCanvas(JSON.parse(this.props.canvas));
                  }}
                  waves="light"
                  icon="open_in_browser"
                  className="red"
                />
              </Col>

              <Col s={4}>
                <Button
                  onClick={() => {
                    this.props.deleteNote(this.props.noteId, this.props.username);
                  }}
                  waves="light"
                  icon="delete_forever"
                  className="red"
                />
              </Col>

              <Col s={4}>
                <Button
                  onClick={this.toggleDisplayShare}
                  waves="light"
                  icon="rss_feed"
                  className="red"
                />
              </Col>

              {this.state.displayShare ?
                <form onSubmit={this.shareNote} className="">
                  <input
                    type="email"
                    id="email"
                    placeholder="E-mail"
                    className="center-align"
                    onChange={e => this.setState({ email: e.target.value })}
                  />
                  <input type="submit" value="share" />
                </form>
                : null
              }

            </Row>
          </div>
        </div>
      </li>
    );
  }
}

NoteItem.propTypes = {
  title: React.PropTypes.string,
  noteId: React.PropTypes.string,
  username: React.PropTypes.string,
  transcriptText: React.PropTypes.string,
  notesText: React.PropTypes.string,
  loadNote: React.PropTypes.func,
  loadTranscript: React.PropTypes.func,
  deleteNote: React.PropTypes.func,
  loadCanvas: React.PropTypes.func,
  canvas: React.PropTypes.object
};

const NoteItemContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteItem);


export default NoteItemContainer;
