import Router from "./router" 

declare global {
    interface HTMLElement {
        $router: Router
        __isRouterView__?: boolean
    }
}