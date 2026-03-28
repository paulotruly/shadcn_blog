import { createRouter, createRootRoute, createRoute } from '@tanstack/react-router'
import Home from './Home'
import Login from './Login'

const rootRoute = createRootRoute()

const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: Home,
})

const loginRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/login',
    component: Login,
})

const routeTree = rootRoute.addChildren([
    indexRoute,
    loginRoute,     
])

const router = createRouter({routeTree})

export default router