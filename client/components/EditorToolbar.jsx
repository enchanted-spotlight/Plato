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
          I BOLD THINGS
        </button>
        <button onClick={this.props.toggleItalic}>
          I ITALICIZE THINGS
        </button>
        <button onClick={this.props.toggleUnderline}>
          I UNDERLINE THINGS
        </button>
        <button onClick={this.props.toggleCode}>
          I CODIFY THINGS
        </button>
        <button onClick={this.props.toggleStrikethrough}>
          I STRIKETHROUGH
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
