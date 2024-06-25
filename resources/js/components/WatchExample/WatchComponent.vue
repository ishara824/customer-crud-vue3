<template>
    <div class="text-center">
      <h1>Watch Example Component</h1>
      <div class="col-md-6">
        <input type="text" class="form-control" placeholder="Type...." v-model="name" :disabled="isExceeded">
      </div>
    </div>
  </template>

  <script>
    import { ref, watch } from 'vue';

    export default {
        name: 'WatchExample',
        setup(){
            const name = ref('');
            const isExceeded = ref(false);

            watch(name,(newV, oldV)=>{ // We can pass a ref to watch (ref, reactive object)
                console.log('newValue',newV);
                console.log('oldValue',oldV);
                if (name.value.length > 5) {
                    name.value = oldV;
                    isExceeded.value = true;
                    alert("Length exceeded");
                }
            })

            return{
                name,
                isExceeded
            }
        }

    };
  </script>

  <style scoped>
  h1 {
    color: #42b983;
  }
  </style>
