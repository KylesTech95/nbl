
import loadWindowPlans from "./lib/loadWindowPlans.js"
import { indicateAuthNavLink } from "./lib/navigation.js";

loadWindowPlans()
let existing = document.getElementById('existing-login')
let newcomer = document.getElementById('newcomer')
let links = [...document.querySelectorAll('#nav>ul>li>a')];
let login = links.find(link => link.textContent.toLowerCase() === 'login')
let signup = links.find(link => link.textContent.toLowerCase() === 'signup')

existing && login ? indicateAuthNavLink(existing,login) : null;
newcomer && signup ? indicateAuthNavLink(newcomer,signup) : null

