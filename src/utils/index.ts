import {pathToRegexp} from "path-to-regexp"

export function findOutlet(el: HTMLElement) {
    let p: HTMLElement | null = el

    while ((p = p.parentElement) && p !== document.body) {
        if (p.$router) {
            break
        }
    }

    if (p === document.body) {
        p = null
    }
    
    return p
}

export function compilePath(path: string, parent?: string) {
    return pathToRegexp(path)
}
