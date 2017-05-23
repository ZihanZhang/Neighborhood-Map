import React, {Component} from 'react';

export default class extends Component {
    shouldComponentUpdata() {
        return false;
    }

    componentDidMount() {
        this.map = new google.maps.Map( this.refs.map, {
            center: {lat: this.props.lat, lng: this.props.lng},
            zoom: 15
        })
    }

  render() {
    return (
      <div id="map" ref="map" style={{height: '100%', wdith: '100%'}}/>
    );
  }
}