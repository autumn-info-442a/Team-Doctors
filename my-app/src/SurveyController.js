import './App.css';
import { db } from './Services/firebase';
import google from 'react';
import React, {Component} from 'react';
import LandingPage from './Views/LandingPage';
import LocationQuestion from './Views/LocationQuestion';
import QuestionTemplate from './Views/QuestionTemplate';
import ResultsPage from './Views/ResultsPage';
import Loading from './Views/Loading';
import ErrorResults from './Views/ErrorResults';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        questions: [],
        responses: [],
        pageIndex: 0,
        originAddress: "",
        testingCenters: [],
        results: [],
        lastUpdated: [],
        resultsError: false
    }

    this.getSurveyQuestions = this.getSurveyQuestions.bind(this);
    this.getTestingCenters = this.getTestingCenters.bind(this);
    this.getCurrentResponse = this.getCurrentResponse.bind(this);
    this.startSurvey = this.startSurvey.bind(this);
    this.goNext = this.goNext.bind(this);
    this.saveResponse = this.saveResponse.bind(this);
    this.goBack = this.goBack.bind(this);
    this.computeResults = this.computeResults.bind(this);
    this.getLastUpdated = this.getLastUpdated.bind(this);
  }
  
  async componentWillMount() {
      await this.getSurveyQuestions();
      await this.getTestingCenters();
      await this.getLastUpdated();
  }

  async getLastUpdated() {
    var dateUpdated = [];
    var lastUpdatedRef = db.ref("lastUpdated");
    lastUpdatedRef.on('value', function(snapshot) {
      var data = snapshot.val();
      data.forEach(date => {
        dateUpdated.push(date.lastUpdated);
      });
    });
    this.setState({lastUpdated: dateUpdated});
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

  goNext() {
    this.setState({
        pageIndex: this.state.pageIndex + 1
    });
  }

  saveResponse = (response) => {
      var updateResponses = this.state.responses;
      updateResponses[this.state.pageIndex - 1] = response;
      this.setState({
          responses: updateResponses,
      });
  }

  goBack() {
      this.setState({pageIndex: this.state.pageIndex - 1});
  }

  async computeResults() {
      var testingCenters = this.state.testingCenters;
      var free = this.state.responses[1] === "Yes";
      var driveThrough = this.state.responses[2] === "Yes";
      var translator = this.state.responses[3] === "Yes";

      if (testingCenters.length < 1) {
          console.log("Error retrieving testing centers");
      }

      testingCenters.forEach(tc =>{
        var criteriaMetCount = 0;
        var criteriaAvailableList = [];
        var criteriaNotAvailableList = [];
        if ((tc.free=== true)) {
          criteriaAvailableList.push("Free testing available");
          if (free === true) {
            criteriaMetCount++;
          }
        } else {
          criteriaNotAvailableList.push("No free testing");
        }
        if (tc.driveThrough === true) {
          criteriaAvailableList.push("Drive through option");
          if (driveThrough === true) {
            criteriaMetCount++;
          }
        } else {
          criteriaNotAvailableList.push("No drive through option");
        }
        if (tc.translator === true) {
          criteriaAvailableList.push("Translator available");
          if (translator === true) {
            criteriaMetCount++;
          }
        } else {
          criteriaNotAvailableList.push("No translator option");
        }

        tc.criteriaMet = criteriaMetCount;
        tc.criteriaAvailable = criteriaAvailableList;
        tc.criteriaNotAvailable = criteriaNotAvailableList;
      });


      // get survey address
      var origin = [];
      origin.push(''.concat(this.state.responses[0].address, ", ", this.state.responses[0].city, ", ", this.state.responses[0].stateName, " ", this.state.responses[0].zip));

      // get distance away from specificed location 
      var addresses = [];
      testingCenters.forEach(tc => {
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
              console.log("Error: ", status);
              this.setState({resultsError: true});   
          } else {
            var results = response.rows[0].elements;
            var originAddress = response.originAddresses[0];
            console.log(originAddress);
            for (var i = 0; i < results.length; i++) {
                var element = results[i];
                if (element.distance == undefined) {
                  this.setState({resultsError: true});
                } else {
                  var distance = element.distance.text;
                  var distanceArr = distance.split(" ");
                  var mileage = parseFloat(distanceArr[0]);
                  testingCenters[i].distanceAway = mileage;
                }
            }
            // sort by criteria met and then distance
            testingCenters.sort(function(a, b) {
              return b.criteriaMet - a.criteriaMet || a.distanceAway - b.distanceAway;
            });
            console.log(testingCenters);
            this.setState({originAddress: originAddress, results: testingCenters});
          }
        }.bind(this)
    );
  }

  render() {
    const { pageIndex, questions, resultsError } = this.state;
    var questionTemplates = [];

    for (var i = 1; i < questions.length; i++) {
      questionTemplates.push(
        <QuestionTemplate key={i} lastQuestion={i === questions.length - 1} goNext={this.goNext} saveResponse={this.saveResponse} goBack={this.goBack} questionText={questions[i].question} getCurrentResponse={this.getCurrentResponse}></QuestionTemplate>
      );
    }

    return (
      resultsError ? <ErrorResults></ErrorResults> : <div className="App">
          {pageIndex === 0 ? <LandingPage startSurvey={this.startSurvey}></LandingPage> : null}
          {pageIndex === 1 ? <LocationQuestion goNext={this.goNext} saveResponse={this.saveResponse} getCurrentResponse={this.getCurrentResponse}></LocationQuestion> : null}
          {pageIndex === 2 ? questionTemplates[0] : null}
          {pageIndex === 3 ? questionTemplates[1] : null}
          {pageIndex === 4 ? questionTemplates[2] : null}
          {pageIndex === 5 ? <ResultsPage computeResults={this.computeResults} originAddress = {this.state.originAddress} results={this.state.results} lastUpdated={this.state.lastUpdated}></ResultsPage> : null}
      </div>
    );
  }
}

export default App;
