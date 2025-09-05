import { loadDimmer } from "./dimmer.js";
// const homeref = document.getElementById('homeref');
// const bball = document.getElementById('title-container');

export default function loadWindowPlans(main,bgImg,dimmer){
    const pathname = window.location.pathname;
        main ? main.classList.remove('hidden') : null;
        // return
        dimmer ? loadDimmer(bgImg,dimmer) : null;
}