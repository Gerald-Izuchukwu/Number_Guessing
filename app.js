const playBtn = document.querySelector('#playBtn');
const welcome = document.querySelector('.welcome');
const guess = document.querySelector('.guess');
const submitBtn = document.querySelector('#submit');
const game = document.querySelector('.game');
const resultMessage = document.querySelector('.after');
const stageDiv = document.querySelector('.stageDiv');
const gameOver = document.querySelector('.gameOver');
const container = document.querySelector('.container');

let minNumber = 1;
let maxNumber = 2;
let initialStage = 1;
let initialPoint = 0;
let winningNumber = randomNumber(minNumber, maxNumber);

playBtn.addEventListener('click', function (e) {
	let name = e.target.previousElementSibling.value;
	if (name === '') {
		alert('Please enter a name to begin');
	} else {
		const div = document.createElement('div');
		div.className = 'greeting';
		div.innerHTML = `
            <b>Welcome ${name}</b>
            <p>
				Guess a number between ${minNumber} and
				${maxNumber}, if you guess it correctly at the first attempt, you get a point and advance to the next stage.  
			</p>
            `;

		welcome.appendChild(div);
		stageDiv.style.display = 'block';
		game.style.display = 'block';
		e.target.parentElement.style.display = 'none';
	}
});

submitBtn.addEventListener('click', play);

function play(minNum, maxNum) {
	minNum = minNumber;
	maxNum = maxNumber;

	let output = '';
	let guessInput = parseInt(guess.value);

	if (guessInput === '') {
		alert('Please Enter a guess');
	} else if (guessInput > maxNum || guessInput < minNum) {
		alert('The number you entered is not within the range');
		guess.value = '';
	} else if (guessInput === winningNumber) {
		output = `<p>You guessed correctly</p>`;
		resultMessage.innerHTML = output;
		setTimeout(clearResultMessage, 2000);
		nextStage();
	} else {
		output = '<p>You guessed wrongly</p>';
		resultMessage.innerHTML = output;
		setTimeout(clearResultMessage, 2000);
		gameEnd();
	}
	console.log(minNumber, maxNumber);
	console.log(guessInput);
	console.log(winningNumber);
}

function nextStage() {
	let currentStage = initialStage; //parseInt(stage.innerHTML);
	let currentPoint = initialPoint; //parseInt(point.innerHTML);
	guess.value = '';
	stageDiv.innerHTML = `
    <p> You are now in stage: ${currentStage + 1}</p>
    <p> Points: ${currentPoint + 1}</p>
        `;
	welcome.firstElementChild.style.display = 'none';

	const div = document.createElement('div');
	div.className = 'new';
	div.innerHTML = `Guess a number between ${minNumber} and
    ${maxNumber}, if you guess it correctly at the first attempt, you get a point and advance to the next stage.  `;

	container.insertBefore(div, game);

	// play(minNumber, newMaxNumber);
	// newStage();
}

function newStage() {
	// have a message that tells the user what to do
	// increase the range
	// if()
}

function clearResultMessage() {
	resultMessage.innerHTML = '';
}

function randomNumber() {
	return Math.floor(Math.random() * maxNumber) + minNumber;
}
function gameEnd() {
	let currentPoint = parseInt(point.innerHTML);
	guess.value = '';
	guess.disabled = true;

	let output = `I'm sorry you lost at the first guess, the correct guess is ${winningNumber}. Your score is ${currentPoint} `;

	gameOver.innerHTML = output;

	submitBtn.value = 'Play Again';
	submitBtn.className += 'play-again';

	// change welcome name to sorry name
}

game.addEventListener('mousedown', function (e) {
	if (e.target.className === 'play-again') {
		window.location.reload();
	}
});
