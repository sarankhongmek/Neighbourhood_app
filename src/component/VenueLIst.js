import React from 'react';
import ListItem from './ListItem';

class VenueLIst extends React.Component {


  render() {
    return (
    <ol className="places-list">
        {this.props.venues && this.props.venues.map((venue,index) => <ListItem key={index} {...venue} handListItemClick={this.props.handListItemClick}/>)}
        
    </ol>
    )
  }


}

export default VenueLIst;
//ctr +shift + p