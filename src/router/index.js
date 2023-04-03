import { createWebHistory, createRouter } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'contactbook',
        component: () => import('@/views/ContactBook.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'notFound',
        component: () => import('@/views/NotFound.vue')
    },
    {
        path: '/contacts/:id',
        name: 'contact.edit',
        component: () => import("@/views/ContactEdit.vue"),
        props: true // this will pass the route params to the component as props
    },
    {
        path: '/contacts/add',
        name: 'contact.add',
        component: () => import("@/views/ContactAdd.vue"),
        props: true // this will pass the route params to the component as props
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

export default router