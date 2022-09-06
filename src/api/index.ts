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
export const getTrackInfo = async (token:string,url:string) => {
  const result = await fetch(
      url,
      {
          method: 'GET',
          headers: { Authorization: "Bearer " + token },
      }
  )
  const data = await result.json()
  console.log('[TrackInfo]' , data)
  return data
}
// export async function getToken(clientId:String, clientSecret:String) {
//     const result = await fetch("https://accounts.spotify.com/api/token", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//         Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
//       },
//       body: "grant_type=client_credentials",
//     });
//     const data = await result.json();
//     return data.access_token;
//   }
 

export const getCurrentUserQueue = async (token:String) => {
  const result = await fetch(
      'https://api.spotify.com/v1/me/player/queue',
      {
          method: 'GET',
          headers: { Authorization: "Bearer " + token },
      }
  )
  const data = await result.json()
  console.log('[CurrentUser]' , data)
  return data
}
