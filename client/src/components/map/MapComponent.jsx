import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MapComponent = () => {
    const [map, setMap] = useState(null);
    const [activeDistrict, setActiveDistrict] = useState(null); // 활성화된 구역 상태

    const districts = {
        "강남구": { lat: 37.4959854, lng: 127.0664091 },
        "강서구": { lat: 37.550964, lng: 126.849532 },
        "관악구": { lat: 37.4784063, lng: 126.9516132 },
        "금천구": { lat: 37.4568722, lng: 126.8955781 },
        "동대문구": { lat: 37.574389, lng: 127.039243 },
        "양천구": { lat: 37.5169753, lng: 126.8664589 },
        "영등포구": { lat: 37.5263619, lng: 126.8960579 },
        "중랑구": { lat: 37.5956435098, lng: 127.0959717546 },
        "종로구": { lat: 37.5729503, lng: 126.9793579 },
        "서대문구": { lat: 37.5798718, lng: 126.9367428 },
        "성북구": { lat: 37.5894003, lng: 127.0166463 },
    };
    

    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.REACT_APP_NAVER_CLIENT_ID2}`;
        script.onload = () => {
            const mapInstance = new window.naver.maps.Map('map', {
                center: new window.naver.maps.LatLng(37.5665, 126.9780),
                zoom: 10
            });
            setMap(mapInstance);

            const fetchClothingBins = async () => {
                try {
                    const response = await axios.get('http://localhost:8080/api/clothing-bins');
                    const bins = response.data;

                    bins.forEach(bin => {
                        if (bin.latitude && bin.longitude) {
                            const marker = new window.naver.maps.Marker({
                                position: new window.naver.maps.LatLng(bin.latitude, bin.longitude),
                                map: mapInstance,
                                title: bin.roadAddress,
                                icon: {
                                    url: '/images/ico-location.png', 
                                    size: new window.naver.maps.Size(24, 37),
                                    origin: new window.naver.maps.Point(0, 0),
                                    anchor: new window.naver.maps.Point(12, 37)
                                }
                            });

                            const infoWindow = new window.naver.maps.InfoWindow({
                                content: `<div style="padding:10px;">
                                            <b>구역: ${bin.district}</b><br>
                                            <b>주소: ${bin.roadAddress}</b>
                                          </div>`
                            });

                            window.naver.maps.Event.addListener(marker, 'click', function() {
                                if (infoWindow.getMap()) {
                                    infoWindow.close();
                                } else {
                                    infoWindow.open(mapInstance, marker);
                                }
                            });
                        }
                    });
                } catch (error) {
                    console.error('Error fetching clothing bin data:', error);
                }
            };

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    const userLat = position.coords.latitude;
                    const userLng = position.coords.longitude;
                    const userLocation = new window.naver.maps.LatLng(userLat, userLng);
                    mapInstance.setCenter(userLocation);

                    new window.naver.maps.Marker({
                        position: userLocation,
                        map: mapInstance,
                        icon: {
                            content: `
                                <div style="
                                    background-color: white;
                                    border-radius: 50%;
                                    width: 60px;
                                    height: 60px;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    border: 2px solid #FF0000;
                                    font-size: 12px;
                                    color: #FF0000;">
                                    현재 위치
                                </div>
                            `,
                            anchor: new window.naver.maps.Point(30, 30),
                        }
                    });
                }, error => {
                    console.error('Error getting current position:', error);
                });
            } else {
                console.log('Geolocation is not supported by this browser.');
            }

            fetchClothingBins();
        };
        document.head.appendChild(script);
    }, []);

    const moveToDistrict = (lat, lng, district) => {
        if (map) {
            const newCenter = new window.naver.maps.LatLng(lat, lng);
            map.setCenter(newCenter);
            map.setZoom(14);
            setActiveDistrict(district);
        }
    };

    return (
        <div className="map-content">
            <div className="map-top">
                <h2>구 선택</h2>
                <ul>
                    {Object.keys(districts).map(district => (
                        <li key={district}>
                            <button
                                className={activeDistrict === district ? 'active' : ''}
                                onClick={() => moveToDistrict(districts[district].lat, districts[district].lng, district)}
                            >
                                {district}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div id="map" />
        </div>
    );
};

export default MapComponent;
