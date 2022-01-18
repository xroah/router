import {ROUTER_INIT} from "./constants"
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
}

export default class Router extends Emitter {
    outlet: HTMLElement

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
            if (!_options.outlet) {
                this.outlet = document.body
            } else {
                throw new Error("Can not find the outlet element")
            }
        } else {
            this.outlet = outlet
        }

        
        window.dispatchEvent(new CustomEvent(
            ROUTER_INIT,
            {
                detail: this
            }
        ))
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