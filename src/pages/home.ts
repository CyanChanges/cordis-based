import {Context} from '../context.ts'
import Home from '../compoents/Home.vue'

export const inject = ['starrail']

export default (ctx: Context) => {
    ctx.page({
        name: 'home',
        path: '/',
        component: Home
    })
}