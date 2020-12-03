import React, {Component} from 'react';

class LandingPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
      return (
        <div>
            <h1>Where2Test</h1>
            <p className="Descr">We have created this web app to make finding a COVID-19 testing center easier and more accessible for local Seattle people. Please fill out a few questions to find out where the closest COVID-19 testing center is that best fits your needs.</p>
            <p className="Descr disclaimer">At this moment, this app can only locate testing centers in the Seattle area, and we only support valid Washington addresses.</p>
            <button onClick={this.props.startSurvey} type="button" className="Start-btn">START</button>
            <footer>
            <div>Icons made by <a href="https://smashicons.com/" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
            </footer>
        </div>
      );
  }
}

export default LandingPage;