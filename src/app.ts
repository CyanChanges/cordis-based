import './style.scss'
import {createRouter, createWebHistory, START_LOCATION} from "vue-router";
import {Context} from './context.ts'
// import {Connection} from "./conn.ts";

export const root = new Context()

export const router = createRouter({
    history: createWebHistory(),
    routes: []
})


root.app.use(router)

router.beforeEach(async (to, from) => {
    if (to.matched.length) return

    if (from === START_LOCATION) {
        to = router.resolve(to)
        if (to.matched.length) return to
    }

    return {
        path: '/',
        query: { redirect: to.fullPath },
    }
})

// root.plugin(Connection, {
//     endpoint: "http://localhost:2314"
// })