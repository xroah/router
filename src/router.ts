import Emitter from "./utils/emitter"
import {
    compilePath,
    getHash,
    normalizePath
} from "./utils"
import {PATH_CHANGE} from "./constants"

interface RouteObject {
    path: string
    component: string
    children?: RouteObject[]
    strict?: boolean
}

interface Path {
    path: string,
    normalizedPath: string
}

export interface RouterRecord extends Path {
    regexp: RegExp,
    parent?: RouterRecord
    component: string
}

interface Options {
    outlet?: string | HTMLElement
    base?: string
}

export default class Router extends Emitter {
    private _outlet!: HTMLElement
    private _pathMap: Map<string, RouterRecord> = new Map()
    private _pathList: Path[] = []

    constructor(
        public routes: RouteObject[] = [],
        options: Options = {}
    ) {
        super()

        let outlet: HTMLElement | null = null

        if (typeof options.outlet === "string") {
            outlet = document.querySelector(options.outlet)
        } else if (options.outlet instanceof HTMLElement) {
            outlet = options.outlet
        }

        if (!outlet) {
            throw new Error("Can not find the outlet element")
        } else {
            if (outlet === document.body) {
                throw new Error("The outlet can not be body")
            }

            this._outlet = outlet
        }

        if (this._outlet.$router) {
            throw new Error("The outlet already has an router")
        }

        this.init()
    }

    init() {
        this.createRouteMap(this.routes)
        this.findView()
        window.addEventListener("hashchange", this.handleHashChange)

        if (!location.hash) {
            location.hash = "#/"
        }
    }

    createRouteMap(routes: RouteObject[], parent?: RouterRecord) {
        const {_pathList, _pathMap} = this

        routes.forEach(r => {
            const {path, strict} = r

            if (!path) {
                throw new Error("The route path is required")
            }

            const parentPath = parent ? parent.path : ""
            const normalizedPath = normalizePath(r.path, parentPath, strict)
            const record: RouterRecord = {
                regexp: compilePath(path, parentPath, strict),
                path: path,
                normalizedPath,
                component: r.component
            }

            if (r.children) {
                this.createRouteMap(routes, record)
            }

            _pathList.push({
                path,
                normalizedPath
            })
            _pathMap.set(normalizedPath, record)
        })

        // ensure * routes are always at the end
        for (let i = _pathList.length - 1; i >= 0; i--) {
            if (_pathList[i]!.path === "*") {
                const tmp = _pathList.splice(i, 1)[0]

                _pathList.push(tmp!)
            }
        }
    }

    findView() {
        const views = this._outlet.querySelectorAll(
            "router-view, router-link"
        );

        (<NodeListOf<HTMLElement>>views).forEach(e => {
            if (!e.$router) {
                e.$router = this

                this.emitPathChange(location.href)
            }
        })
    }

    handleHashChange = (e: HashChangeEvent) => {
        const {newURL} = e

        this.emitPathChange(newURL)
        console.log(e)
    }

    emitPathChange(url: string) {
        const matched = this.match(getHash(url).substring(1))

        this.emit(PATH_CHANGE, matched)
    }

    match(url: string) {
        let ret: RouterRecord[] = []

        for (let p of this._pathList) {
            const record = this._pathMap.get(p.normalizedPath)

            if (record) {
                if (url.match(record.regexp)) {
                    ret = this.getMatched(record)
                    break
                }
            }
        }

        return ret
    }

    getMatched(matched?: RouterRecord) {
        const ret: RouterRecord[] = []

        while (matched) {
            ret.push(matched)

            matched = matched.parent
        }

        return ret
    }

    addRoute(route: RouteObject) {
        this.routes.push(route)
    }

    addRoutes(routes: RouteObject[]) {
        this.routes = this.routes.concat(routes)
    }

    push() {

    }

    replace() {

    }

    go() {

    }

    forward() {

    }

    back() {

    }
}