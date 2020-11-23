import { render } from '@testing-library/react';
import React, {Component} from 'react';

class ResultsPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.computeResults();
  }

  render() {
      const results = this.props.results;
      var resultsDisplay = [];
      for (var i = 0; i < results.length; i++) {
        resultsDisplay.push(
          <div id={i} className="Result-section-flexbox">
            <div className="Single-result-flexbox">
                <div className="Result-card">
                    <p className="Testing-center">{results[i].name}</p>
                    <p className="Testing-center-address">{results[i].address}</p>
                    <p className="Testing-center-hours">Open: Mon-Fri</p>
                    <div className="Card-bottom">
                        <div>
                            <p className="Testing-phone">{results[i].phone}</p>
                        </div>
                        <div>
                            <p className="Testing-distance">{results[i].distanceAway + " mi"}</p>
                        </div>
                    </div>
                </div>
                <div className="Criteria-checklist">
                    <p className="Criteria"><span className="Checkmark">&#10003;</span> Sample Criteria 1</p>
                    <p className="Criteria"><span className="Checkmark">&#10003;</span> Sample Criteria 2</p>
                </div>
            </div>
          </div>
        );
      }

      return (
        <div>
            <div>
                <p className="Result-intro">Here are the testing centers you should go to based on your selections:</p>
                <p className="Result-explanation">They are filtered based on your preferences and ordered based on closest location.</p>
            </div>
            <div>
              {resultsDisplay}
            </div>
        </div>
      );
  }
}

export default ResultsPage;