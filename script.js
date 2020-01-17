'use strict';


function formatQueryParams(params) {
    const queryItems = Object.keys(params).map(key => `${[encodeURIComponent(key)]}=${encodeURIComponent(params[key])}`);
    return queryItems.join('&');
}

function displayResults(responseJson, maxResults) {
    console.log(responseJson);
    
    $('.js-error').empty();
    $('.results-list').empty();
  
    for (let i = 0; i < responseJson.data.length & i < maxResults; i++) {
        $('#results-list').append(`<li><h3><a href="${responseJson.data[i].url}">${responseJson.data[i].fullName}</a></h3>
        <p>${responseJson.data[i].description}</p>
      </li>`);

        //console.log(resposneJson.data);
        console.log(responseJson.data[i]);
    }
    $('.results').removeClass('hidden');
    //console.log(responseJson.data[i]);
}


 function getParks(baseURL, searchTerm, maxResults, apiKey) {
   
   const params = {
     stateCode: searchTerm,
     limit: maxResults
   }
 
 const queryString = formatQueryParams(params);
    const url = baseURL + '?' + queryString + '&api_key=' + apiKey;
    console.log(url);

 
    fetch(url)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson, maxResults))
    .catch(err => {
        $('.js-error-message').text(`Something went wrong: ${err.message}`);
    });
}


function watchForm () {
  $('form').submit(event => { 
    event.preventDefault();
    const baseURL = 'https://api.nps.gov/api/v1/parks'
    const searchTerm = $('#js-search-term').val().split(",");
    const maxResults = $('#js-max-results').val();
    
    const apiKey = 'YpOl7efDossCZ1KQ5mTYJHrWDqKiRDPv8AxKaAlg'
    
    getParks(baseURL, searchTerm, maxResults, apiKey);
  })
}
$(watchForm);