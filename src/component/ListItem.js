import React from 'react';

class ListItem extends React.Component {


  render() {
    return (
    <li className="places-list-item flex-container" 
    role="tab"
    tabIndex="0"
     onClick={() => this.props.handListItemClick(this.props)}>
    <img className="icon" src={this.props.categories[0].icon.prefix+"32"+this.props.categories[0].icon.suffix} alt={this.props.categories[0].name}/>
    {this.props.name}
    </li>)
  }


}

export default ListItem;
