import React, {Component} from 'react';

class QuestionTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: ""
    };
    this.handleCheck = this.handleCheck.bind(this);
    this.canGoNext = this.canGoNext.bind(this);
  }

  componentWillMount() {
    var currentResponse = this.props.getCurrentResponse();
    this.setState({checked: currentResponse});
  }

  handleCheck = (event) => {
    this.setState({
      checked: event.target.value
    });
    this.props.saveResponse(event.target.value);
  }

  canGoNext() {
    if (this.state.checked !== "Yes" && this.state.checked !== "No") {
      alert("Please make a selection");
    } else {
      this.props.saveResponse(this.state.checked);
      this.props.goNext();
    } 
  }

  render() {
    return (
        <div className="Question-page">
          <div className="Question">
            <p className="Q">{this.props.questionText}<span className="required">*</span></p>
            <div className="Checkboxes">
              <div className="CB">
                <input
                  type="checkbox"
                  id="Yes"
                  name="Yes"
                  value="Yes"
                  className="Box"
                  checked={this.state.checked === "Yes"}
                  onChange={this.handleCheck}
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
                  checked={this.state.checked === "No"}
                  onChange={this.handleCheck}
                />
                <label for="No">No</label>
              </div>
            </div>
          </div>
          <div className="Nav-Buttons">
            <button onClick={this.props.goBack} type="button" className="Nav-btn">
              BACK
            </button>
            <button onClick={this.canGoNext} type="button" className="Nav-btn">
              {this.props.lastQuestion ? "SUBMIT" : "NEXT"}
            </button>
          </div>
        </div>
    );
  }
}

export default QuestionTemplate;