 const tiles = [...document.querySelectorAll('.event-list-item')];
 const createSomething = document.getElementById('create-something')
 /* ----------------- handle tile evenets ----------------- */
 let currentPos = {x:undefined,y:undefined};
 let insideTile = false;
 const handleMouseOver = e => {
    insideTile = true;
    let customBg = [...e.currentTarget.children][e.currentTarget.children.length-1].children[0];
    customBg.classList.add('scale-up')
    // console.log(currentPos)
    // console.log("mouse is over")

 }
 const handleMouseLeave = e => {
    let customBg = [...e.currentTarget.children][e.currentTarget.children.length-1].children[0];
    customBg.classList.remove('scale-up')
    insideTile = false;
    // console.log(e.currentTarget);
    // console.log("mouse is out")
 }
 const handleMouseMove = e => {
    let target = e.currentTarget;
    if(insideTile!==false){
        currentPos.x = e.pageX;
        currentPos.y = e.pageY;

        // console.log(currentPos)
    }
 }
 const handleClick = e => {
   let targetLink = [...e.currentTarget.children][e.currentTarget.children.length-2].textContent
   let gameorevent = gameOrEvent();
   window.location.href = window.location.origin + "/" + gameorevent + "/read/" + targetLink;
 }
 /* ----------------- handle tile evenets ----------------- */

 // move over tiles
 let tt;
 for(let i = 0; i < tiles.length; i++) {
   
    if(tiles[i]){
       let customBg = `<div class="no-display" id="custom-bg-wrapper"><div id="tile-bg-container"><div class="circle translate-left"></div><div class="line line-vert"></div><div class="line line-horiz absolute"></div><div class="circle translate-right"></div></div></div>`
      let mydiv = document.createElement('div')
      mydiv.innerHTML = customBg;

      customBg = mydiv.children[0]

        tt = tiles[i];
        tt.onmouseover = handleMouseOver;
        tt.onmouseleave = handleMouseLeave;
        // tt.onmousemove = handleMouseMove;

        // click on tile
        tt.onclick = handleClick


        let pullDateNum = tt.children[0].textContent.match(/[0-9]+/g);
        let pullNum = pullDateNum ? +pullDateNum[0] : undefined;

        function convertNumToDate(num,type){
         switch(true){
            case type==='iso-date':
            return new Date(num).toDateString();
            break;

            case type==='iso-time':
            return new Date(num).toTimeString();
            break;

            default:
            console.log(undefined);
            break;
         }
        }

        let dateNum = convertNumToDate(pullNum,'iso-date');
        let timeNum = convertNumToDate(pullNum,'iso-time')
        timeNum = timeNum.split` `[0];

        // plug in variables
        tt.children[0].textContent = dateNum;
        let newP = document.createElement('p');
        newP.classList.add('bolder')
        newP.textContent = timeNum;
        tt.insertBefore(newP,tt.children[0])
        tt.appendChild(customBg);
        customBg.classList.remove('no-display')
    }
 }

 /* ----------------- read evenets ----------------- */

 const listItems = document.querySelectorAll('#event-nomenclature-container > div');
 let [light,dark] = ['silver','lightBlue'];
 let isEven = (x,y) => x % y === 0 ;

 for(let i = 0; i < listItems.length; i++){
   // console.log(listItems[i])
   let evenIdx = isEven(i,2);
   if(evenIdx){
      listItems[i].style.backgroundColor = light;
   } else {
      listItems[i].style.backgroundColor = dark;
   }
 }


//  scroll through events with left/right arrow
const arrows = document.querySelectorAll('.arrow-img');
for(let i = 0; i < arrows.length; i++){
         arrows[i].onclick = handleArrowClick
}

// scroll through events with arrow click
 async function handleArrowClick(e){
   // list tiles
   let gameorevent = gameOrEvent()
   let getevents = await fetch('../../' + gameorevent + '/' + 'all').then(r=>r.json()).then(d=>d['data']);
   // split href
   let splitRef = window.location.href.split`/`
   // get id from href
   let getID = splitRef[splitRef.length-1];
   
   // console.log(getevents)
   // console.log(getID)

   // find index within the list
   let idx
   let findObj = getevents.find(obj => obj._id === getID);
   if(findObj) idx = getevents.indexOf(findObj);
   // console.log(idx)

   let left = 'left', right = 'right';
   let classlist = e.target.classList

   let isleft = classlist.contains(`img-${left}`)
   let isright = classlist.contains(`img-${right}`)

   // console.log(isleft)
   // console.log(isright)

   if(idx >= 0 && idx < getevents.length){
      switch(true){
      case isleft:
         idx = (idx>0?idx - 1 : getevents.length-1) % getevents.length;
      break;

      case isright:
         idx = (idx + 1) % getevents.length;
      break;

      default:
         console.log(undefined);
      break;
   }
   let gameorevent = gameOrEvent();
   let getUpdatedId = getevents[idx]._id;
   window.location.href = window.location.origin + "/" + gameorevent + "/read/" + getUpdatedId;
   }
}

 /* ----------------- read evenets ----------------- */


 /* ----------------- create game/event ----------------- */
createSomething ?  createSomething.onclick = creationFunc : null
createSomething ?  createSomething.onmouseover = createMouseOver : null
createSomething ?  createSomething.onmouseleave = createMouseLeave : null

 function creationFunc(){
   let gameorevent = gameOrEvent();
   let endpoint = `/${gameorevent}/rec/create`
   // create game/event
   window.location.href = window.location.origin + endpoint
 }
 function gameOrEvent(){
   let gameorevent = window.location.pathname.match(/(game|event)/gi)
   gameorevent = gameorevent[0]||undefined
   return gameorevent;
 }

 function createMouseOver(e){
   let gameorevent = gameOrEvent();
   const target = e.currentTarget;
   const p = document.createElement('p')
   p.classList.add('create-readme')
   p.textContent = `create ${gameorevent}`
   
   console.log(p)
   document.body.appendChild(p)

 }
 function createMouseLeave(e){
   let readmes = [...document.querySelectorAll('.create-readme')]
   readmes ? readmes.map(x=>x.remove()) : null; // remove all if any
 }
 /* ----------------- create game/event ----------------- */


 /* ----------------- Window onload ----------------- */
 window.onload = e => {
   let readingEvent = window.location.pathname.split`/`.includes('read')&&[...window.location.pathname.split`/`].find(x=>x==='read');
   let footerlink = document.querySelector('#footer > a');
   readingEvent ? footerlink.setAttribute('href','/') : null;
 }
 /* ----------------- Window onload ----------------- */
