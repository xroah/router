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
    path = path.replace(/\*/g, "(.*)?")
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

    return cleanPath(path)
}

export function getHash(url: string) {
    const a = document.createElement("a")
    a.href = url

    return a.hash
}

export function getBasePath(path: string) {
    const re = /(.*\/)[^\/]*$/
    const ret = re.exec(path)
    
    if (ret) {
        return ret[1]
    }

    return ""
}

export function cleanPath(path: string) {
    return path.replace(/\/+/g, "/")
}