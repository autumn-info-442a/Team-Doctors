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

## ResultsController
- Resides in the client 
- The ResultsController communicates with the TestingCenterModel in Firebase, the SurveyModel, and the ResultsView
- The ResultsController can ask the SurveyModel to retrieve all responses and their corresponding survey questions
- The ResultsController can ask the TestingCenterModel to retrieve all testing centers data
- The ResultsController computes the testing center results list through filtering and sorting using the SurveyModel responses from the TestingCenterModel data

```
 
// Returns all survey responses
function getSurveyResponses() {
	return surveyResponses;
}

// Returns an array of objects of testing center data
function getTestingCenters() {
	return testingCenters;
}

// Returns a filtered and sorted list of objects of testing centers
function computeResults() {
	surveyResponses = getSurveyResponses();
	testingCenters = getTestingCenters();
	// filter and sort testing center list of objects
	// append distance away from provided address to testing centers list of objects
	return results; 
}

```
