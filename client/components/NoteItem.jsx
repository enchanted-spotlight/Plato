import React from 'react';
import { Button } from 'react-materialize';
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
  deleteNote: (noteId, username) => (
    dispatch(a.deleteNote(noteId, username))
  )
});

class NoteItem extends React.Component {
  constructor(props) {
    console.log(props);
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
            console.log(err);
            console.log('Error sharing notes ... ');
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
        <p>{this.props.title}</p>
        <Button
          onClick={() => {
            const newEditorState = createEditorState(JSON.parse(this.props.text));
            this.props.loadNote(newEditorState, this.props.title);

            // const newEditorState = createEditorState(JSON.parse(this.props.text));
            // this.props.store.dispatch(a.onTextEditorChange(newEditorState));
            // this.props.store.dispatch(a.onSessionTitleCreate(this.props.title));
          }}
        > display </Button>
        <Button
          onClick={() => {
            this.props.deleteNote(this.props.noteId, this.props.username);

            // this.props.store.dispatch(a.deleteNote(this.props.noteId, this.props.username));
          }}
          waves="light"
        > deleteNote </Button>
        <Button onClick={this.toggleDisplayShare}>
          SHARE
        </Button>
        {this.state.displayShare ?
          <form onSubmit={this.shareNote}>
            <input
              type="email"
              placeholder="E-mail address"
              onChange={e => this.setState({ email: e.target.value })}
            />
            <input type="submit" value="share" />
          </form> : null
        }
      </li>
    );
  }
}

NoteItem.propTypes = {
  title: React.PropTypes.string,
  noteId: React.PropTypes.string,
  username: React.PropTypes.string,
  text: React.PropTypes.string,
  loadNote: React.PropTypes.func,
  deleteNote: React.PropTypes.func
};

const NoteItemContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteItem);


export default NoteItemContainer;
