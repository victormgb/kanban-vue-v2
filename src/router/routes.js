import Dashboard from "./../components/Dashboard.vue"
import Taskboard from "./../components/Taskboard.vue"

export default [
  {
    path: "/",
    name: "home",
    redirect: "/boards/d033c156-5972-4767-ceb0-8a91a5c282db"
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard
  },
  {
    path: "/boards/:id",
    name: "task-board",
    component: Taskboard
  }
]
