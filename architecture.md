# Where2Test Architecture 

## SurveyController
- Resides in the client
- The **SurveyController** communicates with the **SurveyQuestionModel** in Firebase, the **SurveyView**, the **TestingCenterModel** in Firebase, the **ResultsView**, and the Google Maps API
- The **SurveyController** can ask the **SurveyQuestionModel** to retrieve the survey question fields
- The **SurveyController** can retrieve and store a specific question response in the application's local state
- The **SurveyController** can keep track of the order of the survey questions and the current question that the user is on
- The **SurveyController** can go next or back in the survey question ordering
- The **SurveyController** can direct the **SurveyView** to the current question to display
- The **SurveyController** can ask the **SurveyQuestionModel** to retrieve all responses and their corresponding survey questions
- The **SurveyController** can ask the **TestingCenterModel** to retrieve all testing centers data
- The **SurveyController** computes the testing center results list through filtering and sorting using the **SurveyQuestionModel** responses from the **TestingCenterModel** data

## SurveyController Stubs
```
// Populates local state with survey questions and survey question fields
function getSurveyQuestions() {
	// Sets initial local state to survey questions with information on whether it has a next button, submit button, and back button.
	// Sets response as empty initally for each survey question.
}


// Returns the current survey question
function getCurrentQuestion() {
	return surveyQuestion;
}

// Stores the given response to the given survey question and moves to the next surveyQuestion
function goNextSurveyQuestion(response) {
	surveyQuestion = getCurrentQuestion();
	surveyResponses[surveyQuestion] = response;
	// Moves survey question tracker forward one
}

// Returns the previous survey question response and moves back to the previous surveyQuestion
function goBackSurveyQuestion {
	// Moves survey question tracker back one
	return getSurveyResponse(previousQuestion);
}

// Submits the survey 
function submitSurvey {
	// Computes results
}

// Returns the survey response to the given survey question
function getSurveyResponse(surveyQuestion) {
	return surveyResponses[surveyQuestion]
}
 
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
	// append distance away from provided address (using Google Maps API) to testing centers list of objects
	return results; 
}

```
## SurveyQuestionModel
- Resides in the client
- The **SurveyController** can ask the **SurveyQuestionModel** for a specific survey question response
- The **SurveyController** can ask the **SurveyQuestionModel** for all survey question responses
- The **SurveyQuestionModel** stores the survey questions (across all instances of the survey) and locally stores each user’s responses

Below is the data model for a suvery question stored in the application's state. The state will store multiple survey questions. 
```
SurveyQuestionModel = {
	id: string;
	question: string;
	response: string;
	hasNext: boolean;
	hasBack: boolean;
	hasSubmit: boolean;
}
```

## TestingCenterModel
- Resides in Firebase
- The SurveyController can ask the TestingCenterModel for testing center data
- This TestingCenterModel stores the testing centers data including information such as: name, phone, address, etc. about each testing center

Below is the data model for a testing center stored in Firebase. Firebase will store multiple testing centers.

```
TestingCenterModel = {
	id: string;
	name: string;
	phone: string;
	address: string;
	takesInsurance: boolean;
	driveThroughAvailable: boolean;
	translatorAvailable: boolean;
}

```

## SurveyView
- Resides in the client
- The **SurveyView** receives information to display from the **SurveyController**
- Displays survey question and question description (if it has one)
- Displays asterisk for required questions
- Displays text fields and checkboxes 
- Displays next, back buttons to move from question to question
- Displays a start and submit button (for applicable pages)

## ResultsView
- Resides in the client
- The **ResultsView** receives information to display from the **SurveyController**
- The **ResultsView** displays a list of “cards” of testing centers


