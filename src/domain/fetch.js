export const fetchData = {
  async fetchToday({ lat, lon, APIkey }) {
    return fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`
    );
  },
  async fetchFiveDays({ lat, lon, APIkey }) {
    return fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}`
    );
  },
};
