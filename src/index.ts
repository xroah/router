import RouterView from "./components/router-view"
import RouterLink from "./components/router-link"

function defineEl(name: string, ctor: new () => HTMLElement) {
    if (!customElements.get(name)) {
        customElements.define(name, ctor)
    }
}

defineEl("router-view", RouterView)
defineEl("router-link", RouterLink)

export {default} from "./router"