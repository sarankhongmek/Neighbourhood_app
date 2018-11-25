import React, { Component } from 'react';
import Map from './component/Map';
import SquareAPI from './API/index'
import Sidebar from './component/Sidebar';


class App extends Component {
  constructor(){
    super();
    this.state = {
      venues: [],
      markers: [],
      center:[],
      zoom: 12,
      upDateSuperState: obj => {
        this.setState(obj)
      }
    };
  }





  handelMarkerClick = (marker) => {
    this.closeAllMarkers()
    marker.isOpen = true;
    this.setState({markers: Object.assign(this.state.markers,marker)});
    const venue = this.state.venues.find(venue => venue.id === marker.id)
    SquareAPI.getVenueDetails(marker.id).then(res => 
      {
        const newVenue = Object.assign(venue,res.response.venue);
        this.setState({venues: Object.assign(this.state.venues, newVenue)});
        console.log(newVenue)
      });
  }


  	//when new selection is made
 	//close previous info window
   closeAllMarkers = () => {
    const markers = this.state.markers.map(marker => {
      marker.isOpen = false;
      return marker;
    })
    this.setState({ markers: Object.assign(this.state.markers,markers)});
  }



  handListItemClick = venue => {
    const marker = this.state.markers.find(marker => marker.id === venue.id);
    this.handelMarkerClick(marker);
    console.log(venue)
  }


  componentDidMount(){
    SquareAPI.search({
      near:"Aberdeen",
      query: "Museum",
      limit: 10,
      "radius":5000,
    }).then(results => {
      const { venues } = results.response;
      const { center } = results.response.geocode.feature.geometry;
      const markers =  venues.map(venue => {
        return {
          lat:venue.location.lat,
          lng:venue.location.lng,
          isOpen:false,
          isVisible:true,
          id: venue.id,
        };
      });
      this.setState({venues,center,markers});
      document.getElementById('error-fs').setAttribute('style', 'display: none;');
    }).catch(err => {
      document.getElementById('error-fs').setAttribute('style', 'display: initial;');
    });
  }

  render() {
    return (
      <div className="App">
      <main className="flex-container main-content">
        <section>
        <Sidebar {...this.state} handListItemClick={this.handListItemClick}/>
        <div id="error-fs"><p>Venues failed to update : (</p></div>
        </section>
      
        
        <aside>
        <Map { ...this.state} handelMarkerClick={this.handelMarkerClick} />
        </aside>
        
        </main>
      </div>
    );
  }
}

export default App;
