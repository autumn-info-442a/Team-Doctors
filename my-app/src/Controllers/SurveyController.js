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

    componentDidMount() {
        this.getSurveyQuestions();
    }

    getSurveyQuestions() {
        var surveyQuestionRef = db.ref("SurveyQuestions");
        var listOfQuestions = [];

        surveyQuestionRef.on('value', function(snapshot) {
            var data = snapshot.val();
            data.forEach(surveyQuestion => {
                surveyQuestion.Response = "";
                listOfQuestions.push(surveyQuestion);
            })
        });   

        this.setState({questions: listOfQuestions});
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

    }

    getSurveyResponses() {

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

    }

    render() {
        return <div></div>
    }
}

export default SurveyController