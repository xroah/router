class Profile extends HTMLElement {
    constructor() {
        super()
        
        const shadowRoot = this.attachShadow()
        shadowRoot.innerHTML = `
            <div>Profile page</div>
            <style>
                div {
                    background-color: skyblue;
                }
            </style>
        `
    }
}

customElements.define("profile-page", Profile)