const clientId = 'e748752dc75a45fea9adcd26f3ee6ed0'

const url = "https://accounts.spotify.com/api/token";

async function getToken(){
    const result = await fetch(url,{
        method: "POST",
        headers: {
            'Content-Type': "application/x-www-form-urlencoded",
        },
        body:  `grant_type=client_credentials&client_id=${clientId}&client_secret=c09bda9c947749ad8ecb4d2e854b090d`
    })
    const data = await result.json()
    return data.access_token
}

const token = await getToken()

export async function getResults(query){
    let songs = []
    const result = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track`,{
        method: "GET",
        headers:{
            'Authorization': "Bearer " + token
        }
    })
    const search = await result.json()
    for(let track in search.tracks.items){
        songs.push(search.tracks.items[track])
    }
    return songs
}
