import React from 'react';
import VenueLIst from './VenueLIst';

class Sidebar extends React.Component {
  constructor(){
    super();
    this.state = {
      query: "",
      //venues:[]
    };
  }
//filter venues
  handleFilterVenues = () =>{
    if(this.state.query.trim() !== ""){
      const venues = this.props.venues.filter(venue => venue.name.toLowerCase().includes(this.state.query.toLowerCase()))
      return venues
    }
    return this.props.venues
  }
  handleChange = e => {
    this.setState({ query: e.target.value });
    const markers = this.props.venues.map(venue => {
      const isMatched = venue.name.toLowerCase().includes(e.target.value.toLowerCase());
      const marker = this.props.markers.find(marker => marker.id === venue.id)
      if(isMatched) {
        marker.isVisible = true;
      } else {
        marker.isVisible = false;

      }
      return marker
    });
    this.props.upDateSuperState({markers})
  }
  render() {

    

    return (
    <div className="category-filter">
        <input className="category-selection" type={"search"} id={"search"} placeholder={"Filter venues"} onChange={this.handleChange} /> 
        <VenueLIst {...this.props} venues={this.handleFilterVenues()} handListItemClick={this.props.handListItemClick} />
    </div>
    )

  }

 
}

export default Sidebar;
