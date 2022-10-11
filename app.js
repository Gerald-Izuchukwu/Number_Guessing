const playBtn = document.querySelector('#playBtn');
const playersName = document.querySelector('#playersName');
const welcome = document.querySelector('.welcome');
const guess = document.querySelector('.guess');
const submitBtn = document.querySelector('#submit');
const game = document.querySelector('.game');
const resultMessage = document.querySelector('.after');
const stageDiv = document.querySelector('.stageDiv');
const gameOver = document.querySelector('.gameOver');
const container = document.querySelector('.container');

let minNumber = 1; //initializing minimum number
let maxNumber = 2; //initializing maximum number
let stage = 1;
let point = 0;
let winningNumber = randomNumber(minNumber, maxNumber); // getting random winning number

playBtn.addEventListener('click', function (e) {
	let name = playersName.value;
	if (name === '') {
		alert('Please enter a name to begin');
	} else {
		const div = document.createElement('div');
		div.className = 'greeting';
		div.innerHTML = `
            <p><b>Welcome ${name}</b></p>
            <p>
				Guess a number between ${minNumber} and
				${maxNumber}, if you guess it correctly at the first attempt, you get a point and advance to the next stage.  
			</p>
            `;

		welcome.appendChild(div);
		stageDiv.style.display = 'block';
		game.style.display = 'block';
		e.target.parentElement.style.display = 'none'; //making the whole form div invisible
	}
});

submitBtn.addEventListener('click', play);

function play(minNum, maxNum) {
	minNum = minNumber; //assigning the minimum and max value to equal the two parameters passed
	maxNum = maxNumber;

	let output = '';
	let guessInput = parseInt(guess.value);

	if (guessInput === '') {
		alert('Please Enter a guess');
	} else if (guessInput > maxNum || guessInput < minNum) {
		alert('The number you entered is not within the range');
		guess.value = '';
	} else if (guessInput === winningNumber) {
		output = `<p style="color: green;">You guessed correctly</p>`;
		resultMessage.innerHTML = output;
		nextStage(); //if the guess is correct, then next stage is called
	} else {
		output = '<p style="color: red;">You guessed wrongly</p>';
		resultMessage.innerHTML = output;
		setTimeout(clearResultMessage, 2000);
		gameEnd(); // if the guess is wrong, game end is called
	}
	console.log(minNumber, maxNumber);
	console.log(guessInput);
	console.log(winningNumber);
}

function nextStage() {
	maxNumber = maxNumber + 1; //increasing the max number
	winningNumber = randomNumber(minNumber, maxNumber);
	stage = stage + 1; // increasing stage
	point = point + 1; // increasing point
	setTimeout(clearResultMessage, 2000); //
	guess.value = '';
	stageDiv.innerHTML = `
    <p> You are now in stage: ${stage}</p>
    <p> Points: ${point}</p>
        `;
	welcome.firstElementChild.style.display = 'none';

	const ifDIv = document.querySelector('.container > .new');
	if (ifDIv) {
		ifDIv.innerHTML = `Guess a number between ${minNumber} and
      ${maxNumber}, if you guess it correctly at the first attempt, you get a point and advance to the next stage.`;
		return; // to break out of the code
	}

	const div = document.createElement('div');
	div.className = 'new';
	div.innerHTML = `Guess a number between ${minNumber} and
    ${maxNumber}, if you guess it correctly at the first attempt, you get a point and advance to the next stage.  `;

	container.insertBefore(div, game);
}

function clearResultMessage() {
	resultMessage.innerHTML = '';
}

function randomNumber() {
	return Math.floor(Math.random() * maxNumber) + minNumber;
}
function gameEnd() {
	guess.value = '';
	guess.disabled = true;

	welcome.firstElementChild.firstElementChild.innerHTML = `<b>Sorry ${playersName.value}`;
	welcome.firstElementChild.firstElementChild.nextElementSibling.style.display =
		'none'; // making the game instruction invisible
	const ifDIv = document.querySelector('.container > .new');
	ifDIv.style.display = 'none'; // making the game instruction invisible
	stageDiv.style.display = 'none';

	let output = `I'm sorry you lost at the first guess, the correct guess is ${winningNumber}. Your score is ${point} `;

	gameOver.innerHTML = output;

	submitBtn.value = 'Play Again';
	submitBtn.className += 'play-again';
}

game.addEventListener('mousedown', function (e) {
	if (e.target.className === 'play-again') {
		window.location.reload();
	}
});
