import Router from "../router"
import {findOutlet} from "../utils"

export default class RouterView extends HTMLElement {
    $router!: Router

    connectedCallback() {
        const outlet = findOutlet(this)

        if (outlet) {
            this.$router = outlet.$router
        }
    }

    disconnectedCallback() {
        
    }
}