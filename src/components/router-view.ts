import Router from "../router"
import {findOutlet} from "../utils"

export default class RouterView extends HTMLElement {
    $router!: Router
    _router!: Router

    connectedCallback() {
        Object.defineProperty(this, "$router", {
            get: () => {
                return this._router
            },
            set: (router: Router) => {
                this._router = router
            }
        })

        const outlet = findOutlet(this)

        if (outlet) {
            this.$router = outlet.$router
        }
    }

    disconnectedCallback() {
        
    }
}