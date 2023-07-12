import * as React from 'react'
import {useCurrentPosition} from 'react-use-geolocation'
import Spinner from '../components/spinner'

function Location() {
  const testing = useCurrentPosition();
  const [position, error] = testing;
  // const testing = useCurrentPosition()
  // console.log('=====Error====',testing);
  console.log('=====position====',position);
  console.log('=====error====',error);
  console.log('=====testing====',testing);
  // console.log('=====Position====',position);

  if (!position && !error) {
    return <Spinner />
  }

  if (error) {
    return (
      <div role="alert" style={{color: 'red'}}>
        {error.message}
      </div>
    )
  }
  return (
    <div>
      <p>Latitude: {position.coords.latitude}</p>
      <p>Longitude: {position.coords.longitude}</p>
    </div>
  )
}

export default Location
