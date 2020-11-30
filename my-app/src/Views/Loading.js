import React, {Component} from 'react';

class Loading extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Loading-page">
        <p className="Error-message">Please wait a moment while we retrieve your results.</p>
        <div class="loader"></div>
      </div>
    );
    }
}


export default Loading;