import "./components/home.js"
import "./components/profile.js"

new Router([
    {
        path: "/",
        component: "home-page"
    },
    {
        path: "/profile",
        component: "profile-page"
    }
])