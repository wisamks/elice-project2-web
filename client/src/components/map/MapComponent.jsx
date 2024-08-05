import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MapComponent = () => {
    const [map, setMap] = useState(null);

    // 서울특별시 각 구의 중심 좌표 목록
    const districts = {
        "중랑구": { lat: 37.5956435098, lng: 127.0959717546 },
        "강남구": { lat: 37.4959854, lng: 127.0664091 },
        "서대문구": { lat: 37.5798718, lng: 126.9367428 },
        "성북구": { lat: 37.5894003, lng: 127.0166463 }
        // 필요한 구의 좌표 추가
    };

    useEffect(() => {
        const mapInstance = new window.naver.maps.Map('map', {
            center: new window.naver.maps.LatLng(37.5665, 126.9780), // 초기 중심 좌표 (서울 시청)
            zoom: 10  // 초기 줌 레벨
        });
        setMap(mapInstance);  // 지도 인스턴스를 상태로 설정

        const fetchClothingBins = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/clothing-bins');
                const bins = response.data;

                bins.forEach(bin => {
                    if (bin.latitude && bin.longitude) {
                        const marker = new window.naver.maps.Marker({
                            position: new window.naver.maps.LatLng(bin.latitude, bin.longitude),
                            map: mapInstance,
                            title: bin.roadAddress
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

        // 사용자의 현재 위치 가져오기
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const userLat = position.coords.latitude;
                const userLng = position.coords.longitude;

                // 사용자의 현재 위치를 중심으로 지도 이동
                const userLocation = new window.naver.maps.LatLng(userLat, userLng);
                mapInstance.setCenter(userLocation);

                // 현재 위치에 마커 추가
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
                        anchor: new window.naver.maps.Point(30, 30), // 중심점 설정
                    }
                });
            }, error => {
                console.error('Error getting current position:', error);
            });
        } else {
            console.log('Geolocation is not supported by this browser.');
        }

        fetchClothingBins();
    }, []);

    // 지도 중심을 이동시키는 함수
    const moveToDistrict = (lat, lng) => {
        if (map) {
            const newCenter = new window.naver.maps.LatLng(lat, lng);
            map.setCenter(newCenter);
            map.setZoom(14); // 구로 이동할 때 확대 수준을 조정할 수 있음
        }
    };

    return (
        <div>
            <div>
                <h2>구 선택</h2>
                <ul>
                    {Object.keys(districts).map(district => (
                        <li key={district}>
                            <button onClick={() => moveToDistrict(districts[district].lat, districts[district].lng)}>
                                {district}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div id="map" style={{ width: '100%', height: '500px' }} />
        </div>
    );
};

export default MapComponent;
