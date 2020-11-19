import './App.css';
import { db } from './Services/firebase';
import React, {Component} from 'react';
import LandingPage from './Views/LandingPage';
import LocationQuestion from './Views/LocationQuestion';
import QuestionTemplate from './Views/QuestionTemplate';
import TwoQuestionTemplate from './Views/TwoQuestionTemplate';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        questions: [],
        currentQuestion: 0
    }
    this.getSurveyQuestions = this.getSurveyQuestions.bind(this);
    this.getCurrentQuestion = this.getCurrentQuestion.bind(this);
    this.goNextSurveyQuestion = this.goNextSurveyQuestion.bind(this);
    this.goBackSurveyQuestion = this.goBackSurveyQuestion.bind(this);
    this.getSurveyResponse = this.getSurveyResponse.bind(this);
    this.getTestingCenters = this.getTestingCenters.bind(this);
    this.submitSurvey = this.submitSurvey.bind(this);
    this.computeResults = this.computeResults.bind(this);
    this.getDistances = this.getDistances.bind(this);
  }

  componentDidMount() {
      this.getSurveyQuestions();
  }

  getSurveyQuestions() {
      var surveyQuestionRef = db.ref("surveyQuestions");
      var questionsList = [];
      surveyQuestionRef.on('value', function(snapshot) {
          var data = snapshot.val();
          data.forEach(surveyQuestion => {
              surveyQuestion.Response = "N/A";
              questionsList.push(surveyQuestion);
          })
      });   
      this.setState({questions: questionsList});
  }

  getCurrentQuestion() {
      return this.state.questions[this.state.currentQuestion];
  }

  goNextSurveyQuestion(response) {
      var getQuestion = this.getCurrentQuestion;
      getQuestion.response = response;
      this.setState({
          question: getQuestion,
          currentQuestion: this.state.currentQuestion + 1
      });
  }

  goBackSurveyQuestion() {
      this.setState({currentQuestion: this.state.currentQuestion - 1});
  }

  getSurveyResponse(surveyQuestion) {
      return this.state.questions[surveyQuestion].Response;
  }

  getSurveyResponses() {
      var responses = [];
      this.state.questions.forEach(question => {
          responses.push(question.response);
      });
      return responses;
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

  submitSurvey() {

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
      origin.push("1851 NE Grant Ln, Seattle, WA 98105");
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
    const questionIndex = this.state.currentQuestion;
    console.log(this.state);
    return (
      <div className="App">
          {questionIndex === 0 ? <LandingPage startSurvey={this.goNextSurveyQuestion}></LandingPage> : null}
          {questionIndex === 1 ? <LocationQuestion goNext={this.goNextSurveyQuestion}></LocationQuestion> : null}
          {questionIndex >= 2 && questionIndex <= 3 ? <QuestionTemplate goNext={this.goNextSurveyQuestion} goBack={this.goBackSurveyQuestion}></QuestionTemplate> : null}
          {questionIndex === 4 ? <TwoQuestionTemplate></TwoQuestionTemplate> : null}
      </div>
    );
  }

}

export default App;
