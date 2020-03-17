import axios from 'axios';

export const fromLatLng = async (lat, lng) => {
  const response = await axios
    .get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        key: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
        latlng: `${lat}, ${lng}`,
      },
    });

  return response.data.results[0].formatted_address;
};
