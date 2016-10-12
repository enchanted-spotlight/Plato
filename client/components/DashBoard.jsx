import React from 'react';
import { Row, Col } from 'react-materialize';
import { connect } from 'react-redux';
import ChatClientComponent from './ChatClient.jsx';
import SearchBarContainer from './SearchBar.jsx';
import NoteListContainer from './NoteList.jsx';
import SessionContainer from './Session.jsx';
import Canvas from './Canvas.jsx';

import * as a from './../actions';
// eslint-disable-next-line 
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
  onDashBoardLoad: () => dispatch(a.loadUserName())
});

class DashBoard extends React.Component {
// eslint-disable-next-line 
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.onDashBoardLoad();
  }
// eslint-disable-next-line 
  render() {
    return (
      <div>
        <Row>
          <Col s={3} className="blue-grey lighten-3 base-col-height">
            <SearchBarContainer />
            <div className="blue-grey lighten-3 column-header-lists">
              <h3>All Notes</h3>
            </div>
            <NoteListContainer />
          </Col>
          <Col s={6} className="base-col-height">
            <SessionContainer />
          </Col>
          <Col s={3} className="login">
            <ChatClientComponent />
          </Col>
        </Row>
        <Row>
          <Col s={12} className="base-col-height">
            <Canvas />
          </Col>
        </Row>
      </div>
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
