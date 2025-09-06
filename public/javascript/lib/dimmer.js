export let lockdimmer = false;
const dimmer = document.getElementById('bball-icon-scroll');
const bgImg = document.querySelector('.bg-img')
console.log(bgImg)
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
export function touchDimmer(e){
    if(lockdimmer !== false){ // if true
        let mouseY = e.touches[0].clientY;
        // value is the current value you want to scale.
        // minValue is the minimum possible value in your original data range.
        // maxValue is the maximum possible value in your original data range.
        let normalizedValue = ((mouseY*1.9) - minValue) / (maxValue - minValue).toFixed(2);
        let halfBallHeight = dimmer.clientHeight/2;
        let pointTarget = mouseY - dimmer.parentElement.getBoundingClientRect().y - halfBallHeight;

        // if dimmer is within the bar (parent)
        if(mouseY > dimmer.parentElement.getBoundingClientRect().y && mouseY < (dimmer.parentElement.getBoundingClientRect().y + dimmer.parentElement.clientHeight) ){
            console.log(normalizedValue)
            bgImg.style.opacity = normalizedValue;
            dimmer.style.top = pointTarget + "px";
        }
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
