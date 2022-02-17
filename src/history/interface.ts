export interface HistoryAPI {
    push: (path: string, state?: object) => void
    replace: (path: string, state?: object) => void
    go: (n: number) => void
    parseSearch: (url: string) => void
}