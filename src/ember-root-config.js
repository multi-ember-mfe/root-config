import { registerApplication, start } from "single-spa";
import { loadEmberApp } from "single-spa-ember";

registerApplication({
  name: "navbar",
  app: System.import("navbar"),
  activeWhen: () => true,
});

const isLocal = false;
const planetsDomain = isLocal
  ? "http://localhost:4201/"
  : "https://mem-planets.surge.sh";
const planetsApp = registerApplication(
  "planets",
  () => {
    const appName = "planets";
    const appUrl = `${planetsDomain}/assets/planets.js`;
    const vendorUrl = `${planetsDomain}/assets/vendor.js`;
    return loadEmberApp(appName, appUrl, vendorUrl);
  },
  (location) => location.pathname.startsWith("/planets")
);

const peopleDomain = isLocal
  ? "http://localhost:4200/"
  : "https://mem-people.surge.sh";
const peopleApp = registerApplication(
  "people",
  () => {
    const appName = "people";
    const appUrl = `${peopleDomain}/assets/people.js`;
    const vendorUrl = `${peopleDomain}/assets/vendor.js`;
    return loadEmberApp(appName, appUrl, vendorUrl);
  },
  (location) => location.pathname.startsWith("/people")
);

start({
  urlRerouteOnly: true,
});
