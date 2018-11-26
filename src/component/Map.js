/* global google */
import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"

import blueDot from '../blueDott.png';



const MyMapComponent = withScriptjs(withGoogleMap((props) =>



  <GoogleMap
    defaultZoom={8} zoom={props.zoom} center={props.center}
    defaultCenter={{ lat: 57.147684, lng: -2.093633 }}
  >
  
    {props.markers  !== undefined ? props.markers.filter(marker => marker.isVisible).map((marker,index,arr) => {
      
        const venueInfo = props.venues.find(venue => venue.id === marker.id)
        return (<Marker key={index} position={{ lat: marker.lat, lng: marker.lng }} onClick={ () => props.handelMarkerClick(marker)} animation={arr.length === 1 ? google.maps.Animation.BOUNCE : google.maps.Animation.DROP} > 

              {marker.isOpen && venueInfo.bestPhoto && (<InfoWindow> 
                <React.Fragment> 
                  <img src ={`${venueInfo.bestPhoto.prefix}120x120${venueInfo.bestPhoto.suffix}`} alt={venueInfo.name}/>
                  <p>{venueInfo.name}</p>
                </React.Fragment>
              </InfoWindow> )}
        </Marker>)
 
    }): ""}
    	<Marker 
	    						onClick={ () => props.handelMarkerClick(props.markers)}
                  icon={blueDot}
                  position={{ lat: parseFloat(props.markers.lat), lng: parseFloat(props.markers.lng) }}
		    			/>
    



  </GoogleMap>
))





class Map extends React.Component {

  componentDidMount() {
		//Error handling for Google Maps
		window.gm_authFailure = () => {
			const gmErrorMessage = document.getElementById('map');
			gmErrorMessage.firstChild.setAttribute('style', 'display: initial;');
		}
	}


  render() {
    return (
      <div className="map-container">
          	<div id="map" role="application" tabIndex="0"> 
              <div id="error-gm"><p>Google Maps failed to load : (</p></div>
                <MyMapComponent
                  {...this.props}
                  isMarkerShown
                  googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAnA0lhXmHx70_49JWfZ7MbKbV32Oua00Y"
                  loadingElement={<div style={{ height: `100%` }} />}
                  containerElement={<div style={{ height: `100%`,width: '100%' }} />}
                  mapElement={<div style={{ height: `100%` }} />}
                  />
              </div>
      </div>
	    	
    );
  }


}

export default Map;
