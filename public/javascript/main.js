// console.log("hello NBL") // vstd
const navitems = [...document.querySelectorAll('#nav>ul>li>a>p')];
const select_element = document.getElementById('select-option');
const select_btn = document.getElementById('select-btn');
const header = document.getElementById('header-main')
const maintitle = document.getElementById('main-title')


// focus on select element
focusSeelectElement('Options','Options')
// update option button
select_element.onchange = () => updateOptionButton(select_element,select_btn)

select_btn.onclick = async () => {
    console.log("i clicked it")
    let val = +select_element.value;
    console.log(select_element.value)

    val > 0 ? await fetch('/option/select/'+`${select_element.value}`) : null;
}


/* ---------------------------- functions ----------------------------  */
// detect change in selecting an event
function updateOptionButton(val,btn){
    val = +val.value;
    switch(true){
        case val > 0:
        btn.classList.remove('hidden')
        btn.classList.remove('no-pointer')
        break;

        case val < 1. && val > 0:
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
        console.log(target)
        let select = target.nextElementSibling||select_element;

        // onclick event
        target.onclick = () => {
            console.log("You clicked on Target")
            select.focus(); // click on select
        }
    }
}

