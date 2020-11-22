import './App.css';
import { db } from './Services/firebase';
import google from 'react';
import React, {Component} from 'react';
import LandingPage from './Views/LandingPage';
import LocationQuestion from './Views/LocationQuestion';
import QuestionTemplate from './Views/QuestionTemplate';
import ResultsPage from './Views/ResultsPage';
import { render } from '@testing-library/react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        questions: [],
        responses: [],
        pageIndex: 0,
    }

    this.getSurveyQuestions = this.getSurveyQuestions.bind(this);
    this.getCurrentQuestion = this.getCurrentQuestion.bind(this);
    this.startSurvey = this.startSurvey.bind(this);
    this.goNext = this.goNext.bind(this);
    this.goBack = this.goBack.bind(this);
    this.getSurveyResponse = this.getSurveyResponse.bind(this);
    this.getTestingCenters = this.getTestingCenters.bind(this);
    this.submitSurvey = this.submitSurvey.bind(this);
    this.computeResults = this.computeResults.bind(this);
    this.getDistances = this.getDistances.bind(this);
  }
  
  componentWillMount() {
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

  getSurveyResponses() {
      return this.state.responses;
  }

  submitSurvey() {

  }

  getTestingCenters() {
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
      var testingCenters = this.getTestingCenters();
      // var responses = this.getSurveyResponses();

      var driveThrough = true;
      var insurance = true;
      var translator = true;

      // TODO: integrate with actual survey responses
      /* var driveThrough = this.state.questions[1].response;
      var insurance = this.state.questions.insurance[2].response;
      var translator = this.state.questions.translator[3].response;*/

      // filter by criteria
      var filteredTestingCenters = driveThrough === false ? testingCenters : testingCenters.filter(tc => tc.driveThrough === true);
      filteredTestingCenters = insurance === false ? filteredTestingCenters : filteredTestingCenters.filter(tc => tc.insurance === true);
      filteredTestingCenters = translator === false ? filteredTestingCenters : filteredTestingCenters.filter(tc => tc.translator === true);

      // get distance away from specificed location 
      var addresses = [];
      filteredTestingCenters.forEach(tc => {
          addresses.push(tc.address);
      });

      var origin = [];
      const location = this.state.questions[0].location;
      origin.push(''.concat(location.address, ' ', location.city, ' ', location.stateName, ' ', location.zip));
      // origin.push(this.state.questions[0].response);
      var response = await this.getDistances(origin, addresses);
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
      return filteredTestingCenters;
  }

  getDistances(origin, addresses) {
      //Find the distances
      var distanceService = new window.google.maps.DistanceMatrixService();
      return new Promise((resolve, reject) => {
          distanceService.getDistanceMatrix({
              origins: origin,
              destinations: addresses,
              travelMode: window.google.maps.TravelMode.DRIVING,
              unitSystem: window.google.maps.UnitSystem.IMPERIAL
          }, 
          function (response, status) {
              if (status !== window.google.maps.DistanceMatrixStatus.OK) {
                  console.log("Error: ", status);
              } else {
                  resolve(response);
                  return response;
              }
          });
      });
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
          {pageIndex === 5 ? <ResultsPage></ResultsPage> : null}
      </div> : <div><h1>loading...</h1></div>
    );
  }

}

export default App;
