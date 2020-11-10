import React, {Component} from 'react';
import { db } from '../Services/firebase';

class SurveyController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: []
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
            data.forEach(row => {
                row.Response = "";
                listOfQuestions.push(row);
            })
        });   

        this.setState({questions: listOfQuestions});
    }

    /*
    function getCurrentQuestion() {

    }

    function goNextSurveyQuestion(response) {

    }
    
    function goBackSurveyQuestion() {

    }

    function submitSurvey() {

    }

    function getSurveyResponse(surveyQuestion) {

    }

    function getSurveyResponses() {

    }

    function getTestingCenters() {
        var testingSitesRef = db.ref("TestingSites");
        testingSitesRef.on('value', function(snapshot) {
            console.log(snapshot.val());
        });
    }

    function computeResults() {

    } */

    render() {
        console.log(this.state);
        return <div></div>
    }
}

export default SurveyController