# Where2Test Requirements #

## Landing Page ##
1. **COMPLETE :** Users should be able to see the name of the survey on the Landing Page
    * *Check that the name is rendered on the page*
2. **COMPLETE :** Users should be able to read the survey’s purpose on the Landing Page
    * *Check that the survey’s purpose is on the page*
3. **COMPLETE :** Users should be able to begin the survey with the click of a button on the Landing Page
    * *Check that after pressing the start button, the webpage will load the first survey question*  
    * *Check that pressing the start button multiple times will still load the first survey question*  
    * *Check that having multiple tabs open and pressing start will load the first survey question per each tab*  

## Survey Question(s) Pages ##
### General ###
4. **COMPLETE :** Users should be able to read the survey question with no spelling or grammar errors
    * *Put all sentences that get displayed through a spelling and grammar checker first*  
    * *Check that the survey questions are rendered for each survey question page*
      * *Ex. “Please enter a location” and the necessary field boxes like “Address”, “City”, “State”, and “Zip” are there*

### Location Question Page ###
5. **COMPLETE :** Users should be able to click on one of the location fields (address, city, state, or zip) and use their browser’s saved autofill feature (if available)
    * *Check to see that clicking a textbox will trigger autofill on a supported autofill browser (e.g. Chrome)*  
      * *Ex. If autofill is available, if they click on the field a pop-up text will show up with the suggested auto fill* 
    * *Check to make sure the order of filling out location fields does not matter*
      * *Ex. Will allow the user to fill out the Zip field box first, then the address and the rest in a random order, you don’t have to go from address to city, to state, and to zip* 
6. **REVISED :** Users should have to fill out all of the location fields before being able to move to the next question
    * *Test all combinations of text box fields to check that all text boxes have to be filled to enable the next button*  
    * * **REASONING FOR REVISION :** We did not revise the requirement itself, instead we revised the requirement check/example.  We originally had planned to grey out the NEXT button as a way to show that the user needed to fill out all the location fields before proceeding, but after building and testing we decided to do better than just a visual cue.  We opted to show the user a pop-up if they tried to click NEXT before they had filled out all the parts of the location question.  This not only gave the user feedback and information about why they couldn’t continue, it also allowed us to improve the user experience.  The pop up not only serves as an indicator something isn’t right, it also goes a step further to tell the user that the address they put in (complete or not) is not valid, as well as an additional reminder that we only support Washington addresses.  A pop-up allowed us to tell the user all this information in a clear and easy way to better their experience and understanding of what needs to be done before continuing.
    * * **ADDITIONAL NOTE/REVISION :** The way the Google API we decided to use works is that it may take a location (even if it is not an existing address) and find the closest matching location. We had no way of controlling that automatic behavior in the API, so what we did instead was add an additional line to show the location that the Google API used so that the user knew what location was being used to calculate the nearest testing centers.
    
    ~~* *Check that if an invalid location is entered that the next button is still disabled*~~  
      ~~* *Ex. Instead of writing your ZIP into the Zip field, you can try and write letters instead and see if the "NEXT" button is still disabled* Check that if a valid location is entered, the next button is enabled*~~
    ~~* *Ex. Once everything is filled out properly, you should see that the "NEXT" button is no longer greyed out*~~

### Yes/No Questions ###
7. **COMPLETE :** Users should be able to click a Yes radio button
    * *Check that the Yes button appears selected after clicking it*  
    * *Check the current state to make sure that it has updated to reflect that Yes has been selected*
8. **COMPLETE :** Users should be able to click a No radio button
    * *Make sure that the No button appears selected after clicking it*  
    * *Check the current state to make sure that it has updated to reflect that No has been selected*
9. **COMPLETE :** When users select a Yes/No radio button, the other button will be automatically unselected
    * *Make sure that only one button is selected when clicking back and forth between the two options*  
    * *Check the current state to make sure that it has updated to accurately reflect whichever button has been selected, and that the old/previous state has been cleared*  

### Proceeding/Going Back Through Survey Questions ###
10. **REVISED :** Users should receive an indicator which survey questions are required to fill out before proceeding to the next question
    * *Check to see that there is a red asterisk for all survey questions*  
    * * **REASONING FOR REVISION :** Originally, we were going to grey out the NEXT button as an indicator to the user that they weren’t able to proceed because of some reason.  After we began building and coding, we still kept the red asterisk as planned, but instead of greyed out NEXT buttons, we decided on a pop-up.  If a user tries to click NEXT when they haven’t filled out the required question, they will be shown a pop-up that says “Please make a selection”.  For the location question, the pop-up says “Please enter a valid address.  Note: We currently only support Washington addresses”.  We thought this gave the user a better experience because it told them what was wrong.  This way, they know what to do to fix whatever they did wrong in order to proceed through our survey.  A greyed out NEXT button would visually tell the user that something was wrong and they couldn’t continue, but wouldn’t tell the user what to fix or what to do.  As a user, I value that extra information; it is arguably necessary.  Overall, we didn’t technically change our requirement, we just revised and improved how we were going to make that requirement happen.
    
    ~~* *Check to see that each survey question fields are filled out and valid before the next button is enabled*~~
      ~~* *Ex. Fill out everything except the ZIP field in the “Enter a location” page and check to see if the “NEXT” button is enabled. It should not be enabled. Afterwards, fill out the remaining field and check again to see if the “NEXT” button is enabled. This time, it should be enabled*~~ 
11. **COMPLETE :** Users should not be able to proceed to the next page until they fill out the required survey question on the current page
    * *Make sure that the web app doesn’t render the next page when the “Next” button is clicked if each survey question fields are not filled out*  
      * *Ex. Click on the “NEXT” button when fields are not completely filled out and see what happens (nothing should happen)*
    * *Check that pressing next button updates the correct next survey question in the application’s state*  
      * *Ex. After completing the “Enter a location” question, when you click on the “NEXT” button you should see the next survey question which is “Would you like free testing?”* 
12. **COMPLETE :** The service should save the responses to each survey question after the user moves to the next page
    * *Check the state to make sure that the answers are being saved and correctly updated in the state*
      * *Ex. After entering the “Would you like free testing?” page, click on “BACK” and check to see if information filled out about the location is still there*
13. **COMPLETE :** Users should be able to go back to the previous question at any time before submitting the survey
    * *Check that pressing the back button and making renders the previous survey question page*  
      * *Ex. You finished answering the “Would you like a translator available for you” and you decide that you want to double check your answers so you click on the “BACK” button and can clearly see “Would you like free testing?” and the correct button checked* 
    * *Check that pressing back button updates the correct previous survey question in the application’s state*
      * *Ex. You’re on the page with the“Would you like a translator available for you” question and you decide that you want to go back to the previous question so you click on the “BACK” button and can clearly see the “Would you like free testing?” question*
14. **COMPLETE :** Users should be able to edit any of their previous responses any time before submitting the survey
    * *Check that the state updates when edits are made to previous responses*  
    * *Check that previous responses that are being edited have to be filled out correctly to press the next button again*
      * *Ex. Change the State field in the “Enter a location” page and make sure that it only contains two letters and matches the state that you want it to and that after making the edit, the “NEXT” button is enabled*
15. **COMPLETE :** When a user goes back to edit their survey question responses, their previous responses should be pre-filled in the response boxes
    * *Check that pressing the back button will display the previous responses*  
      * *Ex. After making changes and going on to the next question, you decide that you want to change the previous question again, you click on the “BACK” button and should see all the fields to that question to be completely filled*
    * *Check the state and make sure that the previous responses are still stored correctly*
      * *Ex. Continuing off of the previous scenario, when you look at the fields, every response should be stored in the correct field. WA should be filled for  the “State” field and 98105 should be filled for the “Zip” Field* 

### Completing Survey ###
16. **COMPLETE :** Users should be able to submit their survey after completing all of the survey questions
    * *Check that pressing the submit button forwards a request to the SurveyController*  
    * *Check that pressing the submit button multiple times only makes one request to the SurveyController*

## Results Page ##
### Results List Processing ###
17. **COMPLETE :** Users should be able to see a results list of testing centers after submitting their survey
    * *Check to see that after submitting the survey the webpage loads a list of testing centers*
      * *Ex. Clicking the “SUBMIT” button will either 1. Load a “loading icon” and then load a page with a list of testing centers or 2. it directly loads the list of testing sites* 
18. **COMPLETE :** Users should receive feedback if their results take more than 1 second to process
    * *Create a timer delay in results and check to see that a loading icon renders while results are “processing”*
19. **REVISED :** The service should filter the testing center dataset to testing centers that meet one or more survey criteria
    * * **REASONING FOR REVISION :** We initially wanted to only show filtered out testing sites that matched one or more of the survey questions. However, after having a talk with the professor we decided to revise this requirement. Instead of just showing a few testing sites, our application now shows every testing site available around the Seattle vicinity. We believe this is a better design because having more testing sites available will give our users more freedom and allow them to select which site they would like to go to. We will still show the results of the survey criteria by indicating what needs were met and what weren’t (with checks/ X’s) so they can use that information to make their final decision. Personally, if I was a user, I would like it if all the testing sites were displayed because there would be more options available and my mind could’ve changed from when I took the survey. 

    * *Use a mock data set of testing centers to assert that the filtered list contains testing centers with one or more criteria met*
20. **COMPLETE :** The service should first prioritize the number of survey response criteria met by testing center
    * *Use a mock data set of testing centers to assert that the filtered list contains testing centers ordered by number response criteria met (most to least)*
21. **COMPLETE :** The service should secondly prioritize the distance of the testing center (closest to farthest) to the user’s provided location
    * *Use a mock data set of testing centers to assert that the filtered list orders testing center distance as a second priority*
22. **COMPLETE :** The service should default to sorting by closest to farthest location if no testing centers meet the survey’s response criteria
    * *Use a mock data set to assert that if no testing centers meet any of the criteria, it defaults to a list sorted by distance (closest to farthest)*

### Testing Centers ###
23. **COMPLETE :** Users should be able to see the testing center’s name
    * *Check that the testing name is rendered per each testing center*
24. **COMPLETE :** Users should be able to see how far away a testing center is from their specified location
    * *Check that the distance away is rendered per each testing center*  
    * *Check to make sure the distance calculation is accurate*
      * *Ex. Can put in your location into google maps and the destination with one of the testing sites and match the distance calculation to see if they match and is correct* 
25. **COMPLETE :** Users should be able to see a testing center’s phone number
    * *Check that the phone number is rendered per each testing center*
26. **COMPLETE :** Users should be able to see a testing center’s address
    * *Check that the address is rendered per each testing center*
27. **COMPLETE :** Users should be able to see a testing center’s hours of operation
    * *Check that the hours of operations is rendered per each testing center*
28. **COMPLETE :** Users should be able to see which criteria (from the survey’s responses) the testing center meets
    * *Check that the testing center’s criteria met are rendered per each testing center*
      * *Ex. Should see green check marks next to the criterias that match your responses. If you clicked yes on free testing, for testing sites that match it, next to them you will be able to see a green check mark next to a sentence like Free testing available”*
    * *Check to see that the criteria met rendered accurately match the survey response criteria*
      * *Ex. If you clicked on “Yes” for every survey question, you should see a list of testing sites generated and on the right-hand side you will be able to see green check marks next to the questions that matched your criteria* 
29. **COMPLETE :** Users should be able to be able to click on a testing center’s phone number to be directed to call the number
    * *Check that clicking on the testing center’s rendered phone number directs to call the number*
30. **COMPLETE :** Users should be able to click on a testing center address to be directed to Google Maps
    * *Check that clicking on the testing center’s rendered address directs to Google Maps navigation*
      * *Ex. Click on the address of the testing site and it should open up a new tab with the adress already inputted into Google Maps Navigation*

### Error Messages ###
31. **COMPLETE :** Users should receive an error message on the page when something goes wrong in the backend
    * *Create a test error message response and check that the page displays an error message*
32. **COMPLETE :** On refreshing the page after receiving an error message, the service should take the user back to the landing page
    * *Refresh the page on an error message and check that it redirects to landing page*
