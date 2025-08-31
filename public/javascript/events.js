 const tiles = [...document.querySelectorAll('.event-list-item')];



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
    console.log(targetLink)
       window.location.href = window.location.origin + '/event/read/' + targetLink
 }
 /* ----------------- handle tile evenets ----------------- */

 // move over tiles
 let tt;
 for(let i = 0; i < tiles.length; i++) {
   
    if(tiles[i]){
       let customBg = `<div class="no-display" id="custom-bg-wrapper">
        <div id="tile-bg-container">
            <div class="circle translate-left"></div>
            <div class="line line-vert"></div>
            <div class="line line-horiz absolute"></div>
            <div class="circle translate-right"></div>
        </div>
    </div>`
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

      //   console.log(dateNum)
      //   console.log(timeNum)

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

 /* ----------------- read evenets ----------------- */

