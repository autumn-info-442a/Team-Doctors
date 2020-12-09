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
    if (currentResponse !== null || currentResponse.length !== 0) {
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
        alert("Please enter a valid address. Note: We currently only support Washington addresses.");
    }
  }

  checkFields() {
    const {address, city, stateName, zip } = this.state;
    var filledOut = ((address !== undefined && address.length > 0) && (city !== undefined && city.length > 0) && (stateName !== undefined && (stateName.toLowerCase() === "wa" || stateName.toLowerCase() === "washington")) && (zip !== undefined && zip.length > 4));
    return filledOut;
  }

  checkValidLocation(address) {
    var origin = [];
    origin.push(address);
    var distanceService = new window.google.maps.DistanceMatrixService();
    return new Promise(function(resolve, reject) {
        distanceService.getDistanceMatrix(
        {
          origins: origin,
          destinations: ["Seattle, WA, USA"],
          travelMode: window.google.maps.TravelMode.DRIVING,
          unitSystem: window.google.maps.UnitSystem.IMPERIAL 
        },
        function (response, status) {
          var checkOrigin = response.originAddresses[0];
          var containsCorrectResponse = checkOrigin.includes("WA");
          if (status === window.google.maps.DistanceMatrixStatus.OK && containsCorrectResponse) {
            resolve(true);
          } else {
            alert("Invalid Address");
            reject(false);
          }
        }
      );
    })
  }

  render() {
    return (
      <div className="Question-page">
        <div className="Question">
          <p className="Q L">
            Please enter a location.<span className="required">*</span>
          </p>
          <div className="Location-form">
              <form className="Full-address">
                  <div className="Address-field field">
                      <input onChange={this.handleChange} type="text" id="Address" name="address" value={ this.state.address }></input>
                      <label for="Address">Address</label>
                  </div>
                  <div className="City-field field">
                      <input onChange={this.handleChange} type="text" id="City" name="city" value={ this.state.city }></input>
                      <label for="City">City</label>
                  </div>
                  <div className="State-field field">
                      <input onChange={this.handleChange} type="text" id="State" name="stateName" value={ this.state.stateName }></input>
                      <label for="State">State</label>
                  </div>
                  <div className="Zip-field field">
                      <input onChange={this.handleChange} type="text" id="Zip" name="zip" value={ this.state.zip }></input>
                      <label for="Zip">Zip</label>
                  </div>
              </form>
          </div>
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
