import React, {Component} from 'react';
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
        var filteredTestingCenters = testingCenters.filter();
        // TODO
        // filter by criteria
        // sort by distance
        // integrate google maps api
        return filteredTestingCenters;
    }

    render() {
        console.log(this.state.questions);
        console.log(this.getSurveyResponse(0));
        return <div></div>
    }
}

export default SurveyController