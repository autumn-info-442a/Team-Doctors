# Where2Test Architecture 

## SurveyController
- Resides in the client
- The **SurveyController** communicates with the **SurveyModel** and **SurveyView**
- The **SurveyController** can ask the **SurveyModel** to store responses to survey questions
- The **SurveyController** can retrieve a specific survey question response from the **SurveyModel**

## SurveyController Stubs
```
// Stores the given response to the given survey question
function saveSurveyReponse(surveyQuestion, response) {
	surveyResponses[surveyQuestion] = response;
}

// Returns the survey response to the given survey question
function getSurveyResponse(surveyQuestion) {
	return surveyResponses[surveyQuestion]
}

```
