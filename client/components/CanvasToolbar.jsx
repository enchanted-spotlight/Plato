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
          <Button
            floating className="yellow darken-2"
            onClick={() => this.props.saveCanvas()}
            icon="save"
          />
          <Button
            floating className="yellow darken-2"
            href="#"
            onClick={() => this.props.saveCanvasToPNG()}
            icon="get_app"
            download="image.png"
          />
        </span>
        <span className="newCanvas">
          <Button
            floating className="yellow darken-2"
            onClick={() => this.props.newCanvas()}
            icon="not_interested"
            title="New Canvas"
          />
        </span>
        <span className="strokeStyle">
          <Button
            floating className="red"
            onClick={() => this.props.updateStyle('red')}
            title="Red"
          />
          <Button
            floating className="blue"
            onClick={() => this.props.updateStyle('blue')}
            title="Blue"
          />
          <Button
            floating className="green"
            onClick={() => this.props.updateStyle('green')}
            title="Green"
          />
          <Button
            floating className="black"
            onClick={() => this.props.updateStyle('black')}
            title="Black"
          />
          <Button
            floating className="white"
            onClick={() => this.props.updateStyle('white')}
            title="White/Eraser"
          />
        </span>
        <span className="lineWidth">
          <Button
            floating className="yellow darken-2"
            icon="add"
            onClick={() => this.props.incrementLineWidth()}
            title="Increase Line Width"
          />
          <Button
            floating className="yellow darken-2"
            icon="remove"
            onClick={() => this.props.decrementLineWidth()}
            title="Decrease Line Width"
          />
        </span>
        <span className="undoRedo">
          <Button
            floating className="yellow darken-2"
            icon="undo"
            onClick={() => this.props.undo()}
            title="Undo"
          />
          <Button
            floating className="yellow darken-2"
            icon="redo"
            onClick={() => this.props.redo()}
            title="Redo"
          />
        </span>
        <span className="canvasHeight">
          <Button
            floating className="green"
            icon="swap_vert"
            onClick={() => this.props.incrementCanvasHeight()}
            title="Increase Canvas Height"
          />
          <Button
            floating className="green"
            icon="swap_horiz"
            onClick={() => this.props.incrementCanvasWidth()}
            title="Increase Canvas Width"
          />
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
  newCanvas: React.PropTypes.func,
  undo: React.PropTypes.func,
  redo: React.PropTypes.func,
  saveCanvasToPNG: React.PropTypes.func
};

export default CanvasToolbar;
