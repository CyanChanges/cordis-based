import {Context} from "../context.ts";
import Honkai_Starrail from "../compoents/Honkai_Starrail.vue";

export const name = 'starrail'

export default (ctx: Context) => {
    ctx.provide('starrail', this)
    ctx.page({
        id: 'starrail',
        name: 'starrail',
        path: '/hkstarrail',
        component: Honkai_Starrail
    })
}