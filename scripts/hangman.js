
class Hangman
{
    constructor(word, guessCount)
    {
        this.word = word.split('');
        this.guessCount = guessCount;
        this.initialGuessCount = guessCount;
        this.guessed = [];
        this.status = 'Playing';
        this.gameOver = false;
    }

    displayWord()
    {
        let puzzle = '';
        let puzzleArea = document.querySelector('#puzzleText');
        puzzleArea.innerHTML = '';
        let testP = document.querySelector('#test');
        testP.innerHTML = '';
        document.querySelector('#guessesText').textContent = `Guesses left: ${this.guessCount}`;
        this.word.forEach((letter) =>
        {
            this.guessed.includes(letter.toLowerCase()) || letter === ' ' ? puzzle += letter : puzzle += '*';
        })
        puzzle.split('').forEach((char) => 
        {
            let spanObject = document.createElement('span');
            spanObject.textContent = char;
            puzzleArea.appendChild(spanObject);
        })
        if(puzzle.toLowerCase() === this.word.toString().replace(/,/g,'').toLowerCase())
        {
            this.gameOver = true;
            this.status = 'Finished'
            document.querySelector('#errorText').textContent = "You won the game! Congrats!"
            document.querySelector('#errorText').style.color = "Green";
            document.querySelector('#retryButton').style.display = '';
        }
        //document.querySelector('#puzzleText').textContent = `${puzzle}`;
        console.log(this.status);
    }

    makeGuess(guessedLetter)
    {
        if(!this.gameOver)
        {       
                let exists = false;
                if(this.guessed.includes(guessedLetter.toLowerCase()))
                {
                    document.querySelector('#errorText').textContent = `${guessedLetter} has already been guessed!`;
                }
                else
                {
                    this.guessed.push(guessedLetter.toLowerCase());
                    exists = this.word.join('').toLowerCase().includes(guessedLetter.toLowerCase()) ? true : false;

                    if(exists)
                    {
                        document.querySelector('#errorText').textContent = "";
                    }
                    else
                    {
                        document.querySelector('#errorText').textContent = "Wrong!";
                        this.guessCount--;
                        if(this.guessCount < 1)
                        {
                            this.gameOver = true;
                            this.status = 'Failed';
                            document.querySelector('#errorText').textContent = `You lost! The word was ${this.word.join('')}`;
                            document.querySelector('#retryButton').style.display = '';
                        }
                    }
                    this.displayWord();
                }     
        }
    }

    restartGame()
    {
        document.querySelector('#retryButton').style.display = 'none';
        let errorText = document.querySelector('#errorText');
        errorText.textContent = '';
        errorText.style.color = 'Red';
        this.guessed = [];
        this.gameOver = false;
        this.guessCount = this.initialGuessCount;
        this.status = 'Playing';
        console.clear();
        this.displayWord();
    }    
}