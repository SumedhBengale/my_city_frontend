import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import'./map.css';

const mapStyles = {
  width: '100%',
  
};

class MapContainer extends Component {
  render() {
    const { google } = this.props;
    const props = this.props.coordinate; // Replace with your desired coordinate
    const lat = parseFloat(props.lat);
    const lng = parseFloat(props.lng);

    console.log(lat, lng)
    return (
          <div id='mapBox'>
            <Map center={true}
                google={google}
                zoom={14}
                style={mapStyles}
                initialCenter={{ lat: lat, lng: lng }}
            >
                <Marker position={{ lat: lat, lng: lng }} />
            </Map>
          </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBoZFGXOCwer9dv34IPMOhFqlApLBQtprs', // Replace with your Google Maps API key
})(MapContainer);
