function userInformationHTML(user){
    return`
    <h3 id="github-user-name">
        <a href="${user.html_url}" target="_blank">${user.login}</a>
    </h3>
    <div class="gh-content">
        <div class="gh-avatar mb-3">
            <a href="${user.html_url} target="_blank">
                <img src="${user.avatar_url}" width="80" alt="${user.login}">
            </a>
        </div>
        <p>Followers: ${user.followers} - Following: ${user.following}
            <br>Repos: ${user.public_repos}
        </p>
    </div>`;

    var username = getElementById("username").innerHTML;
        if(username == null){
            username.innerHTML = "";
        }

}

function repoInformationHTML(repos){
    if(repos.length == 0){
        return`<div class="clearfix repo-list">No repo!</div>`;
    }

    var listItemHTML = repos.map(function(repo){
        return `<li>
                    <a href="${repo.html_url}" target="_blank
                    ">${repo.name}</a>
                </li>`
    });

    return `<div class="clearfix repo-list">
                <p><stron>Repo List:</strong></p>
                <ul>${listItemHTML.join("\n")}</ul>
            </div>`
}

function fetchGitHubInformation(){
    $("#gh-user-data").html("");
    $("#gh-repo-data").html("");


    var username = $("#gh-username").val();
    if(!username){
        $("#gh-user-data").html(`<h5>Please enter a GitHub username</h5>`);
        return;
    }

    $("#gh-user-data").html(
        `<div id="loader">
            <img src="assets/images/loader.gif" alt="loading...">
        </div>`)

    $.when(
        $.getJSON(`https://api.github.com/users/${username}`),
        $.getJSON(`https://api.github.com/users/${username}/repos`)
    ).then(
        function(firstResponse, secondResponse){
            var userData = firstResponse[0];
            var repoData = secondResponse[0];
            $("#gh-user-data").html(userInformationHTML(userData));
            $("#gh-repo-data").html(repoInformationHTML(repoData));
        }, function(errorResponse){
            if(errorResponse.status === 404){
                $("#gh-user-data").html(
                    `<h5>No info found for user ${username}</h5>`);
            } else if(errorResponse.status === 403){
                var resetTime = new Date(errorResponse.getResponseHeader('X-RateLimit-Reset')*1000);
                $("#gh-user-data").html(`<h4>Too many requests, please wait until ${resetTime.toLocaleTimeString()}</h4>`);
            } else{
                console.log(errorResponse);
                $("#gh-user-data").html(`<h5>Error: ${errorResponse.responseJSON.message}</h5>`);
            }
        })
}

$(document).ready(fetchGitHubInformation);

var userInput = document.getElementById("gh-username");
userInput.oninput = fetchGitHubInformation;

