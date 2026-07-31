Part 1: Project Structure
Before writing any code, set up your project files:
week4/weekend/calculator/
calculator.html
calculator.js
calculator.css

Part 2: The HTML Structure
Create calculator.html with the following markup.
Read through the comments carefully - each decision is explained. Separate the HTML from the CSS.

Part 3: The Calculator Logic Function
Open calculator.js. Start with the pure logic function. This function has no knowledge of the DOM - it only receives values and returns a result.

Part 4: Selecting DOM Elements
After the logic function, select and cache references to the DOM elements you will interact with. 
Do this once, at load time, rather than querying the DOM on every button click.

Part 5: The Display Helper Function
Write a small helper function that handles all updates to the result element.
Keeping DOM updates in one location means you only have one place to change if the output format ever needs to be different.

Part 6: The Event Handler
Write the function that runs whenever any operator button is clicked. 
This function reads the inputs, validates them, calls calculate, and updates the display.

Part 7: Attaching the Event Listeners
The final step is wiring the event handler to all four buttons. 
Because querySelectorAll returns a NodeList, you can use forEach to loop through it and attach the same handler to each button

Part 8: The Complete calculator.js File
Here is the entire JavaScript file assembled in one place for reference:
Part 9: Testing Your Calculator
Work through each of the following tests after completing the lab. 
For each test, write down what you expect before you try it, then verify the actual output

Part 10: Stretch Enhancements
These are optional challenges for students who finish the core lab early or want to go further
A. Clear Button
Add a "Clear" button to the UI that resets both input fields and removes the result text.

Hint: Add the button to the HTML and attach a click listener that sets input1.value = '', input2.value = '', and clears the result display.

B. Keyboard Support
Allow the user to press the Enter key while inside either input field to trigger the last selected operator.

Hint: Listen for the keydown event on both inputs. Check if event.key === 'Enter' and store the last clicked operator in a variable that persists between calls.

C. Calculation History Log
Append each successful calculation to a list below the result display, showing the full equation and answer.

Example output in the log:

D. Chain Results
After a calculation, populate the first input field with the result automatically, so the user can immediately use it as the starting value for the next operation.

Hint: After calling displayResult, also do input1.value = result when result is a number.

E. Light and Dark Mode Toggle
Add a toggle button that switches the page between a light and a dark colour scheme.

Hint: Add a .dark-mode class to your CSS with alternative colours for background, text, and input elements. The button's click handler should add or remove that class on the <body> element.