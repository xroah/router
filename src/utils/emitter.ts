export interface EventObject {
    type: string
    timestamp: number
    data?: any
}

interface Callback {
    (e: EventObject): void
}

export default class Emitter {
    private _eventsMap: Map<string, Set<Callback>> = new Map()

    on(name: string, fn: Callback) {
        let cbSet = this._eventsMap.get(name)

        if (!cbSet) {
            cbSet = new Set<Callback>()

            this._eventsMap.set(name, cbSet)
        }

        cbSet.add(fn)
        
        return this
    }

    one(name: string, fn: Callback) {
        const newFn = (e: EventObject) => {
            fn(e)
            this.off(name, newFn)
        }

        return this.on(name, newFn)
    }

    off(name?: string, fn?: Callback) {
        if (name === undefined) {
            this._eventsMap.clear()
        } else if (!fn) {
            this._eventsMap.delete(name)
        } else {
            const cbSet = this._eventsMap.get(name)

            if (cbSet) {
                cbSet.delete(fn)

                if (!cbSet.size) {
                    this._eventsMap.delete(name)
                }
            }
        }
    }

    emit(name: string, data?: any) {
        const e: EventObject = {
            type: name,
            timestamp: Date.now(),
            data
        }
        const cbSet = this._eventsMap.get(name)

        if (cbSet) {
            cbSet.forEach(f => f(e))

            return true
        }

        return false
    }
}