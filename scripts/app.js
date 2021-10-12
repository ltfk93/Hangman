let game;
newStartGame();
//printInfo();

function createTipper(tip)
{
    tip /= 100;
    (ammount) =>
    {
        return ammount * tip;
    }
}

async function newStartGame()
{
    let puzzleObject = await getPuzzleAwait(1);
    if(puzzleObject === undefined)
    {
        console.log("Invalid arguement provided!");
    }
    else
    {
        console.log(puzzleObject.puzzle);
        game = new Hangman(puzzleObject.puzzle, 6);

        game.displayWord();
        window.addEventListener('keypress', function(e)
        {
            document.querySelector('#instruction').style.visibility = "hidden";
            game.makeGuess(e.key);
        });
        document.querySelector('#retryButton').addEventListener('click', function(e)
        {
            game.restartGame();
            newStartGame();
        })
    }
}

function startGame()
{
    getPuzzlePromise(1).then((data) => 
    {
        if(data === undefined)
        {
            console.log('Invalid argument provided');
        }
        else
        {
            console.log(data);
            let Hangman1 = new Hangman(data.puzzle, 6);

            Hangman1.displayWord();
            window.addEventListener('keypress', function(e)
            {
                document.querySelector('#instruction').style.visibility = "hidden";
                Hangman1.makeGuess(e.key);
                //getWord();
            });
            document.querySelector('#retryButton').addEventListener('click', function(e)
            {
                Hangman1.restartGame();
                startGame();
            })
        }
    }, (err) => 
        {
            console.log(err);
        })
}

/*getLocation().then((location) =>
{
    getCountryFetch(location.country).then((data) =>
    {
        console.log(`You are located in ${location.city}, ${location.region}. ${data.name}`)
    })
}).catch((error) =>
{
    console.log(error);
});*/

async function printInfo()
{
    const code =  await getLocationAwait();
    const info = await getCountryAwait(code.country);
    console.log(`You are located in ${code.city}, ${code.region}. ${info.name}`);
}

/*getCurrentCountry().then((data) =>
{
    console.log(`You are localized in ${data}`);
}).catch((error) =>
{
    console.log("Error: ", error);
});*/