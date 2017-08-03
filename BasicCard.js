var inquirer = require('inquirer');
var ClozeCard = require('./ClozeCard.js');
var questions = require('./questions.js');

// Create initial variables
var Questions = [], currentQuestion = 0, correct =0, wrong = 0;

//  Creates the card array
for (var i = 0; i < questions.length; i++) {
	var flashcard = new ClozeCard(questions[i].text, questions[i].cloze);
	Questions.push(flashcard);
}

// The function that askes the questions using Inquirer
function askQuestion() {
	inquirer.prompt([
		{
			type: 'input',
			// Shows only the partial statement from the constructor
			message: Questions[currentQuestion].partialText() + '\nAnswer: ',
			name: 'guess'
		}
	]).then(function (answers) {
		console.log('\n');
		// Tests if asnwer is correct
		if (answers.guess.toLowerCase() === Questions[currentQuestion].cloze.toLowerCase()) {
			console.log('Correct!');
			// Keeps track of the score
			correct++;
		} else {
			console.log('Wrong');
			// Keeps track of the score
			wrong++;
		}
		// Shows the correct answer
		console.log(Questions[currentQuestion].fullText());
		
		if (currentQuestion < Questions.length - 1) {
			currentQuestion++;
			askQuestion();
		} else {
			console.log('Game Over!');
			console.log('Correct Answers: ' + correct);
			console.log('Incorrect Answers: ' + wrong);

			// Play again prompt
			inquirer.prompt([
				{
					type: 'confirm',
					message: 'Had enough?',
					name: 'Again'
				}
			]).then(function (answers) {
				if (!answers.Again) {
					// Reset
					currentQuestion = 0;
					correct = 0;
					wrong = 0;
					askQuestion();
				} else {
					console.log('Thanks for playing!');
				}
			})
		}
	})
}
// Initializes the game
askQuestion();