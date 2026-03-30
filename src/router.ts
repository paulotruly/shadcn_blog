import { createRouter, createRootRoute, createRoute, redirect} from '@tanstack/react-router'
import Home from './pages/Home'
import Login from './pages/Login'
import DashboardLayout from './dashboard/DashboardLayout'
import DashboardIndex from './dashboard/DashboardIndex'
import DashboardPosts from './dashboard/DashboardPosts'
import z from 'zod'
import { getTotalPosts } from './api/posts'

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
    component: DashboardLayout,
})

const dashboardIndexRoute = createRoute({
    getParentRoute: () => dashboardRoute,
    path: '/',
    component: DashboardIndex,
})

const dashboardPostsRoute = createRoute({
    getParentRoute: () => dashboardRoute,
    path: '/posts',
    component: DashboardPosts,
})

const routeTree = rootRoute.addChildren([
    indexRoute,
    loginRoute,    
    dashboardRoute.addChildren([
        dashboardIndexRoute,
        dashboardPostsRoute,
    ]),
])

const router = createRouter({routeTree})

export default router