import React, {Component} from 'react';
// import google from 'react';
import { db } from '../Services/firebase';

class SurveyController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            currentQuestion: 0
        }
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
        this.setState({currentQuestion: this.state.currentQuestion + 1});
    }
    
    goBackSurveyQuestion() {
        this.setState({currentQuestion: this.state.currentQuestion - 1});
    }

    submitSurvey() {

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

    async computeResults() {
        var testingCenters = this.getTestingCenters();
        // var responses = this.getSurveyResponses();

        var driveThrough = false;
        var insurance = true;
        var translator = true;

        /* var driveThrough = this.questions.driveThrough.response;
        var insurance = this.questions.insurance.response;
        var translator = this.questions.translator.response;*/

        // filter by criteria
        var filteredTestingCenters = driveThrough === false ? testingCenters : testingCenters.filter(tc => tc.driveThrough === true);
        filteredTestingCenters = insurance === false ? filteredTestingCenters : filteredTestingCenters.filter(tc => tc.insurance === true);
        filteredTestingCenters = translator === false ? filteredTestingCenters : filteredTestingCenters.filter(tc => tc.translator === true);

        // integrate google maps api
        var addresses = [];
        filteredTestingCenters.forEach(tc => {
            addresses.push(tc.address);
        });

        var response = await this.getDistances(addresses);
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
        return filteredTestingCenters;
    }

    getDistances(addresses) {
        //Find the distances
        var distanceService = new window.google.maps.DistanceMatrixService();
        return new Promise((resolve, reject) => {
            distanceService.getDistanceMatrix({
                origins: ["5252 15th Ave NE Seattle, WA 98105"],
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
        this.computeResults();
        return <div></div>
    }
}

export default SurveyController

