import createRouter from "./routes/Approutes";
import { routes } from "./utils/constants";
import FiveDays from "./view/FiveDaysWeather";
import Today from "./view/TodayWeather";

class App {
  constructor() {
    const $app = document.querySelector("#app");
    const router = createRouter();

    const today = new Today($app, router);
    const fiveDays = new FiveDays($app, router);
    router
      .addRoute(routes.home, today)
      .addRoute(routes.default, today)
      .addRoute(routes.fiveDays, fiveDays)
      .start();
  }
}

new App();
