import React from 'react';


class EditorToolbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <button onClick={this.props.toggleBold}>
          Bold
        </button>
        <button onClick={this.props.toggleItalic}>
          Italic
        </button>
        <button onClick={this.props.toggleUnderline}>
          Underline
        </button>
        <button onClick={this.props.toggleCode}>
          Code
        </button>
        <button onClick={this.props.toggleStrikethrough}>
          Strikethrough
        </button>
      </div>
    );
  }
}

export default EditorToolbar;

EditorToolbar.propTypes = {
  toggleBold: React.PropTypes.func,
  toggleItalic: React.PropTypes.func,
  toggleUnderline: React.PropTypes.func,
  toggleCode: React.PropTypes.func,
  toggleStrikethrough: React.PropTypes.func,
};
