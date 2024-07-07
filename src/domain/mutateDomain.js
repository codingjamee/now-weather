export const getLocation = () => {
  const location = { lat: 0, lon: 0 };
  navigator.geolocation.getCurrentPosition((position) => {
    location.lat = position.coords.latitude;
    location.lon = position.coords.longitude;
  });
  return location;
};
