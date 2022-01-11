import EventEmitter from "./utils/emitter"

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
}

export default class Router extends EventEmitter {
    constructor(
        public routes: RouteObject[] = [],
        private _options: Options = {mode: "hash"}
    ) {
        super()

        window.addEventListener(
            _options.mode === "hash" ? "hashchange" : "popstate",
            this.handlePathChange
        )
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

    go() {

    }

    forward() {

    }

    back() {

    }
}