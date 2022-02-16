export default class RouterLink extends HTMLElement {
    constructor() {
        super()

        const shadowRoot = this.attachShadow({mode: "open"})
        shadowRoot.innerHTML = `
            <a href="#"><slot></slot></a>
        `
    }

    connectedCallback() {
        if (!this.to) {
            throw new Error("To is required")
        }

        this.addEventListener("click", this.handleClick)
    }

    disconnectedCallback() {
        this.removeEventListener("click", this.handleClick)
    }

    handleClick = (e: MouseEvent) => {
        e.preventDefault()

        if (this.$router) {
            if (this.replace) {
                this.$router.replace(this.to)
            } else {
                this.$router.push(this.to)
            }
        }
    }

    get to() {
        return this.getAttribute("to") || ""
    }

    set to(v: string) {
        this.setAttribute("to", v)
    }

    get replace() {
        return this.hasAttribute("replace")
    }

    set replace(v: boolean) {
        if (v) {
            this.setAttribute("replace", "")
        } else {
            this.removeAttribute("replace")
        }
    }
}