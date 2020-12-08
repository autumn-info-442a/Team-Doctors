import { render } from '@testing-library/react';
import React, {Component} from 'react';
import Loading from './Loading';

class ResultsPage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.computeResults();
  }

  render() {
      const results = this.props.results;
      const lastUpdated = this.props.lastUpdated;

      // get results to display
      var resultsDisplay = [];
      for (var i = 0; i < results.length; i++) {
        var criteriaDisplay = [];
        for (var c in results[i].criteriaAvailable) {
          criteriaDisplay.push(
          <p className="Criteria"><span className="Checkmark">&#10003; </span>{results[i].criteriaAvailable[c]}</p>
          );
        }
        for (var c in results[i].criteriaNotAvailable) {
          criteriaDisplay.push(
            <p className="Criteria"><span className="x-mark">&#10007; </span>{results[i].criteriaNotAvailable[c]}</p>
          );
        }

        resultsDisplay.push(
          <div key={i} className="Result-section-flexbox">
            <div className="Single-result-flexbox">
                <div className="Result-card">
                    <p className="Testing-center"><a className="black-link" href={results[i].websiteUrl} target="_blank">{results[i].name}</a></p>
                    <p className="Testing-center-address"><a href={"http://maps.google.com/?q=" + results[i].address} target="_blank">{results[i].address}</a></p>
                    <p className="Testing-center-hours">Open: Mon-Fri</p>
                    <div className="Card-bottom">
                        <div>
                            <p className="Testing-phone"><a href={"tel:" + results[i].phone} target="_blank">{results[i].phone}</a></p>
                        </div>
                        <div>
                            <p className="Testing-distance">{results[i].distanceAway + " mi"}</p>
                        </div>
                    </div>
                </div>
                <div className="Criteria-checklist">
                    {criteriaDisplay}
                </div>
            </div>
          </div>
        );
      }

      return (
        this.props.results.length > 0 && this.props.lastUpdated.length > 0 ? <div>
            <div>
                <p className="Result-intro">Here are the testing centers you should go to based on your selections:</p>
                <p className="Result-explanation">They are filtered based on your preferences and ordered based on closest distance to: <span className="Result-address">{this.props.originAddress}</span>.</p>
                <p className="Result-explanation last-updated">Testing center information last updated on: <span className="updated-date">{this.props.lastUpdated[0]}</span></p>
            </div>
            <div>
              {resultsDisplay}
            </div>
            <div>
              <p className="end-note">Refresh the page to take the survey again.</p>
            </div>
        </div> : <Loading></Loading>
      );
  }
}

export default ResultsPage;