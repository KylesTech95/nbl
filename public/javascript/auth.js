
import loadWindowPlans from "./lib/loadWindowPlans.js"

loadWindowPlans()
let existing = document.getElementById('existing-login')
let newcomer = document.getElementById('newcomer')
let links = [...document.querySelectorAll('#nav>ul>li>a')];
let login = links.find(link => link.textContent.toLowerCase() === 'login')
let signup = links.find(link => link.textContent.toLowerCase() === 'signup')

existing && login ? indicateAuthNavLink(existing,login) : null;
newcomer && signup ? indicateAuthNavLink(newcomer,signup) : null

function indicateAuthNavLink(remote,target){
    remote.onmouseover = e => {
        let href = e.currentTarget.parentElement.href.split`/`.slice(-1)[0];
        let thref = target.href.split`/`.slice(-1)[0];
        
        console.log(href)
        console.log(thref)

        if(href===thref){
            target.classList.add('orange-glow')
        }
    }

    remote.onmouseleave = e => {
        let href = e.currentTarget.parentElement.href.split`/`.slice(-1)[0];
        let thref = target.href.split`/`.slice(-1)[0];
        
        console.log(href)
        console.log(thref)

        if(href===thref){
            target.classList.remove('orange-glow')
        }
    }
}