import axios from "axios";

export const geoCode = async (place) => {
  const res = await axios.get(
    "https://api.openrouteservice.org/geocode/search",
    {
      params: {
        api_key: process.env.ORS_API_KEY,
        text: place,
        size: 1,
      },
    }
  );

  const coords = res.data.features[0].geometry.coordinates;
  return coords; // [lng, lat]
};
