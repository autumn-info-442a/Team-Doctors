# Where2Test Requirements #

## Landing Page ##
1. Users should be able to see the name of the survey on the Landing Page
2. Users should be able to read the survey’s purpose on the Landing Page
3. Users should be able to begin the survey with the click of a button on the Landing Page

## Survey Question(s) Pages ##
### General ###
4. Users should be able to read the survey question with no spelling or grammar errors
5. Users should be able to see clarifying descriptions for applicable survey questions

### Location Question Page ###
6. Users should be able to click on one of the location fields (address, city, state, or zip) and use their browser’s saved autofill feature (if available)
7. Users should have to fill out all of the location fields before being able to move to the next question

### Yes/No Questions ###
8. Users should be able to click a Yes checkbox
9. Users should be able to click a No checkbox
10. When users select a Yes/No checkbox, the other checkbox will be automatically unselected

### Proceeding/Going Back Through Survey Questions ###
11. Users should receive an indicator which survey questions are required to fill out before proceeding to the next question
12. Users should not be able to proceed to the next page until they fill out the required survey question on the current page
13. The service should save the responses to each survey question after the user moves to the next page
14. Users should be able to go back to the previous question at any time before submitting the survey
15. Users should be able to edit any of their previous responses any time before submitting the survey
16. When a user goes back to edit their survey question responses, their previous responses should be pre-filled in the response boxes

### Completing Survey ###
17. Users should be able to submit their survey after completing all of the survey questions

## Results Page ##
### Results List Processing ###
18. Users should be able to see a results list of testing centers after submitting their survey
19. Users should receive feedback if their results take more than 1 second to process
20. The service should filter the testing center dataset to testing centers that meet one or more survey criteria
21. The service should first prioritize the number of survey response criteria met by testing center
22. The service should secondly prioritize the distance of the testing center (closest to farthest) to the user’s provided location
23. The service should default to sorting by closest to farthest location if no testing centers meet the survey’s response criteria

### Testing Centers ###
24. Users should be able to see the testing center’s name
25. Users should be able to see how far away a testing center is from their specified location
26. Users should be able to see a testing center’s phone number
27. Users should be able to see a testing center’s address
28. Users should be able to see a testing center’s hours of operation
29. Users should be able to see which criteria (from the survey’s responses) the testing center meets
30. Users should be able to be able to click on a testing center’s phone number to be directed to call the number
31. Users should be able to click on a testing center address to be directed to Google Maps

### Error Messages ###
32. Users should receive an error message on the page when something goes wrong in the backend
33. On refreshing the page after receiving an error message, the service should take the user back to the landing page






