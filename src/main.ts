import './style.scss'
import home from "./pages/home.ts";
import {root} from "./app.ts";
import starrail from "./pages/starrail.ts";

import './style.scss'

root.plugin(home)
root.plugin(starrail)

root.app.mount("#app")
