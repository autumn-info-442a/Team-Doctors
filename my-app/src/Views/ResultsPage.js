import React, {Component} from 'react';

class ResultsPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
      return (
        <div>
            <div>
                <p className="Result-intro">Here are the testing centers you should go to based on your selections:</p>
                <p className="Result-explanation">They are filtered based on your preferences and ordered based on closest location.</p>
            </div>
            <div className="Result-section-flexbox">
                <div className="Single-result-flexbox">
                    <div className="Result-card">
                        <p className="Testing-center">Sample Testing Center</p>
                        <p className="Testing-center-address">12345 10th St, Seattle, WA 98105</p>
                        <p className="Testing-center-hours">Open: Mon-Fri</p>
                        <div className="Card-bottom">
                            <div className="Testing-phone">
                                <p>555-555-5555</p>
                            </div>
                            <div className="Testing-distance">
                                <p>3 miles</p>
                            </div>
                        </div>
                    </div>
                    <div className="Criteria-checklist">
                        <p>\u2713 Sample Criteria 1</p>
                        <p>\u2713 Sample Criteria 2</p>
                    </div>
                </div>
            </div>
        </div>
      );
  }
}

export default ResultsPage;