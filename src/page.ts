import {router} from './app.ts'
import {activities, Context, randomId} from "./context.ts";
import {Component} from "vue";

export namespace Page {
    export interface Options {
        id?: string
        name: string
        path: string
        component: Component
    }
}

export class Page {
    id: string

    constructor(public ctx: Context, public options: Page.Options) {
        const {path, name, id, component} = options
        this.id = id ?? ctx.name ?? randomId()
        ctx.collect("route", router.addRoute({
            path: path,
            name: name,
            component: component,
            meta: {
                page: this
            }
        }))
    }

    dispose() {
        this.ctx.scope.dispose()
        const current = router.currentRoute.value
        if (current?.meta?.activity === this) {
            router.push({
                path: '/',
                query: {redirect: current.fullPath},
            })
        }
        return delete activities[this.id]
    }
}
