<template>
    <div class="container mt-2">
        <div class="row justify-content-end">
            <div class="col-md-12">
                <h3>Add Customer</h3>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-md-12">
                <form @submit.prevent="saveCustomer">
                    <div class="col-md-6">
                        <label for="">Full Name</label>
                        <input type="text" class="form-control" v-model="customer.full_name">
                        <span class="text-danger" v-if="errors?.full_name">{{ errors.full_name[0] }}</span>
                    </div>
                    <div class="col-md-6">
                        <label for="">Email</label>
                        <input type="text" class="form-control" v-model="customer.email">
                        <span class="text-danger" v-if="errors?.email">{{ errors.email[0] }}</span>
                    </div>
                    <div class="col-md-6">
                        <label for="">Birthday</label>
                        <input type="date" class="form-control" v-model="customer.birthday">
                        <span class="text-danger" v-if="errors?.birthday">{{ errors.birthday[0] }}</span>
                    </div>
                    <div class="col-md-6">
                        <label for="">Mobile Number</label>
                        <input type="text" class="form-control" v-model="customer.mobile_number">
                        <span class="text-danger" v-if="errors?.mobile_number">{{ errors.mobile_number[0] }}</span>
                    </div>
                    <div class="col-md-6 mt-2">
                        <button type="submit" class="btn btn-primary">Save</button>
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

export default {
    setup(){
        const customer = ref({});
        const errors = ref();
        const router = useRouter();

        const saveCustomer = async () => {
            await axios.post(`/api/customers`, customer.value).then(response => {
                if (response.data.code === 200){
                    Swal.fire({
                        title: "Good job!",
                        text: response.data.message,
                        icon: "success"
                    }).then(() => {
                        router.push({name: 'ListCustomer'});
                    });
                }
            }).catch(error => {
                errors.value = error.response.data.errors;
            })
        }

        return{
            customer,
            errors,
            saveCustomer
        }
    }
}
</script>

<style scoped>

</style>
