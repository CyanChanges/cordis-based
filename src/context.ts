import {App, Component, createApp, defineComponent, h, inject, onBeforeUnmount, provide} from "vue";
import * as cordis from 'cordis'
import {Page} from "./page.ts";
import Root from './App.vue'
import {useRouter} from "vue-router";
import Random from "inaba";

export const router = useRouter()

export const Service = cordis.Service<Context>


export interface Context {
    [Context.events]: Events<this>
    [Context.current]: Context
}


export function pickAlpha() {
    const char = Random.pick(['a', 'b', 'c', 'd', 'e', 'f'])
    if (Random.bool(0.4)) return char.toUpperCase()
    else return char
}


export function randomId() {
    let id = pickAlpha()
    const cnt = Random.int(6, 15)
    for (let i = 0; i < cnt; i++)
        id += pickAlpha()

    return id
}


export let activities: Record<string, Page> = Object.create(null)


// @ts-ignore
export interface Events<C extends Context> extends cordis.Events<C> {

}


export class Context<C = any> extends cordis.Context<C> {
    app: App

    constructor() {
        super();
        this.app = createApp(Root)
        this.app.provide('cordis', this)
    }

    page(options: Page.Options) {
        if (!options.component) return
        options.component = this.wrapComponent(options.component)
        const page = new Page(this, options)
        return this.scope.collect('page', () => page.dispose())
    }

    wrapComponent(component: Component) {
        const caller = this[Context.current] || this
        return defineComponent((props, {slots}) => {
            provide('cordis', caller)
            return () => h(component, props, slots)
        })
    }
}

export function useContext() {
    const parent = inject('cordis') as Context
    const fork = parent.plugin(() => {
    })
    onBeforeUnmount(() => fork.dispose())
    return fork.ctx
}


