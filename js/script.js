window.addEventListener("DOMContentLoaded", () => {
  const tabs = require("./modules/tabs"),
    modals = require("./modules/modals"),
    loader = require("./modules/loader"),
    data = require("./modules/data"),
    accordion = require("./modules/accordion"),
    cards = require("./modules/cards"),
    sliders = require("./modules/sliders"),
    form = require("./modules/form");
  tabs();
  modals();
  loader();
  data();
  accordion();
  cards();
  sliders();
  form();
});
