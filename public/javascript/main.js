/* -------------------------- variables/imports -------------------------- */
import loadWindowPlans from "./lib/loadWindowPlans.js";
import { lockdimmer } from './lib/dimmer.js'
import { resizeDimmer } from "./lib/dimmer.js";
const navitems = [...document.querySelectorAll('#nav>ul>li>a>p')];
const header = document.getElementById('header-main')
const main = document.getElementById('main')
const maintitle = document.getElementById('main-title')
const eventtitle = document.getElementById('events-title')
const eventContainer = document.getElementById('event-container-create')
const eventlistcontainer = document.getElementById('event-list-container')
const membertitle = document.getElementById('member-title')
const memberMega = document.getElementById('memeber-mega-container')
let getPos = undefined;
const bgImg = document.querySelector('.bg-img')
const scrollball = document.getElementById('bball-icon');
const dimmer = document.getElementById('bball-icon-scroll');


/* -------------------------- variables/imports -------------------------- */


/* ------------------------ Window Events ------------------------ */
// plans for window onload
window.onload = loadWindowPlans(main,bgImg,dimmer)
/* ------------------------ Window Events ------------------------ */


/* -------------------------- background images -------------------------- */

const counted = await fetch('/media/gif').then(r=>r.json()).then(d=>d['dir'])
const seconds = 7; // NBL STANDARD
let counter = 0, max = counted.length, bgInterval;
bgImg.src = '../../media/gif/' + counted[Math.floor(Math.random() * max)];

// initiate interval
bgInterval = setInterval(()=> {
    counter++
    bgImg.src = '../../media/gif/' + counted[counter % max];
},seconds*1000) // 6 seconds

// position bg image
windowResize()
window.onresize = windowResize;
window.onscroll = windowScroll;
// bgImg.onprogress = bgProgress;

function windowResize(e){
    if(bgImg.complete){
        fitImageToDevice(bgImg)
    }
    resizeDimmer(dimmer)

    getPos ? dimmer.style.top = getPos + "px" : undefined;
}
/* -------------------------- background images / resize event  -------------------------- */



/* ---------------------------- functions ----------------------------  */

function fitImageToDevice(imageElement) {
    const deviceWidth = window.innerWidth;
    const deviceHeight = window.innerHeight;

    const naturalWidth = imageElement.naturalWidth;
    const naturalHeight = imageElement.naturalHeight;

    if (!naturalWidth || !naturalHeight) {
        console.warn("Image dimensions not available yet. Ensure image is loaded.");
        return;
    }

    const imageAspectRatio = naturalWidth / naturalHeight;
    const deviceAspectRatio = deviceWidth / deviceHeight;

    let newWidth, newHeight;

    if (imageAspectRatio > deviceAspectRatio) {
        // Image is wider than the device, fit by width
        newWidth = deviceWidth;
        newHeight = deviceWidth / imageAspectRatio;
    } else {
        // Image is taller or same aspect ratio, fit by height
        newHeight = deviceHeight;
        newWidth = deviceHeight * imageAspectRatio;
    }

    imageElement.style.width = `${newWidth}px`;
    imageElement.style.height = `${newHeight}px`;
    imageElement.style.objectFit = 'contain'; // Ensures the image fits within the new dimensions without cropping
}
function windowScroll(){
    let scrollY = window.scrollY;
    if(lockdimmer === true){
        console.log('dimmer is locked')
        window.scrollTo(0,document.body.scrollTop - 1)
    }
    if(scrollY <= document.body.clientHeight){
        membertitle ? membertitle.parentElement.style.transform = `translate(${scrollY}px,0)` : null;
        scrollball ? scrollball.style.transform = `rotate(${scrollY}deg)` : null;
    }
}
/* ---------------------------- functions ----------------------------  */
