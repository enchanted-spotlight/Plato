import React from 'react';

class SpeechToText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transcript: '',
      language: 'en-US'
    };
  }

  componentDidMount() {
    this.recording = false;
    window.finalTranscript = '';
    this.recognition = new webkitSpeechRecognition();
    this.recognition.lang = 'en-US';
    this.recognition.continuous = true;
    this.recognition.intermResults = false;
    this.recognition.onresult = (event) => {
      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        if (event.results[i].isFinal) {
          window.finalTranscript += event.results[i][0].transcript;
        }
      }
      this.props.addText(window.finalTranscript);
    };
  }

  toggleRecordingState() {
    // toggling state is NOT instantaneous!!
    this.recording = !this.recording;
    if (!this.recording) {
      window.finalTranscript = '';
      this.recognition.stop();
    } else {
      this.recognition.start();
    }
  }

  render() {
    return (
      <div>
        <button onClick={() => this.toggleRecordingState()}> TOGGLE SPEECH TO TEXT </button>
      </div>
    );
  }
}

SpeechToText.propTypes = {
  addText: React.Proptypes.Function
};

export default SpeechToText;
