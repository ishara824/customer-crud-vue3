import { createWebHistory, createRouter } from "vue-router";

const ListCustomer = () => import('../components/customer/ListCustomer.vue')
const AddCustomer = () => import('../components/customer/AddCustomer.vue')
const EditCustomer = () => import('../components/customer/EditCustomer.vue');

const Routes = [
    {
        name: "ListCustomer",
        path: '/',
        component: ListCustomer,
    },
    {
        name: "AddCustomer",
        path: '/customer/create',
        component: AddCustomer
    },
    {
        name: "EditCustomer",
        path: '/customer/:id/edit',
        component: EditCustomer,
    }
]

let router = new createRouter({
    history: createWebHistory(),
    routes: Routes
})
export default router;


