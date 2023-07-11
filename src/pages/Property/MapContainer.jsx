import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const mapStyles = {
  width: '90%',
  height: '400px',
  
};

class MapContainer extends Component {
  render() {
    const { google } = this.props;
    const { latitude, longitude } = this.props.coordinate; // Replace with your desired coordinate

    return (
        <Map
            google={google}
            zoom={14}
            style={mapStyles}
            initialCenter={{ lat: latitude, lng: longitude }}
        >
            <Marker position={{ lat: latitude, lng: longitude }} />
        </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBoZFGXOCwer9dv34IPMOhFqlApLBQtprs', // Replace with your Google Maps API key
})(MapContainer);
