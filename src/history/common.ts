import {HistoryAPI} from "./interface"
import Emitter from "../utils/emitter"

abstract class CommonHistory extends Emitter implements HistoryAPI {
    abstract push: (path: string, state?: object) => void
    abstract replace: (path: string, state?: object) => void
    abstract parseSearch: (url: string) => void
    
    go(n: number) {
        history.go(n)
    }
}

export default CommonHistory