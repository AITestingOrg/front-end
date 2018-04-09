import React, { Component } from 'react';

class Map extends Component {
  render() {
    return (
      <div>
        <iframe
          width="1900"
          height="1000"
          frameborder="0"
          src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDUjJ1FcUOLpx5_xAP6C_EOn5V1pJoQbQM&q=Space+Needle,Seattle+WA" allowfullscreen="">
          </iframe>
      </div>
    );
  }
}

export default Map;
