import './App.css';
import { db } from './Services/firebase';
import google from 'react';
import React, {Component} from 'react';
import LandingPage from './Views/LandingPage';
import LocationQuestion from './Views/LocationQuestion';
import QuestionTemplate from './Views/QuestionTemplate';
import ResultsPage from './Views/ResultsPage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        questions: [],
        responses: [],
        pageIndex: 0,
        results: []
    }

    this.getSurveyQuestions = this.getSurveyQuestions.bind(this);
    this.getCurrentQuestion = this.getCurrentQuestion.bind(this);
    this.startSurvey = this.startSurvey.bind(this);
    this.goNext = this.goNext.bind(this);
    this.goBack = this.goBack.bind(this);
    this.getSurveyResponse = this.getSurveyResponse.bind(this);
    this.getTestingCenters = this.getTestingCenters.bind(this);
    this.computeResults = this.computeResults.bind(this);
  }
  
  async componentWillMount() {
      this.getSurveyQuestions();
  }

  getSurveyQuestions() {
    var surveyQuestionRef = db.ref("surveyQuestions");
    var questionsList = [];
    var responsesList = [];
    surveyQuestionRef.on('value', function(snapshot) {
        var data = snapshot.val();
        data.forEach(surveyQuestion => {
            questionsList.push(surveyQuestion);
            responsesList.push("No response");
        })
    });   
    this.setState({questions: questionsList, responses: responsesList});
  }


  getCurrentQuestion() {
    return this.state.pageIndex - 1;
  }

  startSurvey() {
      this.setState({pageIndex: this.state.pageIndex + 1});
  }

  goNext = (response) => {
    if (response != null) {
        var updateResponses = this.state.responses;
        updateResponses[this.getCurrentQuestion()] = response;
        this.setState({
            responses: updateResponses,
        });
    }
    this.setState({
        pageIndex: this.state.pageIndex + 1
    });
  }

  goBack() {
      this.setState({pageIndex: this.state.pageIndex - 1});
  }

  getSurveyResponse(pageIndex) {
      return this.state.questions[this.getCurrentQuestion()].response;
  }

  async getTestingCenters() {
      var testingCentersList = [];
      var testingSitesRef = db.ref("testingSites");
      testingSitesRef.on('value', function(snapshot) {
          var data = snapshot.val();
          data.forEach(testingCenter => {
              testingCentersList.push(testingCenter);
          })
      });
      return testingCentersList;
  }

  async computeResults() {
      var testingCenters = await this.getTestingCenters();

      var driveThrough = this.state.responses[1] === "Yes";
      var insurance = this.state.responses[2] === "Yes";
      var translator = this.state.responses[3] === "Yes";

      // filter by criteria
      var filteredTestingCenters = driveThrough === false ? testingCenters : testingCenters.filter(tc => tc.driveThrough === true);
      filteredTestingCenters = insurance === false ? filteredTestingCenters : filteredTestingCenters.filter(tc => tc.insurance === true);
      filteredTestingCenters = translator === false ? filteredTestingCenters : filteredTestingCenters.filter(tc => tc.translator === true);

      // get survey address
      var origin = [];
      origin.push(''.concat(this.state.responses[0].address, ", ", this.state.responses[0].city, ", ", this.state.responses[0].stateName, " ", this.state.responses[0].zip));
      console.log(origin);

      // get distance away from specificed location 
      var addresses = [];
      filteredTestingCenters.forEach(tc => {
          addresses.push(tc.address);
      });
      console.log(addresses);
      var distanceService = new window.google.maps.DistanceMatrixService();
      distanceService.getDistanceMatrix(
        {
          origins: origin,
          destinations: addresses,
          travelMode: window.google.maps.TravelMode.DRIVING,
          unitSystem: window.google.maps.UnitSystem.IMPERIAL 
        },
        function (response, status) {
          if (status !== window.google.maps.DistanceMatrixStatus.OK) {
              alert("Service error, please try again later");
              console.log("Error: ", status);
          } else {
            var results = response.rows[0].elements;
            for (var i = 0; i < results.length; i++) {
                var element = results[i];
                var distance = element.distance.text;
                var distanceArr = distance.split(" ");
                var mileage = parseFloat(distanceArr[0]);
                filteredTestingCenters[i].distanceAway = mileage;
            }
            // sort by distance
            filteredTestingCenters.sort((a, b) => (a.distanceAway > b.distanceAway) ? 1 : -1);
            console.log(filteredTestingCenters);
            this.setState({results: filteredTestingCenters});
          }
        }.bind(this)
    )
  }

  render() {
    const pageIndex = this.state.pageIndex;
    const questions = this.state.questions;
    const responses = this.state.responses;
    console.log(this.state);
    return (
      (this.state.questions !== undefined && this.state.responses !== undefined)  === true ? <div className="App">
          {pageIndex === 0 ? <LandingPage startSurvey={this.startSurvey}></LandingPage> : null}
          {pageIndex === 1 ? <LocationQuestion goNext={this.goNext}></LocationQuestion> : null}
          {pageIndex === 2 ? <QuestionTemplate goNext={this.goNext} goBack={this.goBack} questionText={"Do you have insurance?"}></QuestionTemplate> : null}
          {pageIndex === 3 ? <QuestionTemplate goNext={this.goNext} goBack={this.goBack} questionText={"Do you want a drive-through testing option?"}></QuestionTemplate> : null}
          {pageIndex === 4 ? <QuestionTemplate goNext={this.goNext} goBack={this.goBack} questionText={"Would you like a translator available to you?"}></QuestionTemplate> : null}
          {pageIndex === 5 ? <ResultsPage computeResults={this.computeResults} results={this.state.results}></ResultsPage> : null}
      </div> : <div><h1>Loading...</h1></div>
    );
  }
}

export default App;
