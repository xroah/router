import Emitter from "./utils/emitter"
import {compilePath} from "./utils"

interface RouteObject {
    path: string
    component: string
    children?: RouteObject[]
}

interface RouterRecord {
    regexp: RegExp,
    path: string,
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
    private _pathList: string[] = []

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
        routes.forEach(r => {
            if (!r.path) {
                throw new Error("The route path is required")
            }
            
            const parentPath = parent ? parent.path : ""
            const record: RouterRecord = {
                regexp: compilePath(r.path, parentPath),
                path: r.path,
                component: r.component
            }

            if (r.children) {
                
            }
        })
    }

    findView() {
        const views = this._outlet.querySelectorAll(
            "router-view, router-link"
        );

        (<NodeListOf<HTMLElement>>views).forEach(e => {
            if (!e.$router) {
                e.$router = this
            }
        })
    }

    handleHashChange = () => {
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