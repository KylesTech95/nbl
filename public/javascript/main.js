console.log("hello NBL")
const navitems = [...document.querySelectorAll('#nav>ul>li>a>p')];
const select_element = document.getElementById('select-event');
const select_btn = document.getElementById('select-btn');
const header = document.getElementById('header-main')


// if events is clicked, open select
function linkOpensSelect(string,expectation){
    const stringMatches = new RegExp(string,'g').test(expectation);
    const foundStrinMath = navitems.find(s=>new RegExp(string,'g').test(s.textContent)).textContent.replace(/^\s/,'')
    console.log(stringMatches)
    if(stringMatches && foundStrinMath){
        let target = navitems.find(s=>new RegExp(string,'g').test(s.textContent))
        console.log(target)
        let select = target.nextElementSibling||select_element;

        // onclick event
        target.onclick = () => {
            console.log("You clicked on Target")
            select.focus(); // click on select
        }
    }
}

linkOpensSelect('Events','Events')
select_element.onchange = () => detectChange(select_element.value,select_btn)

// detect change in selecting an event
function detectChange(val,btn){
    val = +val;
    console.log(val)
    switch(true){
        case val > 0:
        btn.classList.remove('hidden')
        break;

        case val < 1:
        btn.classList.add('hidden')
        break;

        default:
            console.log(undefined);
        break
    }

    return;
}
