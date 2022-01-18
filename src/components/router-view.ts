import {ROUTER_INIT} from "../constants";
import Router from "../router";
import {findOutlet} from "../utils"

export default class RouterView extends HTMLElement {
    $router!: Router

    constructor() {
        super()

        window.addEventListener(
            ROUTER_INIT as any,
            this.handleRouterInit,
            {once: true}
        )
    }

    connectedCallback() {
        const outlet = findOutlet(this)
        
        if (outlet) {
            this.$router = outlet.$router

            window.removeEventListener(
                ROUTER_INIT as any,
                this.handleRouterInit
            )
        }
    }

    disconnectedCallback() {
        
    }

    handleRouterInit = (e: CustomEvent) => {
        this.$router = e.detail
    }
}