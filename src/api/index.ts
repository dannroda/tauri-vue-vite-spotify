let baseSpotifyApiUrl = 'https://api.spotify.com/v1'
export function generateRandomString(length:Number) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};


export const getAuth = (client_id:string) => {
    var redirect_uri = 'http://localhost:5173/auth/callback';
    var stateKey = 'spotify_auth_state'
var state = generateRandomString(16);

localStorage.setItem(stateKey, state);
var scope = 'user-read-private user-read-email user-library-read user-read-currently-playing user-read-playback-state';

var url = 'https://accounts.spotify.com/authorize';
url += '?response_type=token'
url += '&client_id=' + encodeURIComponent(client_id)
url += '&scope=' + encodeURIComponent(scope)
url += '&redirect_uri=' + encodeURIComponent(redirect_uri)
url += '&state=' + encodeURIComponent(state)
return url
}
export const getApiData = async (token:string,url:string) => {
  const result = await fetch(
      url,
      {
          method: 'GET',
          headers: { Authorization: "Bearer " + token },
      }
  )
  const data = await result.json()
  console.log('[getApiData]' , data)
  return data
}

export const getCurrentUserQueue = async (token:String) => {
  const result = await fetch(
      baseSpotifyApiUrl +'/me/player/queue',
      {
          method: 'GET',
          headers: { Authorization: "Bearer " + token },
      }
  )
  const data = await result.json()
  console.log('[Current Queue]' , data)
  return data
}
export const getCurrentSong = async (token:String) => {
  const result = await fetch(
    baseSpotifyApiUrl  + '/me/player/currently-playing',{
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token
      }
    }
  )
  const data = await result.json()
  console.log('[CurrentSong Data]', data)
  return data
}

export const getPlayer = async (token:String) => {
  const result = await fetch(
    baseSpotifyApiUrl + '/me/player',{
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token
      }
    }
  )
  const data = await result.json()
  console.log('[PLAYER DATA]', data)
  return data
}