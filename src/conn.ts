import {Awaitable} from 'cosmokit'
import {Context, randomId, Service} from "./context.ts";

export interface Events {
    'ping'(): void
}

class Event {
    id: string


    constructor(protected key: string, protected data: any) {
        this.id = `${randomId()}/${randomId()}`
    }

    toJSON() {
        return {
            key: this.key,
            data: JSON.stringify(this.data)
        }
    }

    toString() {
        return JSON.stringify(this.toJSON())
    }
}


export namespace Connection {
    export interface Config {
        endpoint: string
        timeout?: number
    }
}

export class Connection extends Service {
    static methods = ['send', 'receive']

    responseHooks: Record<string, [Context, Function, Function]> = Object.create(null)
    listeners: Record<string, (data: any) => void> = Object.create(null)

    protected ws: WebSocket

    constructor(protected ctx: Context<Connection.Config>, protected config: Connection.Config) {
        super(ctx, 'conn');

        this.ws = new WebSocket(config.endpoint)

        ctx.on('ready', () => this.start())
    }

    async start() {
        this.ws.addEventListener("message", (e) => {
            const data = JSON.parse(e.data)
            if (data.type in this.listeners) {
                this.listeners[data.type](data.body)
            }
        })

        // this.ctx.mixin('')

        this.receive("response", ({key, value, error}) => {
            if (!this.responseHooks[key]) return
            const [ctx, resolve, reject] = this.responseHooks[key]
            delete this.responseHooks[key]
            if (ctx.runtime.uid == 0)
                return
            if (error)
                reject(error)
            else
                resolve(value)
        })
    }

    send<T extends keyof Events>(name: T, ...args: Parameters<Events[T]>): Awaitable<ReturnType<Events[T]>>
    send(name: string, ...args: any[]) {
        this.ws.send(new Event(name, args).toString())
        return new Promise((resolve, reject) => {
            this.responseHooks[name] = [this[Context.current], resolve, reject]
            setTimeout(() => {
                delete this.responseHooks[name]
                reject(new Error('request timeout'))
            }, this.config.timeout ?? 60000)
        })
    }

    receive<T = any>(event: string, listener: (data: T) => void) {
        this.listeners[event] = listener
    }
}
