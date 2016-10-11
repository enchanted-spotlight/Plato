import React from 'react';
import { Button } from 'react-materialize';
import CanvasToolbar from './CanvasToolbar.jsx';

class Canvas extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // imageData containing state of the canvas
      canvasState: '',
      // width of canvas
      canvasWidth: window.innerWidth,
      // height of canvas
      canvasHeight: 500,
      // width of drawing line
      lineWidth: 3,
      // color of the drawing line
      strokeStyle: 'black',
      // no idea wtf this does
      fillStyle: 'black'
    };

    // stack of canvas states to help us implement undo and redo
    this.undoStack = [];
    this.redoStack = [];

    // increases thickness of the drawing lines
    this.incrementLineWidth = (num) => {
      num = num || 1;
      this.setState({ lineWidth: this.state.lineWidth + num });
    };

    // decreases thickness of the drawing lines
    this.decrementLineWidth = (num) => {
      num = num || 1;
      // dont let user decrement below 1
      if (this.state.lineWidth - 1 <= 0) {
        return;
      }
      this.setState({ lineWidth: this.state.lineWidth - 1 });
    };

    // update color & fill color of line
    this.updateStyle = (strokeStyle) => {
      this.setState({
        strokeStyle,
        fillStyle: strokeStyle
      });
    };

    this.incrementCanvasHeight = () => {
      const savedState = this.saveCanvas();
      this.setState({ canvasHeight: this.state.canvasHeight + 250 });
      document.querySelector('.paint').height += 250;
      document.querySelector('#tmpCanvas').height += 250;
      this.loadCanvas(savedState);
    };

    this.incrementCanvasWidth = () => {
      const savedState = this.saveCanvas();
      this.setState({ canvasWidth: this.state.canvasWidth + 250 });
      document.querySelector('.paint').width += 250;
      document.querySelector('#tmpCanvas').width += 250;
      this.loadCanvas(savedState);
    };

    // saveCanvas will save the canvas state to the local state
    // to retrieve, we just take the local state and use loadCanvas()
    this.saveCanvas = () => {
      // getImageData returns an ImageData object that we can use later to
      // load a previous canvas
      const canvasToSave = document.querySelector('.paint');
      const ctxToSave = canvasToSave.getContext('2d');

      const savedCanvas = ctxToSave.getImageData(0, 0, canvasToSave.width, canvasToSave.height);

      // from here we should put savedCanvas into the global store
      this.setState({ canvasState: savedCanvas });
      return savedCanvas;
    };

    this.saveCanvasToPNG = () => {
      const canvasElement = document.querySelector('.paint');

      const MIME_TYPE = 'image/png';

      const imgURL = canvasElement.toDataURL(MIME_TYPE);

      const downloadLink = document.createElement('a');
      downloadLink.download = "image.png";
      downloadLink.href = imgURL;
      downloadLink.dataset.downloadurl = [MIME_TYPE, downloadLink.download, downloadLink.href].join(':');

      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    };

    // give loadCanvas a previously saved canvasState
    this.loadCanvas = (savedCanvas) => {
      console.log('loading a canvas');
      const canvasLoadTarget = document.querySelector('.paint');
      const ctxLoadTarget = canvasLoadTarget.getContext('2d');
      // ctx.putImageData(savedCanvas);

      ctxLoadTarget.clearRect(0, 0, canvasLoadTarget.width, canvasLoadTarget.height);
      ctxLoadTarget.putImageData(savedCanvas, 0, 0);
      this.setState({ canvasState: savedCanvas });
    };

    this.newCanvas = () => {
      const canvasToClear = document.querySelector('.paint');
      const ctxToClear = canvasToClear.getContext('2d');
      ctxToClear.clearRect(0, 0, canvasToClear.width, canvasToClear.height);
    };

    this.undo = () => {
      const canvasToRestore = this.undoStack.pop();
      this.redoStack.push(canvasToRestore);
      this.loadCanvas(canvasToRestore);
      console.log(this.redoStack);
    };

    this.redo = () => {
      console.log('trying to redo');
      const canvasToUndo = this.redoStack.pop();
      this.undoStack.push(canvasToUndo);
      this.loadCanvas(canvasToUndo);
    };

    // this will set up the canvas and the contexts
    this.canvasSetup = (width, height) => {
      const canvas = document.querySelector('.paint');
      const ctx = canvas.getContext('2d');

      const sketch = document.querySelector('.sketch');
      const sketchStyle = getComputedStyle(sketch);
      // canvas.width = parseInt(sketchStyle.getPropertyValue('width'), 10);
      // canvas.height = parseInt(sketchStyle.getPropertyValue('height'), 10);
      canvas.width = width - 25;
      canvas.height = height;

      this.undoStack.push(this.saveCanvas());

      // Creating a tmp canvas
      const tmpCanvas = document.createElement('canvas');
      const tmpCtx = tmpCanvas.getContext('2d');
      tmpCanvas.id = 'tmpCanvas';
      tmpCanvas.width = canvas.width;
      tmpCanvas.height = canvas.height;

      sketch.appendChild(tmpCanvas);

      const mouse = { x: 0, y: 0 };
      const lastMouse = { x: 0, y: 0 };

      // Pencil Points
      let ppts = [];

      const onPaint = () => {
        tmpCtx.lineWidth = this.state.lineWidth;
        tmpCtx.strokeStyle = this.state.strokeStyle;
        tmpCtx.fillStyle = this.state.fillStyle;
        // Saving all the points in an array
        ppts.push({ x: mouse.x, y: mouse.y });

        if (ppts.length < 3) {
          const b = ppts[0];
          tmpCtx.beginPath();
          // ctx.moveTo(b.x, b.y);
          // ctx.lineTo(b.x+50, b.y+50);
          tmpCtx.arc(b.x, b.y, tmpCtx.lineWidth / 2, 0, Math.PI * 2, !0);
          tmpCtx.fill();
          tmpCtx.closePath();

          return;
        }

        // Tmp canvas is always cleared up before drawing.
        tmpCtx.clearRect(0, 0, tmpCanvas.width, tmpCanvas.height);

        tmpCtx.beginPath();
        tmpCtx.moveTo(ppts[0].x, ppts[0].y);

        // eslint-disable-next-line
        for (let i = 1; i < ppts.length - 2; i++) {
          const c = (ppts[i].x + ppts[i + 1].x) / 2;
          const d = (ppts[i].y + ppts[i + 1].y) / 2;

          tmpCtx.quadraticCurveTo(ppts[i].x, ppts[i].y, c, d);
        }

        // For the last 2 points
        tmpCtx.quadraticCurveTo(
          ppts[ppts.length - 2].x,
          ppts[ppts.length - 2].y,
          ppts[ppts.length - 1].x,
          ppts[ppts.length - 1].y
        );
        tmpCtx.stroke();
      };

      /* Mouse Capturing Work */
      tmpCanvas.addEventListener('mousemove', (e) => {
        mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
        mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;
      }, false);


      /* Drawing on Paint App */
      tmpCtx.lineWidth = this.state.lineWidth;
      tmpCtx.strokeStyle = this.state.strokeStyle;
      tmpCtx.fillStyle = this.state.fillStyle;
      tmpCtx.lineJoin = 'round';
      tmpCtx.lineCap = 'round';

      tmpCanvas.addEventListener('mousedown', (e) => {
        tmpCanvas.addEventListener('mousemove', onPaint, false);

        mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
        mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;

        ppts.push({ x: mouse.x, y: mouse.y });

        onPaint();
      }, false);

      tmpCanvas.addEventListener('mouseup', () => {
        tmpCanvas.removeEventListener('mousemove', onPaint, false);

        // Writing down to real canvas now
        ctx.drawImage(tmpCanvas, 0, 0);
        // Clearing tmp canvas
        tmpCtx.clearRect(0, 0, tmpCanvas.width, tmpCanvas.height);

        // Emptying up Pencil Points
        ppts = [];

        // save the context for undo
        const savedCanvas = ctx.getImageData(0, 0, canvas.width, canvas.height);
        // handle first save
        this.undoStack.push(this.state.canvasState);
        this.setState({ canvasState: savedCanvas });
      }, false);
    };
  }

  // eslint-disable-next-line
  componentDidMount() {
    this.canvasSetup(this.state.canvasWidth, this.state.canvasHeight);
  }

  // eslint-disable-next-line
  render() {
    return (
      <div>
        <CanvasToolbar
          incrementLineWidth={this.incrementLineWidth}
          decrementLineWidth={this.decrementLineWidth}
          updateStyle={this.updateStyle}
          saveCanvas={this.saveCanvas}
          loadCanvas={this.loadCanvas}
          newCanvas={this.newCanvas}
          incrementCanvasHeight={this.incrementCanvasHeight}
          incrementCanvasWidth={this.incrementCanvasWidth}
          undo={this.undo}
          redo={this.redo}
          saveCanvasToPNG={this.saveCanvasToPNG}
        />
        <div className="sketch">
          <canvas className="paint" />
        </div>
      </div>
    );
  }
}

export default Canvas;
