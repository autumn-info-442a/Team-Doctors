import React, {Component} from 'react';

class LocationQuestion extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Question-page">
        <div className="Question">
          <p className="Q">
            Please enter a location. <span className="required">*</span>
          </p>
        </div>
        <div className="Location-form">
            <form className="Full-address">
                <div className="Address-field">
                    <input type="text" id="Address" name="Address"></input>
                    <label for="Address">Address</label>
                </div>
                <div className="City-field">
                    <input type="text" id="City" name="City"></input>
                    <label for="City">City</label>
                </div>
                <div className="State-field">
                    <input type="text" id="State" name="State"></input>
                    <label for="State">State</label>
                </div>
                <div className="Zip-field">
                    <input type="text" id="Zip" name="Zip"></input>
                    <label for="Zip">Zip</label>
                </div>
            </form>
        </div>
        <div className="Nav-Buttons">
          <button onClick={this.props.goNext} type="button" className="Nav-btn Location-next">
            NEXT
          </button>
        </div>
      </div>
    );
  }
}

export default LocationQuestion;
