class Home extends HTMLElement {
    constructor() {
        super()

        const shadowRoot = this.attachShadow({mode: "open"})
        shadowRoot.innerHTML = `
            <div>Home page</div>
            <style>
                div {
                    color: red;
                }
            </style>
        `
    }
    
    connectedCallback() {
        console.log("home mounted")
    }
    
    disconnectedCallback() {
        console.log("home unmounted")
    }
}

customElements.define("home-page", Home)