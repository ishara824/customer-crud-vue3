<template>
    <div class="container mt-2">
        <div class="row justify-content-end">
            <div class="col-md-12">
                <h3>Login</h3>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-md-12">
                <form @submit.prevent="login">
                    <div class="col-md-6">
                        <label for="">Email</label>
                        <input type="text" class="form-control" v-model="user.email">
                        <span class="text-danger" v-if="errors?.email">{{ errors.email[0] }}</span>
                    </div>
                    <div class="col-md-6">
                        <label for="">Password</label>
                        <input type="text" class="form-control" v-model="user.password">
                        <span class="text-danger" v-if="errors?.password">{{ errors.password[0] }}</span>
                    </div>
                    <div class="col-md-6 mt-2">
                        <button type="submit" class="btn btn-primary">Login</button>
                    </div>
                </form>

            </div>
        </div>
    </div>
</template>

<script>
import {ref} from "vue";
import {useRouter} from 'vue-router';
import Swal from "sweetalert2";
import {useAuthStore} from "../store/authStore.js";

export default {
    setup(){
        const user = ref({});
        const errors = ref();

        const authStore = useAuthStore();
        const router = useRouter();

        const login = async () => {
            try {
                await axios.get('/sanctum/csrf-cookie');
                const response = await axios.post('/api/login' ,user.value);
                authStore.login(response.data.access_token).then(() => {
                    router.push({name: 'ListCustomer'});
                });
            } catch (error) {
                console.log(error);
                if (error.response.status === 422) {
                    errors.value = error.response.data.errors;
                }
            }
        }

        return{
            user,
            errors,
            login
        }
    }
}
</script>

<style scoped>

</style>

