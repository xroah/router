import "./components/home.js"
import "./components/profile.js"

window.router = new Router([
    {
        path: "/",
        component: "home-page"
    },
    {
        path: "/profile",
        component: "profile-page"
    }
], {
    outlet: "#root"
})