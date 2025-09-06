export function indicateAuthNavLink(remote,target){
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