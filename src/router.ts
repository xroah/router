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
    mode: "history" | "hash"
    outlet?: string | HTMLElement
    base?: string
}

export default class Router extends Emitter {
    outlet!: HTMLElement

    constructor(
        public routes: RouteObject[] = [],
        private _options: Options = {mode: "hash"}
    ) {
        super()

        window.addEventListener(
            _options.mode === "hash" ? "hashchange" : "popstate",
            this.handlePathChange
        )

        let outlet: HTMLElement | null = null

        if (typeof _options.outlet === "string") {
            outlet = document.querySelector(_options.outlet)
        } else if (_options.outlet instanceof HTMLElement) {
            outlet = _options.outlet
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

        this.findView()
    }

    findView() {
        const views = this.outlet.querySelectorAll("router-view");

        (<NodeListOf<HTMLElement>>views).forEach(e => {
            if (!e.$router) {
                e.$router = this
            }
        })

    }

    handlePathChange = () => {

    }

    addRoute(route: RouteObject) {
        this.routes.push(route)
    }

    addRoutes(routes: RouteObject[]) {
        this.routes = this.routes.concat(routes)
    }

    push() {
        if (this._options.mode === "hash") {

        } else {

        }
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