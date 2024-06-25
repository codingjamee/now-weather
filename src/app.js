import createRouter from "./routes/Approutes";
import FiveDays from "./view/FiveDaysWeather";
import Today from "./view/TodayWeather";

class App {
  constructor() {
    const $app = document.querySelector("#app");
    const today = new Today($app);
    const fiveDays = new FiveDays($app);

    const router = createRouter();
    router.addRoute("#/", today).addRoute("#/five-days", fiveDays).start();
  }
}

new App();
