export function fetchPopularRepos(language)
{
    const endpoint = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`)

    return fetch(endpoint)
        .then((result) => result.json())
        .then((data) => {
            if (!data.items)
            {
                throw new Error(data.message)
            }
            return data.items
        })
}

function sortPlayers(players)
{
    return players.sort((a, b) => b.score - a.score)
}

export function battle(players)
{
    return Promise.all([
        getUserData(players[0]),
        getUserData(players[1])
    ])
    .then((results) => sortPlayers(results))
}

const gh_id = '26790a75b08519806284'
const gh_secret = '34050c1dc43c9506d130ebaf24fd12279a7a4877'
const params = `?client_id=${gh_id}&client_secret=${gh_secret}`

function getErrorMsg(message, username)
{
    if (message === 'Not Found')
    {
        return `${username} doesn't exist`
    }

    return message
}

function getProfile(username)
{
    return fetch(`https://api.github.com/users/${username}${params}`)
        .then((res) => res.json())
        .then((profile) => {
            if (profile.message)
            {
                throw new Error(getErrorMsg(profile.message, username))
            }
            return profile
        })
}

function getRepos(username)
{
    return fetch(`https://api.github.com/users/${username}/repos${params}&per_page=100`)
        .then((res) => res.json())
        .then((repos) => {
            if (repos.message)
            {
                throw new Error (getErrorMsg(repos.message, username))
            }
            return repos
        })
}

function getStarCount(repos)
{
    return repos.reduce((runningSum, {stargazers_count}) => runningSum + stargazers_count, 0)
}

function calculateScore(followers, repos)
{
    return (followers * 3) + getStarCount(repos)
}

function getUserData(player)
{
    return Promise.all(
        [
            getProfile(player),
            getRepos(player)
        ]
    ).then(([profile, repos]) => 
    {
        return {
            profile,
            score: calculateScore(profile.followers, repos)
        }
    })
}