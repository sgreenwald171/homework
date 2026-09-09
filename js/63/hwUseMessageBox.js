import showMessage from "./messageBox.js";

showMessage("Is this enough homework?", ['Yes', 'No', 'Maybe'], usersChoice => console.log('you picked ' + usersChoice));