import React, {Component} from 'react';

class TwoQuestionTemplate extends Component {
  
  render() {
    return (
      <div className="Question-page">
        <div className="Question">
          <p className="Q">Do you want a drive-through testing option? <span className="required">*</span></p>
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
        <div className="Question">
          <p className="Q">Would you like a translator available for you? <span className="required">*</span></p>
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
          <button type="button" className="Nav-btn">
            BACK
          </button>
          <button type="button" className="Nav-btn">
            SUBMIT
          </button>
        </div>
      </div>
    );
  }
}

export default TwoQuestionTemplate;