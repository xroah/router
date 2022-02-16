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

export function compilePath(
    path: string,
    parent?: string,
    strict?: boolean
) {
    if (path === "*") {
        path = "(.*)?"
    }
    
    path = normalizePath(path, parent, strict)

    return pathToRegexp(path, [], {strict})
}

export function normalizePath(
    path: string,
    parent?: string,
    strict?: boolean
) {
    if (!path) {
        return ""
    }

    if (path[0] !== "/") {
        path = `/${path}`
    }

    // the path may be "/"
    if (!strict && path.length > 1) {
        path = path.replace(/\/$/, "")
    }
    
    if (parent) {
        path = `${parent}/${path}`
    }

    return path.replace(/\/+/g, "/")
}

export function getHash(url: string) {
    const a = document.createElement("a")
    a.href = url

    return a.hash
}