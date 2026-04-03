import { createRouter, createRootRoute, createRoute, redirect} from '@tanstack/react-router'
import Home from './pages/Home'
import Login from './pages/Login'
import DashboardLayout from './dashboard/DashboardLayout'
import DashboardIndex from './dashboard/DashboardIndex'
import DashboardPosts from './dashboard/DashboardPosts'
import z from 'zod'
import { getPost, getTotalPosts, getComments } from './api/posts'
import DashboardEditPostPage from './dashboard/DashboardEditPostPage'
import PostPage from './pages/PostPage'

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

const postRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/post/$id',
    loader: async ({params}) => {
        const postId = Number(params.id)
        const post = await getPost(postId)
        const comments = await getComments(postId)
        return { post, comments }
    },
    component: PostPage,
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

const dashboardEditPostRoute = createRoute({
    getParentRoute: () => dashboardRoute,
    path: '/posts/$id/edit',
    loader: async ({params}) => {
        const post = await getPost(Number(params.id))
        return post
    },
    component: DashboardEditPostPage,
})

const routeTree = rootRoute.addChildren([
    indexRoute,
    postRoute,
    loginRoute,    
    dashboardRoute.addChildren([
        dashboardIndexRoute,
        dashboardPostsRoute,
        dashboardEditPostRoute,
    ]),
])

const router = createRouter({routeTree})

export default router