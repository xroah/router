import Router, {RouterRecord} from "../router"
import {findOutlet} from "../utils"
import {EventObject} from "../utils/emitter"

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

        router.on("path-change", this.handlePathChange)
    }

    connectedCallback() {
        const outlet = findOutlet(this)

        if (outlet) {
            this.$router = outlet.$router
        }
    }

    handlePathChange = (e: EventObject) => {
        const matched = e.data as RouterRecord[]

        if (matched.length) {
            const depth = this.getDepth()
            const record = matched[depth]

            if (record) {
                const {component} = record
                const child = this.firstElementChild
                const newChild = document.createElement(component)

                if (child) {
                    if (child.tagName !== component) {
                        this.replaceChild(newChild, child)
                    }
                } else {
                    this.appendChild(newChild)
                }
            }
        } else {
            Array.from(this.children).forEach(c => c.remove())
        }
    }

    getDepth() {
        let depth = 0
        let node: HTMLElement | null = this.parentElement

        while (node && node !== document.body) {
            if (node.__isRouterView__) {
                depth++
            }

            node = node.parentElement
        }

        return depth
    }

    disconnectedCallback() {
        if (this.$router) {
            this.$router.off(
                "path-change",
                this.handlePathChange
            )
        }
    }
}