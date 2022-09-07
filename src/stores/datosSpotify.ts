import { defineStore } from "pinia";
type Song = {
    title: String,
    artist: String,
    albumCover: string,
    duration:number,
    actual:number
  }
const apiBaseUrl = 'https://api.spotify.com/v1'
export const useDatosStore = defineStore('main', {
    state: () => ({
        datos: {},
        dataApi: {},
        loadingDoc: false
    }),
    actions: {
        async authCallback(url:string){
            try {

                let fullUrl = url.replace("/auth/callback#", "");
                let datos = {
                    access_token: fullUrl.split("&")[0].replace("access_token=", ""),
                    token_type: fullUrl.split("&")[1].replace("token_type=", ""),
                    expires_in: fullUrl.split("&")[2].replace("expires_in=", ""),
                    state: fullUrl.split("&")[3].replace("state=", ""),
                };
                this.datos = datos
            } catch (error){
                console.log('[error]', error)
            }
        },
        getAuthData(){
            try{
                return this.datos
            } catch(error){
                console.log('[error]', error)
            }
        },
        async getApiData(url:string){
            try{
                const result = await fetch(
                    url,{
                        method: 'GET',
                        headers: {
                            Authorization: "Bearer " + this.datos.access_token
                        }
                    }
                )
                const data = await result.json()
                console.log('[getApiData]', data)
                this.dataApi = data
                return data
            }catch(error){
                console.log('[error]', error)

            }
        },
        async getUserPlaylists(){
            try {
                console.log('[playlists]')
                return this.getApiData(apiBaseUrl + '/me/playlists')
            } catch (error) {
                console.log('[error]', error)
            }
        }
        
    }
})