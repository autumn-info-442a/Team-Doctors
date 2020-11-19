import React, {Component} from 'react';

class LandingPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
      return (
        <div>
            <h1>Where2Test</h1>
            <p className="Descr">Fill out a few questions to find out where the closest COVID-19 testing center is that best fits your needs.</p>
            <button onClick={this.props.startSurvey} type="button" className="Start-btn">START</button>
        </div>
      );
  }
}

export default LandingPage;