import { createWebHistory, createRouter } from "vue-router";
import { useAuthStore } from "../store/authStore.js";

const ListCustomer = () => import('../components/customer/ListCustomer.vue')
const AddCustomer = () => import('../components/customer/AddCustomer.vue')
const EditCustomer = () => import('../components/customer/EditCustomer.vue');
const PageNotFound = () => import('../components/NotFound.vue')
const Login = () => import('../components/Login.vue');

const Routes = [
    {
        name: "Login",
        path: "/",
        component: Login
    },
    {
        name: "ListCustomer",
        path: '/customers',
        component: ListCustomer,
        meta: { requiresAuth : true }
    },
    {
        name: "AddCustomer",
        path: '/customer/create',
        component: AddCustomer,
        meta: { requiresAuth : true }
    },
    {
        name: "EditCustomer",
        path: '/customer/:id/edit',
        component: EditCustomer,
        meta: { requiresAuth : true }
    },
    {
        path: "/:catchAll(.*)",
        component: PageNotFound
    }
]

let router = new createRouter({
    history: createWebHistory(),
    routes: Routes
})
const authGuard = (to, from, next) => {
    const authStore = useAuthStore(); // Direct access to the authStore
    if (to.meta.requiresAuth && !authStore.isLoggedIn) {
        // Redirect to login page if not authenticated
        next({ name: 'Login' });
    } else {
        // Allow access to the route
        next();
    }
};

// Register the beforeEach guard
router.beforeEach(authGuard);

// router.beforeEach((to, from, next) => {
//     const authStore = useAuthStore();
//     if (to.meta.requiresAuth && !authStore.isLoggedIn) {
//         // Redirect to login page if not authenticated
//         next({ name: 'Login' });
//     } else {
//         // Allow access to the route
//         next();
//     }
// })

export default router;


