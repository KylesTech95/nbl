 console.log('hello events')
 const tiles = [...document.querySelectorAll('.event-list-item')];


 /* ----------------- handle evenets ----------------- */
 let currentPos = {x:undefined,y:undefined};
 let insideTile = false;
 const handleMouseOver = e => {
    insideTile = true;
    // console.log(currentPos)
    // console.log("mouse is over")
 }
 const handleMouseLeave = e => {
    insideTile = false;
    // console.log(e.currentTarget);
    // console.log("mouse is out")
 }
 const handleMouseMove = e => {
    let target = e.currentTarget;
    console.log(target)
    if(insideTile!==false){
        currentPos.x = e.pageX;
        currentPos.y = e.pageY;

        // console.log(currentPos)
    }
 }
 /* ----------------- handle evenets ----------------- */


 // move over tiles
 let tt;
 for(let i = 0; i < tiles.length; i++) {
    if(tiles[i]){
        tt = tiles[i];
        // tt.onmouseover = handleMouseOver;
        // tt.onmouseleave = handleMouseLeave;
        // tt.onmousemove = handleMouseMove;
    }
 }

