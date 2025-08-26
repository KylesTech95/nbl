 console.log('hello events')
 const tiles = [...document.querySelectorAll('.event-list-item')];


 /* ----------------- handle evenets ----------------- */
 const handleMouseOver = e => {
    console.log(e.currentTarget);
    console.log("mouse is over")
 }
 const handleMouseLeave = e => {
    console.log(e.currentTarget);
    console.log("mouse is out")
 }
 /* ----------------- handle evenets ----------------- */

 
 let tt;
 for(let i = 0; i < tiles.length; i++) {
    if(tiles[i]){
        tt = tiles[i];
        tt.onmouseover = handleMouseOver;
        tt.onmouseleave = handleMouseLeave;
    }
 }

