import React, {Component} from 'react';
import google from 'react';

class LocationQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      city: "",
      stateName: "",
      zip: ""
    };
    this.canGoNext = this.canGoNext.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.checkValidLocation = this.checkValidLocation.bind(this);
  }

  componentWillMount() {
    var currentResponse = this.props.getCurrentResponse();
    if (currentResponse.length !== null) {
      this.setState({address: currentResponse.address, city: currentResponse.city, stateName: currentResponse.stateName, zip: currentResponse.zip});
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  async canGoNext() {
    var address = ''.concat(this.state.address, ", ", this.state.city, " ", this.state.stateName, " ", this.state.zip);
    
    var location =  {
      address: this.state.address,
      city: this.state.city,
      stateName: this.state.stateName,
      zip: this.state.zip
    }

    var fieldsFilledOut = this.checkFields();
    
    if (fieldsFilledOut) {
      var validLocation = await this.checkValidLocation(address);
      if (validLocation) {
        this.props.saveResponse(location);
        this.props.goNext();
      }
    } else {
        alert("Fill out all fields");
    }
  }

  checkFields() {
    const {address, city, stateName, zip } = this.state;
    var filledOut = (address.length > 0) && (city.length > 0) && (stateName.length > 0) && (zip.length > 0);
    return filledOut;
  }

  checkValidLocation(address) {
    var geocoder = new window.google.maps.Geocoder();
    return new Promise(function(resolve, reject) {
      geocoder.geocode({
        'address': address
      }, function(results, status) {
        if (status === window.google.maps.GeocoderStatus.OK && results.length > 0) {
          resolve(true);
        } else {
          reject(false);
          alert("Invalid Address");
        }
      });
    });
    return true;
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
                    <input onChange={this.handleChange} type="text" id="Address" name="address" value={ this.state.address }></input>
                    <label for="Address">Address</label>
                </div>
                <div className="City-field">
                    <input onChange={this.handleChange} type="text" id="City" name="city" value={ this.state.city }></input>
                    <label for="City">City</label>
                </div>
                <div className="State-field">
                    <input onChange={this.handleChange} type="text" id="State" name="stateName" value={ this.state.stateName }></input>
                    <label for="State">State</label>
                </div>
                <div className="Zip-field">
                    <input onChange={this.handleChange} type="text" id="Zip" name="zip" value={ this.state.zip }></input>
                    <label for="Zip">Zip</label>
                </div>
            </form>
        </div>
        <div className="Nav-Buttons-One">
          <button onClick={this.canGoNext} type="button" className="Nav-btn">
            NEXT
          </button>
        </div>
      </div>
    );
  }
}

export default LocationQuestion;
