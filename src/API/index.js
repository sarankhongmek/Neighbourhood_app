class Helper {
    //return base URL from fourSquare
    static baseURL (){
        return "https://api.foursquare.com/v2"
    }

    //Like the getVenus method
    static auth(){
        const keys = {
            //Your fourSquare client_id and client_secert here
            client_id: 'J0DFYILJBIR5JZ1FSEA3LWNGXG4ZFREPCIELJU5OD3BPOMQZ',
            client_secret: 'RFTIAP13YOY3DORTQVQABEIAUS5TOXRSVW2IB5D3EJXG4NGB',
            //YYYY/MM/DD
            v: '20181027'
        };
        //get all keys into array
        return Object.keys(keys).map(key => `${key}=${keys[key]}`).join("&");
    }

    static urlBuilder(urlPrams){
        if(!urlPrams){
            return ""
        }
        return Object.keys(urlPrams).map(key => `${key}=${urlPrams[key]}`).join("&");
    }
    

    static headers(){
        return {
            Accept:"application/json"
        };
    }



    static simpleFetch(endPoint,method,urlPrams){

        let requestData = {
            method,
            headers: Helper.headers()
        };
        return fetch(`${Helper.baseURL()}${endPoint}?${Helper.auth()}&${Helper.urlBuilder(urlPrams)}`,
        requestData
        ).then (response => response.json())

    }

}

export default class SquareAPI {
    static search(urlPrams){
        return Helper.simpleFetch("/venues/search","GET", urlPrams);
    }

    static getVenueDetails(VENUE_ID){
        return Helper.simpleFetch(`/venues/${VENUE_ID}`,"GET");

    }

    static getVenuPhoto(VENUE_ID){
        return Helper.simpleFetch(`/venues/${VENUE_ID}/photos`,"GET");
    }
}