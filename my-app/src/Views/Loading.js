import React, {Component} from 'react';

class Loading extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p className="Error-message">Please wait a moment while we retrieve your results.</p>
      </div>
    );
    }
}


export default Loading;