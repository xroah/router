interface RouteObject {
    path: string
    component: HTMLElement
    children?: RouteObject[]
}

declare global {
    interface Window {
        __routes__: RouteObject[]
    }
}

interface Options {
    mode: "history" | "hash"
}

export default class Router {
    constructor(
        public routes: RouteObject[],
        private _options: Options = {mode: "hash"}
    ) {
        window.__routes__ = routes

        window.addEventListener(
            _options.mode === "hash" ? "hashchange" : "popstate",
            this.handlePathChange
        )
    }

    handlePathChange = () => {

    }

    push(path: string) {
        if (this._options.mode === "hash") {

        } else {
            
        }
    }

    go(n: number) {

    }

    forward() {

    }

    back() {

    }
}