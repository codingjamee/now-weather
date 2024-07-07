(() => {
  // src/routes/Approutes.js
  function createRouter() {
    const routes2 = [];
    const router = {
      addRoute(fragment, component) {
        routes2.push({ fragment, component });
        return this;
      },
      start() {
        const checkRoutes = () => {
          const currentRoute = routes2.find(
            (route) => route.fragment === window.location.hash
          );
          currentRoute.component();
        };
        window.addEventListener("hashchange", checkRoutes);
        checkRoutes();
      },
      navigate(fragment) {
        window.location.hash = fragment;
      }
    };
    return router;
  }

  // src/utils/constants.js
  var routes = {
    default: "#/",
    fiveDays: "#/five-days"
  };

  // src/core/Component.js
  var Component = class {
    $target;
    state;
    router;
    constructor($target, router) {
      this.$target = $target;
      this.router = router;
      this.setup();
      this.render();
    }
    setup() {
    }
    template() {
      return "";
    }
    render() {
      this.$target.innerHTML = this.template();
    }
    mounted() {
    }
    setEvent(eventType, selector, callback) {
      this.$target.addEventListener(eventType, (event) => {
        if (!event.target.closest(selector)) return false;
        callback(event);
      });
    }
    setState(newState) {
      this.state = { ...this.state, ...newState };
      this.render();
    }
  };

  // src/domain/fetch.js
  var fetchData = {
    async fetchToday({ lat, lon, APIkey }) {
      return fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`
      );
    },
    async fetchFiveDays({ lat, lon, APIkey }) {
      return fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}`
      );
    }
  };

  // src/domain/mutateDomain.js
  var getLocation = () => {
    const location = { lat: 0, lon: 0 };
    navigator.geolocation.getCurrentPosition((position) => {
      location.lat = position.coords.latitude;
      location.lon = position.coords.longitude;
    });
    return location;
  };

  // src/templates/Card.js
  var Card_default = Card = (children) => {
    return `
    <div style="width: 50%; border: 1px solid #808080; border-radius: 5px" class="card">
      ${children}
    </div>
  `;
  };

  // src/templates/Header.js
  var HeaderTwo = ({ title }) => `
	<h2 class="title-two">${title}</h2>
`;

  // src/templates/SubHeader.js
  var SubHeader = ({ title }) => `
	<h3 class="sub-header">${title}</h3>
`;

  // src/view/FiveDaysWeather.js
  var FiveDays = class extends Component {
    async setup() {
      const { lat, lon } = getLocation();
      const APIkey = process.env.APIkey;
      const data = await fetchData.fetchFiveDays({ lat, lon, APIkey });
      this.state = data;
    }
    template() {
      const innerTemplate = HeaderTwo({ title: "Seoul" }) + SubHeader({ title: "2024\uB144 1\uC6D4 1\uC77C 11\uC2DC 30\uBD84" });
      Card_default(innerTemplate);
    }
  };

  // src/view/TodayWeather.js
  var Today = class extends Component {
    async setup() {
      const { lat, lon } = getLocation();
      const APIkey = process.env.APIkey;
      const data = await fetchData.fetchToday({ lat, lon, APIkey });
      this.state = data;
      this.setEvent("click", ".card", this.router.navigate(routes.fiveDays));
    }
    template() {
      const innerTemplate = HeaderTwo({ title: "Seoul" }) + SubHeader({ title: "2024\uB144 1\uC6D4 1\uC77C 11\uC2DC 30\uBD84" });
      Card_default(innerTemplate);
    }
  };

  // src/app.js
  var App = class {
    constructor() {
      const $app = document.querySelector("#app");
      const router = createRouter();
      const today = new Today($app, router);
      const fiveDays = new FiveDays($app, router);
      router.addRoute(routes.default, today).addRoute(routes.fiveDays, fiveDays).start();
    }
  };
  new App();
})();
