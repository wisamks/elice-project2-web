import React from 'react';
import MapComponent from '../../components/map/MapComponent';

import './MapPage.css';

const MapPage = () => {
    return (
        <div className="MapPage">
            <h1 className='page-title'>의류수거함 지도</h1>
            <MapComponent />
        </div>
    );
};

export default MapPage;
