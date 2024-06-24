import { createWebHistory, createRouter } from "vue-router";
import { useAuthStore } from "../store/authStore.js";

const ListCustomer = () => import('../components/customer/ListCustomer.vue')
const AddCustomer = () => import('../components/customer/AddCustomer.vue')
const EditCustomer = () => import('../components/customer/EditCustomer.vue');
const PageNotFound = () => import('../components/NotFound.vue')
const Login = () => import('../components/Login.vue');
const ParentComponent = () => import('../components/PropsExample/ParentComponent.vue');

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
        name: "ParentComponent",
        path: '/parent',
        component: ParentComponent
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
    if (to.name === 'Login' && authStore.isLoggedIn) {
        // If the user is already authenticated and trying to access the login page,
        // redirect to another page, such as the dashboard
        next({ name: 'ListCustomer' });
    } else if (to.meta.requiresAuth && !authStore.isLoggedIn) {
        // If the route requires authentication and the user is not logged in,
        // redirect to the login page
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


