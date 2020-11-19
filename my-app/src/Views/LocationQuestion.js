import React, {Component} from 'react';
import google from 'react';

class LocationQuestion extends Component {
  constructor(props) {
    super(props);
    this.canGoNext = this.canGoNext.bind(this);
    this.state = {};
  }

  async canGoNext() {
    var address = "";
    var fieldsFilledOut = true;
    var validAddress = await this.checkValidAddress(address);

    if (fieldsFilledOut && validAddress) {
      this.props.goNext();
    } else {
      alert("Fill out all fields")
    }
  }

  checkValidAddress(address) {
    var geocoder = new window.google.maps.Geocoder();


    return new Promise((resolve, reject) => {
      geocoder.geocode({
        'address': address
      }, function(results, status) {
        if (status === window.google.maps.GeocoderStatus.OK && results.length > 0) {
          resolve(results);
          return true;
        } else {
          alert("Invalid address");
          return false;
        }
      });
  });
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
          <button onClick={this.canGoNext} type="button" className="Nav-btn">
            NEXT
          </button>
        </div>
      </div>
    );
  }
}

export default LocationQuestion;
