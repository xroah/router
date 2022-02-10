import Emitter from "./utils/emitter"

declare global {
    interface HTMLElement {
        $router: Router
    }
}

interface RouteObject {
    path: string
    component: HTMLElement
    children?: RouteObject[]
}

interface Options {
    outlet?: string | HTMLElement
    base?: string
}

export default class Router extends Emitter {
    outlet!: HTMLElement
    current = "/"
    prev = ""

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

            this.outlet = outlet
        }

        if (this.outlet.$router) {
            throw new Error("The outlet already has an router")
        }

        this.init()
    }

    init() {
        this.findView()
        window.addEventListener("hashchange", this.handleHashChange)

        if (!location.hash) {
            location.hash = "#/"
        } else {
            this.current = location.hash.substring(1)
        }
    }

    findView() {
        const views = this.outlet.querySelectorAll("router-view");

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