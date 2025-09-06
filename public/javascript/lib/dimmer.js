export let lockdimmer = false;
const dimmer = document.getElementById('bball-icon-scroll');
const bgImg = document.querySelector('.bg-img')
const main = document.getElementById('main')
/* -------------------------- background image - Dimmer  -------------------------- */
export function lockDimmer(e){
    let target = e.currentTarget;

    if(target && target!==undefined){
        lockdimmer = true;
    }
}
const dimmerDisplay = document.createElement('p')
dimmerDisplay.classList.add('dimmer-display')
dimmerDisplay.classList.add('no-display')
main ? main.append(dimmerDisplay) : null
export function moveDimmer(e){
    if(dimmer && dimmer !== undefined){
        let mouseY = e.pageY;
        let dimmerbar = dimmer.parentElement;
        let dimmerY = dimmerbar.getBoundingClientRect().y;
        let dimmerLen = dimmerY + dimmerbar.clientHeight+50;
        // let dimmerRange = (dimmer.getBoundingClientRect().y >= dimmerY && dimmer.getBoundingClientRect().y+dimmer.clientHeight <= dimmerLen) // boolean
        let dimmerRange = (mouseY >= dimmerY && mouseY+dimmer.clientHeight <= dimmerLen) // boolean

        let [minval,maxval] = [0,dimmerbar.clientHeight]
        if(lockdimmer===true && dimmerRange){
            let originalval = mouseY - dimmerY - (dimmer.clientHeight/2)
            let mapval = .34 + (originalval - minval) / (maxval) - minval;
            dimmer.style.top = originalval + "px";
            dimmerDisplay.textContent = mouseY;
            bgImg.style.opacity = mapval.toFixed(2)
        }
    }
}
export function touchDimmer(e){
    let mouseY = e.touches[0].clientY;
    let dimmerbar = dimmer.parentElement;
    let dimmerY = dimmerbar.getBoundingClientRect().y;
    let dimmerLen = dimmerY + dimmerbar.clientHeight+50;
    // let dimmerRange = (dimmer.getBoundingClientRect().y >= dimmerY && dimmer.getBoundingClientRect().y+dimmer.clientHeight <= dimmerLen) // boolean
    let dimmerRange = (mouseY >= dimmerY && mouseY+dimmer.clientHeight <= dimmerLen) // boolean

    let [minval,maxval] = [0,dimmerbar.clientHeight]
    if(lockdimmer===true && dimmerRange){
        let originalval = mouseY - dimmerY - (dimmer.clientHeight/2)
        let mapval = .34 + (originalval - minval) / (maxval) - minval;
        dimmer.style.top = originalval + "px";
        dimmerDisplay.textContent = mouseY;
        bgImg.style.opacity = mapval.toFixed(2)
    }
}
export function releaseDimmer(e){
    // unlock the dimmer boolean
    lockdimmer = false
}
export function loadDimmer(bgImg,dimmer){
    let target = dimmer;
    let starting = dimmer.parentElement.getBoundingClientRect().y+dimmer.parentElement.clientHeight;
    
        let normalizedValue = '.35';
        console.log(normalizedValue)
        let halfBallHeight = dimmer.clientHeight/2;
        bgImg.style.opacity = normalizedValue;
}

export function resizeDimmer(dimmer){
    let percentage = '50%';
    dimmer.parentElement.style.height = percentage;
    console.log(percentage)
}

// lock onto the dimmer
if(dimmer){
    dimmer.onmousedown = lockDimmer;
    dimmer.addEventListener('touchstart',lockDimmer) // touch event
    dimmer.parentElement.onmouseover = (e) => {
    }
    dimmer.parentElement.onmouseleave = (e) => {
    }
}
// move the dimmer
window.onmousemove = moveDimmer;
window.addEventListener('touchmove',touchDimmer) // touch event
// release the dimmer
window.onmouseup = releaseDimmer;
window.addEventListener('touchend',releaseDimmer) // touch event
/* -------------------------- background image - Dimmer  -------------------------- */
