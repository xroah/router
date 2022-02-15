import Router from "../router"
import {findOutlet} from "../utils"

export default class RouterView extends HTMLElement {
    private _router!: Router

    get __isRouterView__() {
        return true
    }

    get $router() {
        return this._router
    }

    set $router(router: Router) {
        if (this._router) {
            return
        }

        this._router = router
    }

    connectedCallback() {
        const outlet = findOutlet(this)

        if (outlet) {
            this.$router = outlet.$router
        }
    }

    disconnectedCallback() {

    }
}