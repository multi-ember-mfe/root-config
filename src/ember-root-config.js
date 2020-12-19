import { registerApplication, start } from "single-spa";
import { loadEmberApp } from "single-spa-ember";

registerApplication({
  name: "@react-mf/navbar",
  app: () => System.import("@react-mf/navbar"),
  activeWhen: ["/"],
  customProps: {
    domElementGetter: () => document.querySelector("#nav"),
  },
});

const isLocal = false;
const planetsDomain = isLocal
  ? "http://localhost:4201/planets"
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
  ? "http://localhost:4200/people"
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
