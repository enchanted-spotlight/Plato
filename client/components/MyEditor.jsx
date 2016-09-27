import React from 'react';
// import { Editor, EditorState } from 'draft-js';

class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: []
    };
  }

  render() {
    return (
      <div>
        <h1>{this.props.notes}</h1>
      </div>
    );
  }
}


MyEditor.propTypes = {
  notes: React.PropTypes.Array
};

export default MyEditor;
