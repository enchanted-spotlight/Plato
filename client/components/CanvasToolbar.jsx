import React from 'react';
import { Button } from 'react-materialize';

class CanvasToolbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      width: '',
      height: ''
    };

    this.updateWidth = (e) => {
      this.setState({ width: e.target.value });
    };

    this.updateHeight = (e) => {
      this.setState({ height: e.target.value });
    };
  }

  // eslint-disable-next-line
  render() {
    return (
      <div>
        <span className="saveCanvas">
          <Button floating className="red" onClick={() => this.props.saveCanvas()} icon="save" />
        </span>
        <span className="newCanvas">
          <Button floating className="red" onClick={() => this.props.newCanvas()} icon="not_interested" />
        </span>
        <span className="strokeStyle">
          <Button floating className="red" onClick={() => this.props.updateStyle("red")} />
          <Button floating className="blue" onClick={() => this.props.updateStyle("blue")} />
          <Button floating className="green" onClick={() => this.props.updateStyle("green")} />
          <Button floating className="black" onClick={() => this.props.updateStyle("black")} />
        </span>
        <span className="lineWidth">
          <Button floating className="red" icon="add" onClick={() => this.props.incrementLineWidth()} />
          <Button floating className="red" icon="remove" onClick={() => this.props.decrementLineWidth()} />
        </span>
        <span className="canvasHeight">
          <Button floating className="green" icon="swap_vert" onClick={() => this.props.incrementCanvasHeight()} />
          <Button floating className="green" icon="swap_horiz" onClick={() => this.props.incrementCanvasWidth()} />
        </span>
      </div>
    );
  }
}

CanvasToolbar.propTypes = {
  saveCanvas: React.PropTypes.func,
  updateStyle: React.PropTypes.func,
  incrementLineWidth: React.PropTypes.func,
  decrementLineWidth: React.PropTypes.func,
  incrementCanvasHeight: React.PropTypes.func,
  incrementCanvasWidth: React.PropTypes.func,
  newCanvas: React.PropTypes.func
};

export default CanvasToolbar;
