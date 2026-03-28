import { createRouter, createRootRoute, createRoute, redirect} from '@tanstack/react-router'
import Home from './Home'
import Login from './Login'
import Dashboard from './Dashboard'
import z from 'zod'
import { getPostsWithTotal, getTotalPosts} from './api/posts'

const rootRoute = createRootRoute()

const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    validateSearch: z.object({
        page: z.number().int().positive().catch(1),
    }),
    beforeLoad: async({search}) => {
        const total = await getTotalPosts()
        const totalPages = Math.ceil(total/10)
        if (search.page > totalPages) {
            throw redirect({
                to: '/',
                search: {page: 1},
                replace: true,
            })
        }
    },
    component: Home,
})

const loginRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/login',
    component: Login,
})

const dashboardRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/dashboard',
    component: Dashboard,
})


const routeTree = rootRoute.addChildren([
    indexRoute,
    loginRoute,    
    dashboardRoute,
])

const router = createRouter({routeTree})

export default router