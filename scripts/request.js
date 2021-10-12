async function getCurrentCountry()
{
    let country = await getLocationAwait();
    if(country)
    {
        country = await getCountryAwait(country.country);
        return country.name;
    }
    else
    {
        throw new Error('Error fetching current location');
    }
}

async function getPuzzleAwait(wordCount)
{
    let response = await fetch(`//puzzle.mead.io/puzzle?wordCount=${wordCount}`);
    if(response.status === 200)
    {
        return response.json();
    }
    else
    {
        throw new Error("Something went wrong with fetching puzzletext");
    }
}

async function getLocationAwait()
{
    let response = await fetch('//ipinfo.io/geo?token=e1b2f489a5e1c3');
    if(response.status === 200)
    {
        response = await response.json();
        return response;
    }
    else
    {
        throw new Error('Error fetching location data');
    }
}

async function getCountryAwait(countryCode)
{
    let response = await fetch('//restcountries.eu/rest/v2/all');
    if(response.status === 200)
    {
        response = await response.json();
        return response.find((country) => country.alpha2Code === countryCode);
        
    }
    else
    {
        throw new Error('Error fetching countries');
    }
}

function getPuzzlePromise(wordCount)
{
    return new Promise((resolve, reject) => 
    {
        const request = new XMLHttpRequest();
        let data = '';
        request.addEventListener('readystatechange', function(e)
        {
            if(e.target.readyState === 4 && e.target.status === 200)
            {
                data = JSON.parse(e.target.responseText);
                resolve(data);
            }
            else if(e.target.readyState === 4)
            {
                reject('An error has occured!');
            }
        });

        request.open('GET', `//puzzle.mead.io/puzzle?wordCount=${wordCount}`)
        request.send();
    });
}

function getPuzzle(wordCount, callback)
{
    const request = new XMLHttpRequest();
    let data = '';
    request.addEventListener('readystatechange', function(e)
    {
        if(e.target.readyState === 4 && e.target.status === 200)
        {
            data = JSON.parse(e.target.responseText);
            callback(undefined, data === undefined ? undefined : data)
        }
        else if(e.target.readyState === 4)
        {
            callback('Unable to fetch data', undefined);
        }
    });

    request.open('GET', `//puzzle.mead.io/puzzle?wordCount=${wordCount}`)
    request.send();
}

function getCountryFetch(countryCode)
{
    return fetch('//restcountries.eu/rest/v2/all').then((response) => 
    {
        if(response.status === 200)
        {
            return response.json();
        }
        else
        {
            throw new Error('It failed');
        }
    }).then((data) =>
    {
        let countryObject = data.find((country) => country.alpha2Code === countryCode);
        return countryObject;
    }).catch((error) =>
    {
        console.log("Error fetching from link(Possibly invalid)");
    });
};

function getLocation()
{
    return fetch('//ipinfo.io/geo?token=e1b2f489a5e1c3').then((response) =>
    {
        if(response.status === 200)
        {
            console.log(response);
            return response.json();
        }
        else
        {
            throw new Error(`Unable to fetch. Status code: ${response.status}`);
        }
    }).then((data) => 
    {
        return data;
    });
}