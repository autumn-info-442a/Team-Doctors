import './App.css';
import { db } from './Services/firebase';
import google from 'react';
import React, {Component} from 'react';
import LandingPage from './Views/LandingPage';
import LocationQuestion from './Views/LocationQuestion';
import QuestionTemplate from './Views/QuestionTemplate';
import ResultsPage from './Views/ResultsPage';
import Loading from './Views/Loading';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        questions: [],
        responses: [],
        pageIndex: 0,
        testingCenters: [],
        results: [],
    }

    this.getSurveyQuestions = this.getSurveyQuestions.bind(this);
    this.getTestingCenters = this.getTestingCenters.bind(this);
    this.getCurrentResponse = this.getCurrentResponse.bind(this);
    this.startSurvey = this.startSurvey.bind(this);
    this.goNext = this.goNext.bind(this);
    this.goBack = this.goBack.bind(this);
    this.computeResults = this.computeResults.bind(this);
  }
  
  async componentWillMount() {
      await this.getSurveyQuestions();
      await this.getTestingCenters();
  }

 async getSurveyQuestions() {
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

  async getTestingCenters() {
    var testingCentersList = [];
    var testingSitesRef = db.ref("testingSites");
    testingSitesRef.on('value', function(snapshot) {
        var data = snapshot.val();
        data.forEach(testingCenter => {
            testingCentersList.push(testingCenter);
        })
    });
    this.setState({testingCenters: testingCentersList});
}

  getCurrentResponse() {
    return this.state.responses[this.state.pageIndex - 1];
  }

  startSurvey() {
      this.setState({pageIndex: this.state.pageIndex + 1});
  }

  goNext = (response) => {
    if (response != null) {
        var updateResponses = this.state.responses;
        updateResponses[this.state.pageIndex - 1] = response;
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

  async computeResults() {
      var testingCenters = this.state.testingCenters;
      var insurance = this.state.responses[1] === "Yes";
      var driveThrough = this.state.responses[2] === "Yes";
      var translator = this.state.responses[3] === "Yes";

      if (testingCenters.length < 1) {
          console.log("empty testing centers");
      }

      // filter by criteria
      var filteredTestingCenters = testingCenters.filter(tc => {
        return ((tc.insurance === true && insurance === true) || (insurance === false))
        && ((tc.driveThrough === true && driveThrough === true) || (driveThrough === false))
        && ((tc.translator === true && translator === true) || (translator === false))
      });

      // get survey address
      var origin = [];
      origin.push(''.concat(this.state.responses[0].address, ", ", this.state.responses[0].city, ", ", this.state.responses[0].stateName, " ", this.state.responses[0].zip));
      console.log(origin);

      // get distance away from specificed location 
      var addresses = [];
      filteredTestingCenters.forEach(tc => {
          addresses.push(tc.address);
      });

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
    const { pageIndex, questions } = this.state;
    var questionTemplates = [];

    for (var i = 1; i < questions.length; i++) {
      console.log(questions[i].question);
      questionTemplates.push(
        <QuestionTemplate key={i} goNext={this.goNext} goBack={this.goBack} questionText={questions[i].question} getCurrentResponse={this.getCurrentResponse}></QuestionTemplate>
      );
    }

    return (
      <div className="App">
          {pageIndex === 0 ? <LandingPage startSurvey={this.startSurvey}></LandingPage> : null}
          {pageIndex === 1 ? <LocationQuestion goNext={this.goNext} getCurrentResponse={this.getCurrentResponse}></LocationQuestion> : null}
          {pageIndex === 2 ? questionTemplates[0] : null}
          {pageIndex === 3 ? questionTemplates[1] : null}
          {pageIndex === 4 ? questionTemplates[2] : null}
          {pageIndex === 5 ? <ResultsPage computeResults={this.computeResults} results={this.state.results}></ResultsPage> : null}
      </div>
    );
  }
}

export default App;
