import { render } from '@testing-library/react';
import React, {Component} from 'react';
import Loading from './Loading';

class ResultsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentWillMount() {
    this.props.computeResults();
  }

  componentDidMount() {
    this.setState({loading: false});
  }

  render() {
      const results = this.props.results;
      const loading = this.props.loading;

      // get results to display
      var resultsDisplay = [];
      for (var i = 0; i < results.length; i++) {
        var criteriaDisplay = [];
        for (var c in results[i].criteriaAvailable) {
          criteriaDisplay.push(
          <p className="Criteria"><span className="Checkmark">&#10003;</span>{results[i].criteriaAvailable[c]}</p>
          );
        }
        for (var c in results[i].criteriaNotAvailable) {
          criteriaDisplay.push(
            <p className="Criteria"><span className="x-mark"></span>{results[i].criteriaNotAvailable[c]}</p>
          );
        }

        resultsDisplay.push(
          <div key={i} className="Result-section-flexbox">
            <div className="Single-result-flexbox">
                <div className="Result-card">
                    <p className="Testing-center"><a href={results[i].websiteUrl}>{results[i].name}</a></p>
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
                    {criteriaDisplay}
                </div>
            </div>
          </div>
        );
      }

      return (
        this.props.results.length > 0 ? <div>
            <div>
                <p className="Result-intro">Here are the testing centers you should go to based on your selections:</p>
                <p className="Result-explanation">They are filtered based on your preferences and ordered based on closest location.</p>
            </div>
            <div>
              {resultsDisplay}
            </div>
        </div> : <Loading></Loading>
      );
  }
}

export default ResultsPage;