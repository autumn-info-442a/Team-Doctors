import React, {Component} from 'react';
import google from 'react';
import { db } from '../Services/firebase';

class SurveyController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            currentQuestion: 0
        }
    }

    componentWillMount() {
        this.getSurveyQuestions();
    }

    getSurveyQuestions() {
        var surveyQuestionRef = db.ref("SurveyQuestions");
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
        var testingSitesRef = db.ref("TestingSites");
        testingSitesRef.on('value', function(snapshot) {
            var data = snapshot.val();
            data.forEach(testingCenter => {
                testingCentersList.push(testingCenter);
            })
        });
        return testingCentersList;
    }

    computeResults() {
        var testingCenters = this.getTestingCenters();
        var responses = this.getSurveyResponses();
        var filteredTestingCenters = [];
        
        // filter by criteria
        filteredTestingCenters = testingCenters.filter(function(testingCenter) { 
            return testingCenter["Drive-Through"] == "true" && testingCenter.Insurance == "true" && testingCenter.Translator == "true"
        });
    
        // integrate google maps api

        // sort by distance

        return filteredTestingCenters;
    }

    getDistance() {
        //Find the distance
        var distanceService = new google.maps.DistanceMatrixService();
        distanceService.getDistanceMatrix({
            origins: ["Greenwich, Greater London, UK", "13 Great Carleton Square, Edinburgh, City of Edinburgh EH16 4, UK"],
            destinations: ["Stockholm County, Sweden", "Dlouhá 609/2, 110 00 Praha-Staré Město, Česká republika"],
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.IMPERIAL,
            durationInTraffic: true,
            avoidHighways: false,
            avoidTolls: false
        },
        function (response, status) {
            if (status !== google.maps.DistanceMatrixStatus.OK) {
                console.log('Error:', status);
            } else {
                console.log(response);
            }
        });
    }

    render() {
        return <div></div>
    }
}

export default SurveyController