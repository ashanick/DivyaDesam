import getCenter from 'geolib/es/getCenter';
import ReactMapGL, {Marker, Popup} from 'react-map-gl'
import { useState } from 'react';
import { LocationMarkerIcon } from '@heroicons/react/solid';
import 'mapbox-gl/dist/mapbox-gl.css';

function Maps({villages}) {
    const [selectedLocation, setSelectedLocation]= useState({})
    const [openPopup, setOpenPopup] = useState(false)
    const coordinates = villages.map(result => ({
        longitude: result.long,
        latitude: result.lat
    }))

    const center = getCenter(coordinates)
    const [viewport, setViewport] = useState({
        width: '100%',
        height: '100%',
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 8
    })

        const handleClose = () => {
        // console.log('In Close')
        setSelectedLocation({})
        setOpenPopup(false)
    }

    const handlePopup = (e) => {
        // console.log ('In Handle Popup', e.result.long)
        setSelectedLocation({
            lat: e.r.lat,
            long: e.r.long
        })
        // console.log('In Handle after ', selectedLocation)
    }
  return (
    // <div>Maps</div>
    <ReactMapGL
        mapStyle='mapbox://styles/ashanick/cl5mx2vm2009514ptvhnivcsj'
        mapboxAccessToken={process.env.mapbox_key}
        {...viewport}
    >
        {villages?.map(r =>(
            <div key={r.long}>
                <Marker 
                    longitude={r.long} 
                    latitude={r.lat}
                    offsetLeft={-20}
                    offsetTop={-10}
                >
                    <p className="cursor-pointer h-[20px] w-[35px] 
                        hover:animate-bounce text-red-500"
                        onClick={(e)=>handlePopup({r})}
                        aria-label="push-pin"
                        >
                        <LocationMarkerIcon/>
                    </p>
                </Marker>
                {selectedLocation.long === r.long ? (
                <Popup closeOnClick={false}
                    onClose={handleClose}
                    longitude={r.long}
                    latitude={r.lat}
                    className="text-xl text-red-400 bg-white p-2 pb-0 rounded-lg"
                    >
                    {r.id}
                </Popup>
            ): false
            }
            </div>
        ))}

    </ReactMapGL>
  )
}

export default Maps