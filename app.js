/*
GAME FUNCTION:

- player must guess a number between a min and max
- player gets a certain amount of guesses
- notify player of guesses remaining 
- notify the player of the correct answer if loose
-       let player choose a play again 

*/

// Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

//Ui Elements

const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');


// assign Ui min and max

minNum.textContent = min;
maxNum.textContent = max;

// play again event listener 


game.addEventListener('mousedown', function(e) {
    if (e.target.className === 'play-again') {
        window.location.reload();
    }
});

// listner for guess

guessBtn.addEventListener('click', function() {

    let guess = parseInt(guessInput.value);

    // validate

    if (isNaN(guess) || guess < min || guess > max) {

        setMessage(`Please enter number between ${min}  and  ${max}`, 'red');

    }

    //check if won

    if (guess === winningNum) {

        gameOver(true, `${winningNum} is correct. YOU WON!`);

    } else {

        // wrong  number 

        guessesLeft -= 1;


        if (guessesLeft === 0) {


            //game over - lost

            gameOver(false, `Game over you, you lost.the correct number was ${winningNum}`);

        } else {
            // game continue answer wrong
            // clear input
             // Change border color
             guessInput.style.borderColor = 'red';

            guessInput.value = "";

            // tell user its the wrong number 

           
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');

        }


    }



});




function gameOver(won, msg) {

    let color;
    won === true ? color = "green" : color = "red";

    // Disable input;

    guessInput.disabled = true;
    //change border color

    guessInput.style.borderColor = color;
    // message color

    message.style.color = color;

    //set message
    setMessage(msg);
    // play again ?
    guessBtn.value = "Play Again";
    guessBtn.className += 'play-again';



}

// Get Winning Number
function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}