import createRouter from "./routes/Approutes";
import FiveDays from "./view/FiveDaysWeather";
import Today from "./view/TodayWeather";

class App {
  constructor() {
    const $app = document.querySelector("#app");
    const router = createRouter();
    router.addRoute("#/", today).addRoute("#/five-days", fiveDays).start();

    const today = new Today($app, router);
    const fiveDays = new FiveDays($app, router);
  }
}

new App();
