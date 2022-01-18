export function findOutlet(el: HTMLElement) {
    let p: any = null

    while ((p = el.parentElement) && p !== document.body) {
        if (p.$router) {
            break
        }
    }

    if (p === document.body && !p.$router) {
        p = null
    }
    
    return p
}
