import React, {Component} from 'react';

class ErrorMessage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p className="Error-message">Sorry, something went wrong on our end. Unable to retrieve any results right now, please try again later.</p>
      </div>
    );
    }
}


export default ErrorMessage;