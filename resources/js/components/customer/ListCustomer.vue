<template>
    <div class="container mt-2">
        <div class="row justify-content-end">
            <div class="col-md-6">
                <h3>List Customer</h3>
            </div>
            <div class="col-md-3">
                <router-link :to="{ name : 'AddCustomer'}" class="btn btn-success float-end">Create +</router-link>

            </div>
            <div class="col-md-3">
                <button class="btn btn-primary" @click="logout">Logout</button>
            </div>

        </div>
        <div class="row mt-4">
            <div class="col-md-12">
                <table class="table table-striped">
                    <thead class="table-dark">
                    <tr>
                        <th>#</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Birthday</th>
                        <th>Mobile Number</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="customer in customers" :key="customer.id">
                        <td>{{customer.id}}</td>
                        <td>{{customer.full_name}}</td>
                        <td>{{customer.email}}</td>
                        <td>{{customer.birthday}}</td>
                        <td>{{customer.mobile_number}}</td>
                        <td>
                            <router-link :to="{ name : 'EditCustomer', params: {id: customer.id }}" class="btn btn-sm btn-primary">Edit</router-link>
                            <button @click="deleteCustomer(customer.id)" class="btn btn-sm btn-danger">Delete</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import {onMounted, ref} from "vue";
import Swal from "sweetalert2";
import {useRouter} from 'vue-router';
import {useAuthStore} from "../../store/authStore.js";

export default {
    setup() {
        const router = useRouter();
        const authStore = useAuthStore();
        const customers = ref([]);
        const getAllCustomers = async () => {
            window.axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
            let response = await axios.get('/api/customers')
            customers.value = response.data;
        };

        const deleteCustomer = async (id) => {
            await axios.delete(`/api/customers/`+ id).then(response => {
                Swal.fire({
                    title: "Good job!",
                    text: response.data.message,
                    icon: "success"
                }).then(() => {
                    location.reload();
                });
            });
        }

        const logout = async () => {
            window.axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
            await axios.get(`/api/logout`).then(response => {
                console.log(response);
                authStore.logout().then(() => {
                    router.push({name: 'Login'});
                })
            })
        }

        onMounted(getAllCustomers);

        return {
            customers,
            getAllCustomers,
            deleteCustomer,
            logout
        }
    }
}

</script>

<style scoped>

</style>
