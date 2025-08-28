// console.log("hello NBL") // vstd
const navitems = [...document.querySelectorAll('#nav>ul>li>a>p')];
const select_element = document.getElementById('select-option');
const select_btn = document.getElementById('select-btn');
const header = document.getElementById('header-main')
const main = document.getElementById('main')
const maintitle = document.getElementById('main-title')
const eventtitle = document.getElementById('events-title')
const eventContainer = document.getElementById('event-container-create')
const eventlistcontainer = document.getElementById('event-list-container')


// focus on select element
focusSeelectElement('Options','Options')
// update option button
select_element.onchange = () => updateOptionButton(select_element,select_btn)
// selection button (options)
select_btn.onclick = updateOptionFromServer
// plans for window onload
window.onload = loadWindowPlans
window.onchange = updateOptionOnchange(select_element)

window.onkeydown = e => {
    // let selectoptions = [...select_element.children];
    // let pathname = window.location.pathname;
    // let splitpathname = pathname.split`/`;
    // let getpath = splitpathname[splitpathname.length-1];
    // let curroption = selectoptions.find(x=>new RegExp(getpath,'ig').test(x.textContent)),
    // currIndex = selectoptions.indexOf(curroption);

    if((!select_btn.classList.contains('no-display') && +select_element.value > 0)){
        if(e.key === 'Enter'){
            // console.log('it works!')
            select_btn.click()
    }
    }
}



/* -------------------------- background images -------------------------- */
const bgImg = new Image();
bgImg.classList.add('bg-img');
bgImg.classList.add('no-pointer');

const counted = await fetch('/media/gif').then(r=>r.json()).then(d=>d['dir'])
const seconds = 7; // NBL STANDARD
let counter = 0, max = counted.length, bgInterval;

bgImg.src = '../../media/gif/' + counted[Math.floor(Math.random() * max)];
main.appendChild(bgImg)
// initiate interval
bgInterval = setInterval(()=> {
    
    counter++
    // console.log(counter);
    // console.log("MODELO")
    // console.log(counter % max)
    // console.log(counted[counter % max])
    bgImg.src = '../../media/gif/' + counted[counter % max];
},seconds*1000) // 6 seconds


// position bg image
configureBgImage()
window.onresize = configureBgImage;
bgImg.onprogress = bgProgress;
function configureBgImage(e){
    const midwidth = document.body.clientWidth / 2;
    if(bgImg.complete){
        // bgImg.style.left = midwidth;
        // bgImg.style.top = document.body.clientHeight / 2;
        fitImageToDevice(bgImg)
    }
}

function bgProgress(e){
    console.log(e.currentTarget);
    console.log(e)
}

/* -------------------------- background images / resize event -------------------------- */






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
function updateOptionButton(val,btn){
    const pathname = window.location.pathname;
    val = +val.value;
    // console.log(val)
    switch(true){
        case val > 0:
        counter = 0;
        bgImg.classList.add('no-display')
        btn.classList.remove('hidden')
        btn.classList.remove('no-pointer')
        break;

        case val === 0:

        // console.log(window.location)
        window.location.href = window.location.origin;
        bgImg.src = '../../media/gif/' + counted[Math.floor(Math.round() * counted.length)];
        bgImg.classList.remove('no-display')
        if(!/^\/$/.test(pathname))main.classList.add('hidden')
        if(maintitle)maintitle.classList.remove('hidden')
        if(eventlistcontainer)eventlistcontainer.classList.remove('no-display')
        if(eventContainer)eventContainer.classList.add('hidden')
        if(eventtitle){
            let pathsplit = window.location.pathname.split`/`
            let pathname = pathsplit[pathsplit.length-1];
            eventtitle.textContent = pathname[0]+pathname.slice(1,pathname.length) + " Events"
        }
        btn.classList.add('hidden')
        btn.classList.add('no-pointer')
        break;

        default:
            console.log(undefined);
        break
    }
    return;
}
function focusSeelectElement(string,expectation){
    const stringMatches = new RegExp(string,'g').test(expectation);
    const foundStrinMath = navitems.find(s=>new RegExp(string,'g').test(s.textContent)).textContent.replace(/^\s/,'')
    // console.log(stringMatches)
    if(stringMatches && foundStrinMath){
        let target = navitems.find(s=>new RegExp(string,'g').test(s.textContent))
        // console.log(target)
        let select = target.nextElementSibling||select_element;

        // onclick event
        target.onclick = () => {
            console.log("You clicked on Target")
            select.focus(); // click on select
        }
    }
}
function loadWindowPlans(){
    const pathname = window.location.pathname;
    if(/^\/$/.test(pathname)){
        main.classList.remove('hidden')
    }
}
async function updateOptionFromServer(){
    let val = +select_element.value;
    // console.log(select_element.value)

    if(val > 0){
        await fetch('/option/select/'+`${select_element.value}`).then(r=>r.json())
        .then(data => {
            const pathname = window.location.pathname;
            console.log(data)
                switch(true){
                    
                    case data['val'] === 0: // 0
                    window.location.href = window.location.origin + '/event/list/all';
                    break;
                    case data['val'] === 1: // 1
                    // maintitle.textContent = 'Create An Event'
                    if(eventtitle){
                        eventtitle.textContent = 'Create An Event'
                        if(maintitle)maintitle.classList.add('hidden');
                    } else {
                        if(maintitle)maintitle.textContent = 'Create an Event';
                    }
                    if(eventlistcontainer)eventlistcontainer.classList.add('no-display')
                    main.classList.remove('hidden')
                    eventContainer.classList.remove('hidden')
                    break;
                    case data['val'] === .25: // 0
                    window.location.href = window.location.origin + '/event/list/upcoming';
                    break;
                    case data['val'] === .5: // 0
                    window.location.href = window.location.origin + '/event/list/completed';
                    break;
                    case data['val'] === .75: // 0
                    window.location.href = window.location.origin + '/event/list/canceled';
                    break;

                    case data['val'] === 2: //2
                    main.classList.remove('hidden')
                    eventContainer.classList.add('hidden')
                    if(eventlistcontainer)eventlistcontainer.classList.add('no-display')
                    if(eventtitle){
                        eventtitle.textContent = 'Create a Game';
                        maintitle.classList.add('hidden')
                    } else {
                        maintitle.classList.remove('hidden')
                        maintitle.textContent = 'Create a Game';
                    }
                    break;

                    default:
                    console.log(undefined);
                    break;
                }
        })
    }
    else {
        return null
    }
}
function updateOptionOnchange(select){
    
    let options = [...select.children];
    let pathname = window.location.pathname;
    let splitpathname = pathname.split`/`;
    let getpath = splitpathname[splitpathname.length-1];
    // console.log(getpath)


    let target = options.find(elem => new RegExp(getpath,'i').test(elem.textContent))||'not found';
    console.log(target)
    // console.log(optionNames);
    // console.log(pathname)
    select.value = target === 'not found' ? 0 : target.value;
    
}