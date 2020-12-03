import React, {Component} from 'react';

class ErrorResults extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p className="Error-message">We are unable to retrieve your results right now. Please refresh the page and try again.</p>
      </div>
    );
    }
}


export default ErrorResults;