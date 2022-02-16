class Profile extends HTMLElement {
    constructor() {
        super()
        
        const shadowRoot = this.attachShadow({mode: "open"})
        shadowRoot.innerHTML = `
            <div>Profile page</div>
            <style>
                div {
                    background-color: skyblue;
                }
            </style>
        `
    }

    connectedCallback() {
        console.log("profile mounted")
    }
    
    disconnectedCallback() {
        console.log("profile unmounted")
    }
}

customElements.define("profile-page", Profile)