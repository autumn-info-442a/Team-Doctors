import React, {Component} from 'react';

class QuestionTemplate extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <div className="Question-page">
          <div className="Question">
            <p className="Q">Do you have insurance? <span className="required">*</span></p>
            <div className="Checkboxes">
              <div className="CB">
                <input
                  type="checkbox"
                  id="Yes"
                  name="Yes"
                  value="Yes"
                  className="Box"
                />
                <label for="Yes">Yes</label>
              </div>
              <div className="CB">
                <input
                  type="checkbox"
                  id="No"
                  name="No"
                  value="No"
                  className="Box"
                />
                <label for="No">No</label>
              </div>
            </div>
          </div>
          <div className="Nav-Buttons">
            <button onClick={this.props.goBack} type="button" className="Nav-btn">
              BACK
            </button>
            <button onClick={this.props.goNext} type="button" className="Nav-btn">
              NEXT
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default QuestionTemplate;