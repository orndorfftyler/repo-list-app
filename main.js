const searchURL = 'https://api.github.com/users/';

const options = {
    headers: new Headers({
    'accept':'application/vnd.github.v3+json'})
};
/*
for (var pair of options.headers.entries()) {
    console.log(pair[0]+ ': '+ pair[1]);
 }
 */
 
function displayResults(responseJson) {
    let arr = [];
    for (let i = 0; i < responseJson.length; i++) {
        let entry = `<li class="removable"><p>${responseJson[i].name} 
        <a href="${responseJson[i].html_url}">${responseJson[i].html_url}</a></p></li>`;
        arr.push(entry);
    }
    console.log(arr.join(''));
    $('.removable').remove();
    $('.results-list').append(arr.join(''));
    $('.results').removeClass('hidden');
    //console.log(responseJson);
}

function getRepos(username) {

    const url = `${searchURL}${username}/repos`;

    fetch(url,options)
    .then(response => {
        if (response.ok) {
            
            if (!$('.error-message').hasClass('hidden')) {
                $('.error-message').addClass('hidden');            
            }
            return response.json();
        } else {
            throw new Error(response.statusText);
        }
    })
    .then(responseJson => displayResults(responseJson))
    .catch(error => {$('.error-message').text(`Something went wrong: ${error.message}`);
    $('.error-message').removeClass('hidden')});

}

function receiveUsername() {
    $('form').on('click','button', event => {
        event.preventDefault();
        let username = $('#user-input').val();
        getRepos(username);
    });
}

function masterFunction() {
    receiveUsername()

}

$(masterFunction);