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
}

customElements.define("home-page", Home)