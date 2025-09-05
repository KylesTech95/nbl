export let lockdimmer = false;
const dimmer = document.getElementById('bball-icon-scroll');

/* -------------------------- background image - Dimmer  -------------------------- */
export function lockDimmer(e){
    let target = e.currentTarget;

    if(target && target!==undefined){
        lockdimmer = true;
    }
}
export function moveDimmer(e){
    let mouseY = e.pageY;
    if(lockdimmer !== false){
        // value is the current value you want to scale.
        // minValue is the minimum possible value in your original data range.
        // maxValue is the maximum possible value in your original data range.
        // let normalizedValue = ((mouseY*1.9) - minValue) / (maxValue - minValue).toFixed(2);
        // let halfBallHeight = dimmer.clientHeight/2;
        // let pointTarget = mouseY - dimmer.parentElement.getBoundingClientRect().y - halfBallHeight;

        // // if dimmer is within the bar (parent)
        // if(mouseY > dimmer.parentElement.getBoundingClientRect().y && mouseY < (dimmer.parentElement.getBoundingClientRect().y + dimmer.parentElement.clientHeight) ){
        //     console.log(normalizedValue)
        //     bgImg.style.opacity = normalizedValue;
        //     dimmer.style.top = pointTarget + "px";
        // }
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
    lockdimmer = false
}
export function loadDimmer(bgImg,dimmer){
    let target = dimmer;
    let starting = dimmer.parentElement.getBoundingClientRect().y+dimmer.parentElement.clientHeight;
    
        let normalizedValue = '.6';
        console.log(normalizedValue)
        let halfBallHeight = dimmer.clientHeight/2;
        let pointTarget = starting - dimmer.parentElement.getBoundingClientRect().y - halfBallHeight;
        bgImg.style.opacity = normalizedValue;
        target.style.top = pointTarget + "px";
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
