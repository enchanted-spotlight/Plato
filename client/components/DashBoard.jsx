import React from 'react';
import { Row, Col } from 'react-materialize';
import { connect } from 'react-redux';
import ChatClientComponent from './ChatClient.jsx';
import SearchBarContainer from './SearchBar.jsx';
import NoteListContainer from './NoteList.jsx';
import MediumEditor from './MediumDraft.jsx';
import SpeechToTextEditor from './SpeechToTextEditor.jsx';

import * as a from './../actions';

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
  onDashBoardLoad: () => dispatch(a.loadUserName())
});

class DashBoard extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.onDashBoardLoad();
  }

  render() {
    return (
      <Row>
        <Col s={2} className="blue-grey lighten-3 base-col-height">
          <SearchBarContainer />
          <div className="blue-grey lighten-3 column-header-lists">
            <h3>All Notes</h3>
          </div>
          <NoteListContainer />
        </Col>
        <Col
          s={5}
          className="base-col-height"
        >
          <MediumEditor />
        </Col>
        <Col s={2} className="grey lighten-2 base-col-height">
          <SpeechToTextEditor />
        </Col>
        <Col
          s={3}
          className="login"
        >
          <ChatClientComponent />
        </Col>
      </Row>
    );
  }
}

DashBoard.propTypes = {
  onDashBoardLoad: React.PropTypes.func,
};

const DashBoardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashBoard);


export default DashBoardContainer;
