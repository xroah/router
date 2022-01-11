interface EventObject {
    type: string
    timestamp: number
    data?: any
}

interface Callback {
    (e: EventObject): void
}

export default class EventEmitter {
    private eventsMap: Map<string, Set<Callback>> = new Map()

    on(name: string, fn: Callback) {
        let cbSet = this.eventsMap.get(name)

        if (!cbSet) {
            cbSet = new Set<Callback>()

            this.eventsMap.set(name, cbSet)
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
            this.eventsMap.clear()
        } else if (!fn) {
            this.eventsMap.delete(name)
        } else {
            const cbSet = this.eventsMap.get(name)

            if (cbSet) {
                cbSet.delete(fn)

                if (!cbSet.size) {
                    this.eventsMap.delete(name)
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
        const cbSet = this.eventsMap.get(name)

        if (cbSet) {
            cbSet.forEach(f => f(e))

            return true
        }

        return false
    }
}